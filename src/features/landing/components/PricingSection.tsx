import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Sparkles, Building2 } from 'lucide-react';
import { Button } from '@/shared/components/button';
import { Modal } from '@/shared/components/Modal/Modal';

export function PricingSection() {
  const { t } = useTranslation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
    setIsContactModalOpen(true);
  };

  const handleContactConfirm = () => {
    const subject = encodeURIComponent(`Pricing Inquiry - ${selectedPlan} Plan`);
    const body = encodeURIComponent(`Hello,\n\nI'm interested in the ${selectedPlan} plan for Kallibra.\n\nCompany:\nEmail:\nExpected volume:\n\nThank you.`);
    window.location.href = `mailto:pricing@kallibra.app?subject=${subject}&body=${body}`;
  };

  const plans = [
    {
      name: t('landing.pricing.starter.name'),
      price: '$49',
      period: t('landing.pricing.period'),
      description: t('landing.pricing.starter.description'),
      icon: Sparkles,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      features: [
        t('landing.pricing.starter.features.transactions'),
        t('landing.pricing.starter.features.sources'),
        t('landing.pricing.starter.features.users'),
        t('landing.pricing.starter.features.support'),
        t('landing.pricing.starter.features.reports'),
      ],
      cta: t('landing.pricing.starter.cta'),
      popular: false,
    },
    {
      name: t('landing.pricing.enterprise.name'),
      price: t('landing.pricing.enterprise.price'),
      period: '',
      description: t('landing.pricing.enterprise.description'),
      icon: Building2,
      iconBg: 'bg-gradient-to-br from-primary to-cyan-500',
      iconColor: 'text-white',
      features: [
        t('landing.pricing.enterprise.features.transactions'),
        t('landing.pricing.enterprise.features.sources'),
        t('landing.pricing.enterprise.features.users'),
        t('landing.pricing.enterprise.features.support'),
        t('landing.pricing.enterprise.features.api'),
        t('landing.pricing.enterprise.features.sla'),
      ],
      cta: t('landing.pricing.enterprise.cta'),
      popular: true,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t('landing.pricing.title')}
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground">
            {t('landing.pricing.subtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            
            return (
              <div
                key={index}
                className={`relative bg-card rounded-2xl p-8 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  plan.popular
                    ? 'border-primary shadow-lg ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-cyan-500 rounded-full text-sm font-medium text-white shadow-lg">
                    {t('landing.pricing.popular')}
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div
                    className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl ${plan.iconBg} ${plan.iconColor} mb-6`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl lg:text-5xl font-bold text-primary">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground">/{plan.period}</span>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full mb-8 h-12 text-base"
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => handlePlanSelect(plan.name)}
                >
                  {plan.cta}
                </Button>

                {/* Features List */}
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 text-green-500" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            {t('landing.pricing.questions')}{' '}
            <button
              onClick={() => handlePlanSelect('General')}
              className="text-primary hover:underline font-medium"
            >
              {t('landing.pricing.contact')}
            </button>
          </p>
        </div>
      </div>

      {/* Contact Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        onConfirm={handleContactConfirm}
        title={t('landing.contactModal.title')}
        description={t('landing.contactModal.description')}
        confirmText={t('landing.contactModal.confirm')}
        cancelText={t('common.cancel')}
      />
    </section>
  );
}
