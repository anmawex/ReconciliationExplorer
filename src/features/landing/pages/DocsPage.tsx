import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Search, Cpu, Activity, AlertCircle } from 'lucide-react';
import { Button } from '@/shared/components/button';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher/LanguageSwitcher';

export const DocsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center px-6">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block">{t('docs.header.title')}</span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  {t('docs.header.back')}
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto py-12 px-6">
        <div className="mb-12 text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            {t('docs.hero.title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('docs.hero.subtitle')}
          </p>
        </div>

        {/* Beta Notice */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full bg-primary/10">
              <AlertCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">{t('docs.beta.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('docs.beta.description')}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-16">
          {/* Section 1: Getting Started */}
          <section id="getting-started" className="scroll-m-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight first:mt-0">{t('docs.gettingStarted.title')}</h2>
            </div>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h3 className="text-xl font-semibold mb-3">{t('docs.gettingStarted.access.title')}</h3>
              <p className="mb-4">
                {t('docs.gettingStarted.access.description')}
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">
                <li><strong>{t('docs.gettingStarted.access.public')}:</strong> {t('docs.gettingStarted.access.publicDesc')}</li>
                <li><strong>{t('docs.gettingStarted.access.b2b')}:</strong> {t('docs.gettingStarted.access.b2bDesc')}</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">{t('docs.gettingStarted.firstSteps.title')}</h3>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>{t('docs.gettingStarted.firstSteps.step1')}</li>
                <li>{t('docs.gettingStarted.firstSteps.step2')}</li>
                <li>{t('docs.gettingStarted.firstSteps.step3')}</li>
              </ol>
            </div>
          </section>

          {/* Section 2: Features */}
          <section id="features" className="scroll-m-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                <Activity className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">{t('docs.features.title')}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-xl p-6 bg-card">
                <h3 className="font-semibold text-lg mb-2">{t('docs.features.dashboard.title')}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('docs.features.dashboard.description')}
                </p>
                <ul className="text-sm space-y-2 list-disc pl-4 text-muted-foreground">
                  <li>{t('docs.features.dashboard.item1')}</li>
                  <li>{t('docs.features.dashboard.item2')}</li>
                  <li>{t('docs.features.dashboard.item3')}</li>
                </ul>
              </div>

              <div className="border rounded-xl p-6 bg-card">
                <h3 className="font-semibold text-lg mb-2">{t('docs.features.transactions.title')}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('docs.features.transactions.description')}
                </p>
                <ul className="text-sm space-y-2 list-disc pl-4 text-muted-foreground">
                  <li>{t('docs.features.transactions.item1')}</li>
                  <li>{t('docs.features.transactions.item2')}</li>
                  <li>{t('docs.features.transactions.item3')}</li>
                </ul>
              </div>

              <div className="border rounded-xl p-6 bg-card md:col-span-2 border-primary/20 bg-primary/5">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <Search className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t('docs.features.reconciliation.title')}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t('docs.features.reconciliation.description')}
                    </p>
                    <div className="flex gap-2">
                       <span className="px-2 py-1 rounded bg-background border text-xs font-mono">{t('docs.features.reconciliation.tag1')}</span>
                       <span className="px-2 py-1 rounded bg-background border text-xs font-mono">{t('docs.features.reconciliation.tag2')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Roadmap */}
          <section id="roadmap" className="scroll-m-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                <Cpu className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">{t('docs.roadmap.title')}</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: t('docs.roadmap.ai.title'), desc: t('docs.roadmap.ai.desc') },
                { title: t('docs.roadmap.api.title'), desc: t('docs.roadmap.api.desc') },
                { title: t('docs.roadmap.reports.title'), desc: t('docs.roadmap.reports.desc') },
                { title: t('docs.roadmap.roles.title'), desc: t('docs.roadmap.roles.desc') }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg border bg-muted/40 hover:bg-muted/60 transition-colors">
                  <h4 className="font-medium mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Support */}
          <section id="support" className="scroll-m-20 border-t pt-12">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold mb-4">{t('docs.support.title')}</h2>
              <p className="text-muted-foreground mb-6 max-w-lg">
                {t('docs.support.description')}
              </p>
              <div className="flex gap-4">
                <Button variant="outline" asChild>
                  <a href="https://github.com/anmawex" target="_blank" rel="noopener noreferrer">
                    {t('docs.support.github')}
                  </a>
                </Button>
                <Button asChild>
                  <a href="mailto:contact@kallibra.app">
                    {t('docs.support.email')}
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-6">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            {t('landing.footer.madeWith')} ❤️ {t('landing.footer.by')}{" "}
            <a
              href="https://anmawex.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              anmawex
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
};
