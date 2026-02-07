import { useTranslation } from 'react-i18next';
import {
  Zap,
  Shield,
  BarChart3,
  RefreshCcw,
  FileSearch,
  Clock,
} from 'lucide-react';

const featureIcons = [
  Zap,
  Shield,
  BarChart3,
  RefreshCcw,
  FileSearch,
  Clock,
];

const iconColors = [
  { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/30' },
  { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/30' },
  { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/30' },
  { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/30' },
  { bg: 'bg-cyan-500/10', text: 'text-cyan-500', border: 'border-cyan-500/30' },
  { bg: 'bg-pink-500/10', text: 'text-pink-500', border: 'border-pink-500/30' },
];

export function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      title: t('landing.features.items.automation.title'),
      description: t('landing.features.items.automation.description'),
    },
    {
      title: t('landing.features.items.security.title'),
      description: t('landing.features.items.security.description'),
    },
    {
      title: t('landing.features.items.analytics.title'),
      description: t('landing.features.items.analytics.description'),
    },
    {
      title: t('landing.features.items.sync.title'),
      description: t('landing.features.items.sync.description'),
    },
    {
      title: t('landing.features.items.audit.title'),
      description: t('landing.features.items.audit.description'),
    },
    {
      title: t('landing.features.items.realtime.title'),
      description: t('landing.features.items.realtime.description'),
    },
  ];

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t('landing.features.title')}
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground">
            {t('landing.features.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = featureIcons[index];
            const colors = iconColors[index];

            return (
              <div
                key={index}
                className="group relative bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center h-14 w-14 rounded-xl ${colors.bg} ${colors.text} border ${colors.border} mb-6`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
