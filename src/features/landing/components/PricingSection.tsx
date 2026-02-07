import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { Button } from '@/shared/components/button';
import { Modal } from '@/shared/components/Modal/Modal';

// SVG Illustration Component for Beta Plan (single character with monitor)
function BetaIllustration() {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-32 mx-auto">
      {/* Background decorative elements */}
      <circle cx="30" cy="20" r="3" fill="#cbd5e1" opacity="0.6" />
      <circle cx="175" cy="25" r="2" fill="#cbd5e1" opacity="0.5" />
      
      {/* Plant decoration left */}
      <g transform="translate(15, 85)">
        <path d="M5 20 Q3 10 8 5 Q10 10 8 20" fill="#94a3b8" opacity="0.4" />
        <path d="M8 20 Q6 12 12 8 Q12 14 10 20" fill="#94a3b8" opacity="0.3" />
        <path d="M10 20 Q12 12 15 10 Q14 16 12 20" fill="#94a3b8" opacity="0.4" />
        <rect x="4" y="18" width="10" height="4" rx="1" fill="#94a3b8" opacity="0.3" />
      </g>

      {/* Monitor */}
      <g transform="translate(55, 25)">
        {/* Monitor frame */}
        <rect x="0" y="0" width="90" height="60" rx="4" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
        {/* Screen */}
        <rect x="5" y="5" width="80" height="45" rx="2" fill="#f8fafc" />
        {/* Screen dots (menu) */}
        <circle cx="12" cy="12" r="2" fill="#1e293b" />
        <circle cx="20" cy="12" r="2" fill="#1e293b" />
        <circle cx="28" cy="12" r="2" fill="#1e293b" />
        {/* Screen content lines */}
        <rect x="10" y="20" width="35" height="3" rx="1" fill="#cbd5e1" />
        <rect x="10" y="27" width="25" height="3" rx="1" fill="#cbd5e1" />
        <rect x="10" y="34" width="30" height="3" rx="1" fill="#cbd5e1" />
        {/* Decorative box on screen */}
        <rect x="55" y="20" width="25" height="20" rx="2" fill="#e2e8f0" />
        {/* Monitor stand */}
        <rect x="35" y="60" width="20" height="8" fill="#cbd5e1" />
        <rect x="25" y="68" width="40" height="5" rx="2" fill="#d1d5db" />
      </g>

      {/* Main character (sitting) */}
      <g transform="translate(60, 75)">
        {/* Body */}
        <ellipse cx="25" cy="35" rx="18" ry="20" fill="#1e293b" />
        {/* Head */}
        <circle cx="25" cy="8" r="12" fill="#1e293b" />
        {/* Eyes */}
        <circle cx="21" cy="6" r="2.5" fill="white" />
        <circle cx="29" cy="6" r="2.5" fill="white" />
        <circle cx="21" cy="6" r="1" fill="#1e293b" />
        <circle cx="29" cy="6" r="1" fill="#1e293b" />
        {/* Beak */}
        <ellipse cx="25" cy="12" rx="4" ry="2" fill="#f59e0b" />
        {/* Feet */}
        <ellipse cx="15" cy="55" rx="6" ry="3" fill="#f59e0b" />
        <ellipse cx="35" cy="55" rx="6" ry="3" fill="#f59e0b" />
        {/* Antenna/hair */}
        <circle cx="25" cy="-5" r="3" fill="#1e293b" />
        <line x1="25" y1="0" x2="25" y2="-2" stroke="#1e293b" strokeWidth="2" />
      </g>

      {/* Small decorative character */}
      <g transform="translate(150, 90)">
        <circle cx="10" cy="8" r="7" fill="#3b82f6" />
        <ellipse cx="10" cy="22" rx="8" ry="10" fill="#3b82f6" />
        <circle cx="7" cy="6" r="1.5" fill="white" />
        <circle cx="13" cy="6" r="1.5" fill="white" />
        <ellipse cx="10" cy="10" rx="2" ry="1" fill="#1e293b" />
        <ellipse cx="5" cy="30" rx="3" ry="2" fill="#f59e0b" />
        <ellipse cx="15" cy="30" rx="3" ry="2" fill="#f59e0b" />
      </g>
    </svg>
  );
}

// SVG Illustration Component for Custom Plan (multiple characters collaborating)
function CustomIllustration() {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-32 mx-auto">
      {/* Monitor */}
      <g transform="translate(55, 20)">
        {/* Monitor frame */}
        <rect x="0" y="0" width="90" height="60" rx="4" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
        {/* Screen */}
        <rect x="5" y="5" width="80" height="45" rx="2" fill="#f8fafc" />
        {/* Screen dots (menu) */}
        <circle cx="12" cy="12" r="2" fill="#1e293b" />
        <circle cx="20" cy="12" r="2" fill="#1e293b" />
        <circle cx="28" cy="12" r="2" fill="#1e293b" />
        {/* Screen content - chart/graph */}
        <rect x="10" y="20" width="20" height="25" rx="1" fill="#e2e8f0" />
        <rect x="35" y="25" width="20" height="20" rx="1" fill="#e2e8f0" />
        <rect x="60" y="18" width="20" height="27" rx="1" fill="#3b82f6" opacity="0.5" />
        {/* Monitor stand */}
        <rect x="35" y="60" width="20" height="8" fill="#cbd5e1" />
        <rect x="25" y="68" width="40" height="5" rx="2" fill="#d1d5db" />
      </g>

      {/* Left character */}
      <g transform="translate(25, 70)">
        {/* Body */}
        <ellipse cx="20" cy="32" rx="15" ry="18" fill="#1e293b" />
        {/* Head */}
        <circle cx="20" cy="8" r="10" fill="#1e293b" />
        {/* Eyes */}
        <circle cx="16" cy="6" r="2" fill="white" />
        <circle cx="24" cy="6" r="2" fill="white" />
        <circle cx="16" cy="6" r="0.8" fill="#1e293b" />
        <circle cx="24" cy="6" r="0.8" fill="#1e293b" />
        {/* Beak */}
        <ellipse cx="20" cy="11" rx="3" ry="1.5" fill="#f59e0b" />
        {/* Feet */}
        <ellipse cx="12" cy="48" rx="5" ry="2.5" fill="#f59e0b" />
        <ellipse cx="28" cy="48" rx="5" ry="2.5" fill="#f59e0b" />
        {/* Antenna */}
        <circle cx="20" cy="-3" r="2.5" fill="#1e293b" />
        <line x1="20" y1="0" x2="20" y2="-1" stroke="#1e293b" strokeWidth="2" />
      </g>

      {/* Center character (blue, elevated) */}
      <g transform="translate(90, 55)">
        {/* Block/platform */}
        <rect x="0" y="50" width="25" height="25" rx="2" fill="#3b82f6" opacity="0.3" />
        {/* Body */}
        <ellipse cx="12" cy="38" rx="12" ry="14" fill="#3b82f6" />
        {/* Head */}
        <circle cx="12" cy="12" r="9" fill="#3b82f6" />
        {/* Eyes */}
        <circle cx="8" cy="10" r="2" fill="white" />
        <circle cx="16" cy="10" r="2" fill="white" />
        <circle cx="8" cy="10" r="0.8" fill="#1e293b" />
        <circle cx="16" cy="10" r="0.8" fill="#1e293b" />
        {/* Beak */}
        <ellipse cx="12" cy="15" rx="2.5" ry="1.3" fill="#1e293b" />
        {/* Feet */}
        <ellipse cx="6" cy="50" rx="4" ry="2" fill="#f59e0b" />
        <ellipse cx="18" cy="50" rx="4" ry="2" fill="#f59e0b" />
        {/* Antenna */}
        <circle cx="12" cy="2" r="2" fill="#3b82f6" />
      </g>

      {/* Right character */}
      <g transform="translate(140, 70)">
        {/* Body */}
        <ellipse cx="20" cy="32" rx="15" ry="18" fill="#1e293b" />
        {/* Head */}
        <circle cx="20" cy="8" r="10" fill="#1e293b" />
        {/* Eyes */}
        <circle cx="16" cy="6" r="2" fill="white" />
        <circle cx="24" cy="6" r="2" fill="white" />
        <circle cx="16" cy="6" r="0.8" fill="#1e293b" />
        <circle cx="24" cy="6" r="0.8" fill="#1e293b" />
        {/* Beak */}
        <ellipse cx="20" cy="11" rx="3" ry="1.5" fill="#f59e0b" />
        {/* Feet */}
        <ellipse cx="12" cy="48" rx="5" ry="2.5" fill="#f59e0b" />
        <ellipse cx="28" cy="48" rx="5" ry="2.5" fill="#f59e0b" />
        {/* Antenna */}
        <circle cx="20" cy="-3" r="2.5" fill="#1e293b" />
        <line x1="20" y1="0" x2="20" y2="-1" stroke="#1e293b" strokeWidth="2" />
        {/* Block beside */}
        <rect x="35" y="35" width="15" height="15" rx="2" fill="#94a3b8" opacity="0.4" />
      </g>
    </svg>
  );
}

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
      name: t('landing.pricing.beta.name'),
      price: t('landing.pricing.beta.price'),
      priceSubtext: t('landing.pricing.beta.priceSubtext'),
      Illustration: BetaIllustration,
      features: [
        t('landing.pricing.beta.features.modules'),
        t('landing.pricing.beta.features.clients'),
        t('landing.pricing.beta.features.feedback'),
        t('landing.pricing.beta.features.upgrades'),
      ],
      cta: t('landing.pricing.beta.cta'),
      ctaVariant: 'default' as const,
    },
    {
      name: t('landing.pricing.custom.name'),
      price: t('landing.pricing.custom.price'),
      priceSubtext: t('landing.pricing.custom.priceSubtext'),
      Illustration: CustomIllustration,
      features: [
        t('landing.pricing.custom.features.bespoke'),
        t('landing.pricing.custom.features.dedicated'),
        t('landing.pricing.custom.features.earlyBeta'),
        t('landing.pricing.custom.features.priority'),
      ],
      cta: t('landing.pricing.custom.cta'),
      ctaVariant: 'outline' as const,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-20">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('landing.pricing.title')}
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground">
            {t('landing.pricing.subtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => {
            const Illustration = plan.Illustration;
            
            return (
              <div
                key={index}
                className="relative bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    {plan.name}
                  </h3>
                  
                  {/* Illustration */}
                  <div className="mb-6">
                    <Illustration />
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <span className="text-4xl lg:text-5xl font-bold text-primary">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    {plan.priceSubtext}
                  </p>

                  {/* CTA Button */}
                  <Button
                    className="px-8 h-10 rounded-full text-sm font-medium"
                    variant={plan.ctaVariant}
                    onClick={() => handlePlanSelect(plan.name)}
                  >
                    {plan.cta}
                  </Button>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mt-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
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
