"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();
  const english = pathname?.startsWith("/en");
  const prefix = english ? "/en" : "";

  return (
    <footer className="jre-footer">
      <div className="jre-footer__lead">
        <span>PORTFOLIO / {new Date().getFullYear()}</span>
        <strong>MORRIS<br />LIU</strong>
        <p>{english ? "Data, AI, and the people behind every decision." : "關於資料、AI，以及每個決定背後的人。"}</p>
      </div>
      <nav>
        <Link href={`${prefix}/about`}>{english ? "About" : "關於我"}</Link>
        <Link href={`${prefix}/projects`}>{english ? "Selected work" : "作品"}</Link>
        <Link href={`${prefix}/articles`}>{english ? "Notes" : "文章"}</Link>
        <Link href={`${prefix}/contact`}>{english ? "Contact" : "聯絡我"}</Link>
      </nav>
      <div className="jre-footer__meta">
        <div>
          <a href="https://www.linkedin.com/in/chienshengliu/" target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn</a>
          <a href="https://github.com/chien-sheng-liu" target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
        </div>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Page top <span aria-hidden="true">↑</span>
        </button>
      </div>
      <p className="jre-footer__copyright">© {new Date().getFullYear()} Chien-Sheng Liu. All rights reserved.</p>
    </footer>
  );
}
