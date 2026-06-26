import React from 'react';
import { FOOTER_LINKS, SOCIAL_LINKS } from '../../constants/navigation';

const CURRENT_YEAR = new Date().getFullYear();

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
      <path d="M16 2L30 28H2L16 2Z"    fill="#FFC801" />
      <path d="M16 10L24 24H8L16 10Z"  fill="#114C5A" />
      <path d="M16 16L20 24H12L16 16Z" fill="#172B36" />
    </svg>
  );
}

/**
 * Footer — React.memo'd.
 * Never receives any dynamic props, so it never re-renders after first mount.
 */
const Footer = React.memo(function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-navy border-t border-mint-mid/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Top grid: brand + link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <a
              href="#"
              className="inline-flex items-center gap-2 mb-4 group"
              aria-label="Prism — go to homepage"
            >
              <LogoMark />
              <span className="font-mono font-bold text-lg text-mint-light group-hover:text-brand-yellow transition-colors duration-150">
                Prism
              </span>
            </a>
            <p className="font-sans text-sm text-mint-mid/45 leading-relaxed max-w-[200px]">
              AI-powered analytics for modern data teams.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h3 className="font-mono text-xs font-semibold text-mint-mid/40 uppercase tracking-widest mb-4">
                {group}
              </h3>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className={[
                        'font-sans text-sm text-mint-mid/55',
                        'hover:text-mint-light transition-colors duration-150 ease-out',
                      ].join(' ')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-mint-mid/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-mint-mid/35">
            © {CURRENT_YEAR} Prism Inc. All rights reserved.
          </p>

          {/* Social links */}
          <nav aria-label="Social media links">
            <ul className="flex items-center gap-6" role="list">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    aria-label={`Prism on ${s.label}`}
                    className={[
                      'font-sans text-xs font-medium text-mint-mid/40',
                      'hover:text-mint-light transition-colors duration-150 ease-out',
                    ].join(' ')}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
