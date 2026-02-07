import { useTranslation } from 'react-i18next';
import { TrendingUp, Lock } from 'lucide-react';

export function HighlightsSection() {
  const { t } = useTranslation();

  return (
    <section id="highlights" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t('landing.highlights.title')}
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground">
            {t('landing.highlights.subtitle')}
          </p>
        </div>

        {/* Highlight 1 - Image Left, Text Right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-3xl"></div>
            <div className="relative bg-purple-100 dark:bg-purple-500/10 rounded-3xl p-8 lg:p-12">
              {/* Dashboard Mockup */}
              <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                <div className="p-4 border-b border-border flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BarChart className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{t('landing.highlights.analytics.mockupTitle')}</span>
                </div>
                <div className="p-6">
                  {/* Chart */}
                  <div className="flex items-end gap-2 h-40">
                    {[30, 55, 40, 75, 50, 85, 65, 90, 70, 95, 80, 100].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col gap-1">
                        <div
                          className="bg-gradient-to-t from-primary to-primary/60 rounded-t"
                          style={{ height: `${h}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">+127%</div>
                      <div className="text-xs text-muted-foreground">Efficiency</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">98.5%</div>
                      <div className="text-xs text-muted-foreground">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-500">-45%</div>
                      <div className="text-xs text-muted-foreground">Time Saved</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-primary/10 text-primary border border-primary/30">
              <TrendingUp className="h-7 w-7" />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              {t('landing.highlights.analytics.title')}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('landing.highlights.analytics.description')}
            </p>
            <ul className="space-y-3">
              {['metric1', 'metric2', 'metric3'].map((key) => (
                <li key={key} className="flex items-center gap-3 text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  {t(`landing.highlights.analytics.${key}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Highlight 2 - Text Left, Image Right */}
    
        {/* <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-green-500/10 text-green-500 border border-green-500/30">
              <Lock className="h-7 w-7" />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              {t('landing.highlights.security.title')}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('landing.highlights.security.description')}
            </p>
            <ul className="space-y-3">
              {['feature1', 'feature2', 'feature3'].map((key) => (
                <li key={key} className="flex items-center gap-3 text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  {t(`landing.highlights.security.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 rounded-3xl"></div>
            <div className="relative bg-yellow-100 dark:bg-yellow-500/10 rounded-3xl p-8 lg:p-12">
              <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden">
                <div className="p-4 border-b border-border flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-green-500" />
                  </div>
                  <span className="font-medium text-foreground">{t('landing.highlights.security.mockupTitle')}</span>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { label: 'Bank-grade Encryption', status: 'Active', color: 'green' },
                    { label: 'Two-Factor Auth', status: 'Enabled', color: 'green' },
                    { label: 'Audit Logging', status: 'Running', color: 'blue' },
                    { label: 'Data Backup', status: 'Last: 2m ago', color: 'green' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full bg-${item.color}-500`}></div>
                        <span className="text-sm text-foreground">{item.label}</span>
                      </div>
                      <span className={`text-xs font-medium text-${item.color}-500 bg-${item.color}-500/10 px-2 py-1 rounded`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}

// Helper icon components
function BarChart({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function Shield({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
