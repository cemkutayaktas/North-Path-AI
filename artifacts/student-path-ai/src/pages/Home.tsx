import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Target,
  BookOpen,
  Compass,
  GraduationCap,
  Globe,
  Users,
  ClipboardCheck,
  BarChart3,
  Map,
  FileDown,
  Shield,
  Clock,
  ChevronRight,
  Star,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Home() {
  const { t } = useLang();

  const stats = [
    { value: "20+", label: t("home.statMajors"), icon: GraduationCap },
    { value: "60+", label: t("home.statCountries"), icon: Globe },
    { value: "200+", label: t("home.statUniversities"), icon: BookOpen },
    { value: "3", label: t("home.statLanguages"), icon: Users },
  ];

  const features = [
    {
      icon: ClipboardCheck,
      title: t("home.feat1Title"),
      desc: t("home.feat1Desc"),
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      icon: BarChart3,
      title: t("home.feat2Title"),
      desc: t("home.feat2Desc"),
      color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    },
    {
      icon: Map,
      title: t("home.feat3Title"),
      desc: t("home.feat3Desc"),
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: FileDown,
      title: t("home.feat4Title"),
      desc: t("home.feat4Desc"),
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
  ];

  const steps = [
    { num: "01", title: t("home.step1Title"), desc: t("home.step1Desc") },
    { num: "02", title: t("home.step2Title"), desc: t("home.step2Desc") },
    { num: "03", title: t("home.step3Title"), desc: t("home.step3Desc") },
  ];

  const testimonials = [
    { name: "Alex K.", role: t("home.test1Role"), text: t("home.test1Text"), stars: 5 },
    { name: "Maria S.", role: t("home.test2Role"), text: t("home.test2Text"), stars: 5 },
    { name: "Yusuf T.", role: t("home.test3Role"), text: t("home.test3Text"), stars: 5 },
  ];

  const majors = [
    "Computer Science", "Finance", "Medicine", "Architecture", "Game Design",
    "Cybersecurity", "Marketing", "Psychology", "Nursing", "Law",
    "Data Science", "Linguistics", "Engineering", "Media Studies",
  ];

  return (
    <div className="min-h-screen pt-20 pb-0 flex flex-col relative overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] opacity-30 pointer-events-none translate-x-1/3 -translate-y-1/4">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute top-40 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 -translate-x-1/2" />
        <div className="absolute bottom-0 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8 border border-primary/20">
                <Sparkles className="w-4 h-4" />
                <span>{t("home.badge")}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-display font-extrabold leading-[1.1] mb-6">
                {t("home.h1a")} <br />
                <span className="text-gradient">{t("home.h1b")}</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
                {t("home.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/questionnaire">
                  <Button size="lg" className="w-full sm:w-auto group">
                    {t("home.cta")}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    {t("home.howItWorks")}
                  </Button>
                </Link>
              </div>

              <div className="mt-8 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-8 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  <span>{t("home.personalized")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-secondary" />
                  <span>{t("home.fiveMinutes")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-secondary" />
                  <span>{t("home.evidenceBased")}</span>
                </div>
              </div>
            </motion.div>

            {/* Right side visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="aspect-square rounded-full border border-primary/20 bg-gradient-to-tr from-white/50 to-white/10 backdrop-blur-3xl shadow-2xl relative flex items-center justify-center">
                <div className="absolute inset-8 rounded-full border border-primary/10 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-16 rounded-full border border-secondary/20 animate-[spin_15s_linear_infinite_reverse]" />

                <div className="text-center relative z-10 glass-panel p-8 rounded-3xl w-72">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Compass className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2">
                    {t("home.findYourNorth")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("home.simpleQuestions")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="border-y border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-foreground">
                  {s.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEATURES SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 lg:py-28 relative">
        <div className="absolute inset-0 -z-10 opacity-50">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl translate-x-1/3" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold mb-4">
              {t("home.featuresTitle")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("home.featuresSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="glass-panel rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          MAJORS TICKER
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-primary/5 border-y border-primary/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <h3 className="font-display font-bold text-xl text-muted-foreground">
            {t("home.exploreMajors")}
          </h3>
        </div>
        <div className="relative">
          <div className="flex animate-[scroll_25s_linear_infinite] gap-4 w-max">
            {[...majors, ...majors].map((m, i) => (
              <span
                key={i}
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-card border border-border/50 text-foreground whitespace-nowrap shadow-sm"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold mb-4">
              {t("home.howItWorksTitle")}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              {t("home.howItWorksSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30" />

            {steps.map((s, i) => (
              <motion.div
                key={i}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="text-center relative"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-foreground font-display font-extrabold text-lg mb-6 shadow-lg shadow-primary/25 relative z-10">
                  {s.num}
                </div>
                <h3 className="font-display font-bold text-xl mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={4}
            className="text-center mt-14"
          >
            <Link href="/questionnaire">
              <Button size="lg" className="group">
                {t("home.ctaBottom")}
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 lg:py-28 bg-card/50 border-t border-border/50 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold mb-4">
              {t("home.testimonialsTitle")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("home.testimonialsSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((tm, i) => (
              <motion.div
                key={i}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="glass-panel rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: tm.stars }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">
                  "{tm.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary text-sm">
                    {tm.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{tm.name}</div>
                    <div className="text-xs text-muted-foreground">{tm.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-[0.03] -z-10" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Compass className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold mb-4">
              {t("home.finalCtaTitle")}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              {t("home.finalCtaDesc")}
            </p>
            <Link href="/questionnaire">
              <Button size="lg" className="group text-base px-8 py-6">
                {t("home.cta")}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-border/50 bg-card/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} NorthPath AI. {t("home.footerRights")}</span>
          <span>{t("home.footerDisclaimer")}</span>
        </div>
      </footer>
    </div>
  );
}
