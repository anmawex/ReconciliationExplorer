import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/shared/components/button';

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-16 overflow-hidden"
    >
      {/* Gradient Background with Clip Path */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(45, 93%, 95%), hsl(210, 100%, 98%) 50%, hsl(var(--background)) 100%)',
          clipPath: 'ellipse(150% 100% at 50% 0%)',
        }}
      />
      <div
        className="absolute inset-0 -z-10 dark:block hidden"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(221, 83%, 20%), hsl(222, 47%, 8%) 50%, hsl(var(--background)) 100%)',
          clipPath: 'ellipse(150% 100% at 50% 0%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Badge */}
            {/* <div className="inline-flex">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {t('landing.hero.badge')}
              </span>
            </div> */}

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-foreground font-light">{t('landing.hero.titleLight')}</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                {t('landing.hero.titleBold')}
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-xl leading-relaxed">
              {t('landing.hero.description')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild className="group text-base h-12 px-8">
                <Link to="/login">
                  {t('landing.hero.ctaPrimary')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              {/* <Button
                size="lg"
                variant="outline"
                asChild
                className="group text-base h-12 px-8"
              >
                <a href="https://docs.kallibra.app" target="_blank" rel="noopener noreferrer">
                  {t('landing.hero.ctaSecondary')}
                  <ExternalLink className="ml-2 h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </Button> */}
            </div>

            {/* Trust Indicators */}
            {/* <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/60 border-2 border-background flex items-center justify-center text-xs font-medium text-primary-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">500+</span> {t('landing.hero.trustedBy')}
              </div>
            </div> */}
          </div>

          {/* Right Content - Product Mockup */}
          <div className="relative lg:pl-8">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-blue-500/20 to-cyan-500/20 blur-3xl rounded-3xl opacity-60"></div>
              
              {/* Dashboard Preview */}
              <div className="relative bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
                {/* Window Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 rounded-md bg-background text-xs text-muted-foreground">
                      app.kallibra.com/dashboard
                    </div>
                  </div>
                </div>
                
                {/* Dashboard Content */}
                <div className="p-6 bg-gradient-to-br from-background to-muted/30">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { value: '2,847', label: 'Reconciled', color: 'bg-green-500' },
                      { value: '156', label: 'Pending', color: 'bg-yellow-500' },
                      { value: '23', label: 'Issues', color: 'bg-red-500' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-card rounded-lg p-4 border border-border">
                        <div className={`h-1 w-8 ${stat.color} rounded-full mb-3`}></div>
                        <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Chart Placeholder */}
                  <div className="bg-card rounded-lg p-4 border border-border h-32 flex items-end gap-2">
                    {[40, 65, 45, 80, 55, 70, 85, 60, 75, 90, 50, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-primary/80 to-primary/40 rounded-t"
                        style={{ height: `${h}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -right-4 top-1/4 bg-card rounded-xl p-4 border border-border shadow-lg animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Auto-matched</div>
                    <div className="text-xs text-muted-foreground">+127 today</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
