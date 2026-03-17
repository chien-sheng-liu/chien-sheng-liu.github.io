import "../globals.css";

export const metadata = {
  title: {
    template: '%s | 個人網站',
    default: '個人網站',
  },
  description: "一個專業嘅個人網站，用嚟展示技能、項目同經驗。",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function LocaleLayout({ children }) {
  // Nested layout: no <html>/<body>, root layout already wraps.
  return children;
}
