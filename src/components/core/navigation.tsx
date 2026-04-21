"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteContent } from "@/src/lib/content";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/approach", label: "Approach" },
  { href: "/experience", label: "Experience" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/audit", label: "Audit" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="nav-header">
      <div className="nav-brand">
        <Link href="/" className="brand-link">
          <span className="brand-initials">MS</span>
          <span className="brand-name">{siteContent.name}</span>
        </Link>
      </div>
      
      <nav className="nav-links">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive ? "nav-link-active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="nav-actions">
        <a 
          href={siteContent.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-social-link"
        >
          LinkedIn
        </a>
      </div>
    </header>
  );
}