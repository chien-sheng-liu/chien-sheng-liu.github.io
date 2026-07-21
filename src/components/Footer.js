
"use client";
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";
import { usePathname } from "next/navigation";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/chienshengliu/", icon: <FaLinkedin size={18} /> },
  { label: "GitHub", href: "https://github.com/chien-sheng-liu", icon: <FaGithub size={18} /> },
  { label: "Mentarix", href: "https://www.mentarix-data.com/zh-TW", icon: <FaGlobe size={17} /> },
];

const Footer = () => {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith('/en');
  return (
    <footer className="relative z-10 bg-[#0a0a0a] text-white/45 py-7 border-t border-white/[0.07]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="wrap-anywhere text-sm font-semibold text-white/65">
              Data & AI Consultant · Founder of Mentarix · Taiwan / Germany / Hong Kong
            </p>
            <p className="mt-1 text-xs text-white/35">
              &copy; {new Date().getFullYear()} Chien-Sheng Liu. {isEnglish ? 'All rights reserved.' : '版權所有.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-white/50 transition-colors hover:border-white/20 hover:text-sky-300"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
