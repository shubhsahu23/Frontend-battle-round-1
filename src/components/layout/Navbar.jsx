import React, { useState, useEffect, useCallback } from 'react';
import { NAV_LINKS } from '../../constants/navigation';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

/* ── Inline logo mark (SVG prism shape) ─────────────────────────────────── */
function LogoMark({ isDark }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M16 2L30 28H2L16 2Z"   fill="#FFC801" />
      <path d="M16 10L24 24H8L16 10Z" fill={isDark ? "#114C5A" : "#8CC0AF"} />
      <path d="M16 16L20 24H12L16 16Z" fill={isDark ? "#172B36" : "#D9E8E2"} />
    </svg>
  );
}

/**
 * Navbar — React.memo'd.
 * Never receives pricing props, so it is NEVER re-rendered by pricing state changes.
 * Glassmorphism activates after 20 px of scroll.
 * Mobile menu uses max-height CSS transition (300 ms ease-in-out).
 */
const Navbar = React.memo(function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu  = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  const isDark = scrolled || menuOpen;

  return (
    <header
      role="banner"
      className={[
        'fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out',
        isDark ? 'nav-glass' : 'bg-transparent',
      ].join(' ')}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group focus-ring"
            aria-label="Prism — go to homepage"
          >
            <LogoMark isDark={isDark} />
            <span className={[
              'font-mono font-bold text-xl transition-colors duration-150',
              isDark ? 'text-navy group-hover:text-teal-deep' : 'text-mint-light group-hover:text-white'
            ].join(' ')}>
              Prism
            </span>
          </a>

          {/* Desktop links */}
          <ul
            role="list"
            className="hidden md:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={[
                    'font-sans text-sm font-medium transition-colors duration-150 ease-out focus-ring rounded-sm',
                    isDark ? 'text-navy/70 hover:text-navy' : 'text-mint-light/80 hover:text-white',
                  ].join(' ')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant={isDark ? "ghost" : "outline"} size="sm" id="nav-login-btn">
              Log in
            </Button>
            <Button variant="primary" size="sm" id="nav-cta-btn">
              Get started free
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className={[
              'md:hidden p-2 rounded-lg transition-colors duration-150',
              isDark ? 'text-navy hover:bg-mint-mid' : 'text-mint-light hover:bg-navy/50',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow',
            ].join(' ')}
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>

        {/* Mobile menu — max-height transition */}
        <div
          id="mobile-nav-menu"
          aria-hidden={!menuOpen}
          className={[
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0',
          ].join(' ')}
        >
          <div className="py-4 border-t border-mint-mid/50 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={closeMenu}
                className={[
                  'block px-4 py-3 rounded-xl font-sans text-sm font-medium',
                  'text-navy/65 hover:text-navy hover:bg-mint-mid',
                  'transition-all duration-150 ease-out',
                ].join(' ')}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 px-4 flex flex-col gap-2">
              <Button variant="ghost"   size="sm" className="w-full" id="mobile-login-btn">
                Log in
              </Button>
              <Button variant="primary" size="sm" className="w-full" id="mobile-cta-btn">
                Get started free
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
});

export default Navbar;
