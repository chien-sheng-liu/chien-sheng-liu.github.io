#!/bin/zsh

set -u

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:${PATH:-}"

ADMIN_PORT="3210"
ADMIN_URL="http://127.0.0.1:${ADMIN_PORT}"
SCRIPT_DIRECTORY="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIRECTORY}/.." && pwd)"
ADMIN_DIRECTORY="${PROJECT_ROOT}/admin"
DATA_DIRECTORY="${ADMIN_DIRECTORY}/.data"
LOG_FILE="${DATA_DIRECTORY}/admin.log"
PID_FILE="${DATA_DIRECTORY}/admin.pid"
NEXT_BINARY="${ADMIN_DIRECTORY}/node_modules/.bin/next"

notify() {
  /usr/bin/osascript -e "display notification \"$1\" with title \"Morris Writing Studio\"" >/dev/null 2>&1 || true
}

show_error() {
  local message="$1"
  /usr/bin/osascript \
    -e "display dialog \"$message\" with title \"Morris Writing Studio\" buttons {\"好\"} default button \"好\" with icon stop" \
    >/dev/null 2>&1 || true
}

admin_is_ready() {
  /usr/bin/curl --silent --fail --max-time 2 "${ADMIN_URL}/api/config" 2>/dev/null |
    /usr/bin/grep --quiet '"connections"'
}

port_is_in_use() {
  /usr/sbin/lsof -Pan -iTCP:"${ADMIN_PORT}" -sTCP:LISTEN >/dev/null 2>&1
}

open_admin() {
  /usr/bin/open "${ADMIN_URL}"
}

mkdir -p "${DATA_DIRECTORY}"

if admin_is_ready; then
  open_admin
  exit 0
fi

if port_is_in_use; then
  show_error "連接埠 ${ADMIN_PORT} 已被其他程式使用。請關閉該程式後再試一次。"
  exit 1
fi

if [[ ! -d "${ADMIN_DIRECTORY}" ]]; then
  show_error "找不到 Admin 專案：${ADMIN_DIRECTORY}"
  exit 1
fi

if [[ ! -x "${NEXT_BINARY}" ]]; then
  if ! command -v npm >/dev/null 2>&1; then
    show_error "找不到 Node.js / npm。請先安裝 Node.js 22，再重新開啟。"
    exit 1
  fi

  notify "首次啟動，正在安裝 Admin 依賴…"
  {
    echo "[$(/bin/date '+%Y-%m-%d %H:%M:%S')] Installing dependencies"
    cd "${ADMIN_DIRECTORY}" && npm install
  } >>"${LOG_FILE}" 2>&1

  if [[ ! -x "${NEXT_BINARY}" ]]; then
    show_error "Admin 依賴安裝失敗。紀錄位於：${LOG_FILE}"
    exit 1
  fi
fi

notify "正在啟動 Admin…"
{
  echo ""
  echo "[$(/bin/date '+%Y-%m-%d %H:%M:%S')] Starting Admin on ${ADMIN_URL}"
  cd "${ADMIN_DIRECTORY}" || exit 1
  nohup "${NEXT_BINARY}" dev --hostname 127.0.0.1 --port "${ADMIN_PORT}" >>"${LOG_FILE}" 2>&1 &
  echo $! >"${PID_FILE}"
} >>"${LOG_FILE}" 2>&1

for _attempt in {1..120}; do
  if admin_is_ready; then
    notify "Admin 已準備完成"
    open_admin
    exit 0
  fi
  /bin/sleep 0.5
done

show_error "Admin 未能在 60 秒內啟動。紀錄位於：${LOG_FILE}"
exit 1
