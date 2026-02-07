import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/button';
import { ThemeToggle } from '@/shared/theme';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher/LanguageSwitcher';
import { Modal } from '@/shared/components/Modal/Modal';

interface NavbarProps {
  onScrollTo: (sectionId: string) => void;
}

export function Navbar({ onScrollTo }: NavbarProps) {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: t('landing.nav.home') },
    { id: 'features', label: t('landing.nav.features') },
    { id: 'highlights', label: t('landing.nav.highlights') },
    { id: 'pricing', label: t('landing.nav.pricing') },
  ];

  const handleNavClick = (sectionId: string) => {
    onScrollTo(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleRegisterConfirm = () => {
    setIsRegisterModalOpen(false);
    onScrollTo('pricing');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img src="/logo.svg" alt="Kallibra Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-foreground">Kallibra</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent/50"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
              <Button variant="ghost" asChild>
                <Link to="/login">{t('landing.nav.login')}</Link>
              </Button>
              <Button onClick={() => setIsRegisterModalOpen(true)}>
                {t('landing.nav.register')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-b border-border">
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="block w-full text-left px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="ghost" asChild className="justify-start">
                  <Link to="/login">{t('landing.nav.login')}</Link>
                </Button>
                <Button onClick={() => setIsRegisterModalOpen(true)} className="w-full">
                  {t('landing.nav.register')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Register Confirmation Modal */}
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onConfirm={handleRegisterConfirm}
        title={t('landing.registerModal.title')}
        description={t('landing.registerModal.description')}
        confirmText={t('landing.registerModal.confirm')}
        showCancel={false}
      />
    </>
  );
}
