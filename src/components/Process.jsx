import { useTranslation } from "react-i18next";
import { Milestone, MessageSquare, LayoutTemplate, GitBranch, Package, Route, ShieldAlert, FileCode, CheckSquare } from "lucide-react";
import SectionHeader from "./SectionHeader";

const ICONS = [MessageSquare, LayoutTemplate, GitBranch, Package, Route, ShieldAlert, FileCode, CheckSquare];

export default function Process() {
  const { t } = useTranslation();
  const steps = t("process.steps", { returnObjects: true }) || [];

  return (
    <section id="process" className="max-w-6xl mx-auto px-6 md:px-8 py-24 md:py-32">
      <SectionHeader icon={Milestone} eyebrow={t("process.eyebrow")} title={t("process.title")} />

      <div className="relative">
        <div className="absolute start-1/2 top-0 bottom-0 w-px hidden md:block" style={{ background: "var(--site-border)" }} />
        <div className="space-y-10 md:space-y-16">
          {steps.map((step, i) => {
            const Icon = ICONS[i % ICONS.length];
            const leftSide = i % 2 === 0;
            return (
              <div key={i} className={`relative flex flex-col md:flex-row items-center gap-6 ${leftSide ? "" : "md:flex-row-reverse"}`}>
                <div className={`flex-1 ${leftSide ? "md:text-end" : ""} w-full`}>
                  <div className="card p-6 md:p-7 inline-block w-full md:max-w-md fade-up">
                    <span className="inline-block font-mono text-xs px-2.5 py-1 rounded border site-border site-accent mb-3">
                      STEP {i + 1}
                    </span>
                    <div className={`flex items-center gap-3 mb-3 ${leftSide ? "md:flex-row-reverse" : ""}`}>
                      <span className="w-10 h-10 rounded-lg border site-border flex items-center justify-center site-accent shrink-0">
                        <Icon className="w-4.5 h-4.5" />
                      </span>
                      <h4 className="font-display font-bold text-lg">{step.title}</h4>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--site-text-muted)" }}>{step.desc}</p>
                  </div>
                </div>
                <span
                  className="hidden md:flex w-9 h-9 rounded-full items-center justify-center font-mono text-sm font-bold shrink-0 z-10"
                  style={{ background: "var(--site-bg)", border: "2px solid var(--site-accent)", color: "var(--site-accent)" }}
                >
                  {i + 1}
                </span>
                <div className="flex-1 hidden md:block" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
