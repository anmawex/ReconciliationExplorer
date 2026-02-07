import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    developer: [
      { label: t('landing.footer.developer.portfolio'), href: 'https://anmawex.dev', external: true },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/anmawex', external: true },
      { label: 'GitHub', href: 'https://github.com/anmawex', external: true },
    ],
    resources: [
      { label: t('landing.footer.resources.docs'), href: 'https://docs.kallibra.app', external: true },
    ],
    legal: [
      { label: t('landing.footer.legal.privacy'), href: '/privacy', external: false },
      { label: t('landing.footer.legal.terms'), href: '/terms', external: false },
    ],
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/anmawex', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/anmawex', label: 'LinkedIn' },
    { icon: Globe, href: 'https://anmawex.dev', label: 'Portfolio' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.svg" alt="Kallibra Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-foreground">Kallibra</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              {t('landing.footer.tagline')}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Developer Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {t('landing.footer.developer.title')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.developer.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {t('landing.footer.resources.title')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {t('landing.footer.legal.title')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Kallibra. {t('landing.footer.rights')}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('landing.footer.madeWith')} ❤️ {t('landing.footer.by')}{' '}
              <a
                href="https://anmawex.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                anmawex
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
