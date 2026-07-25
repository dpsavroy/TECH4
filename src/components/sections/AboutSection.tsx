"use client";

import { useEffect, useState } from "react";
import {
  Zap,
  Building2,
  Users,
  Trophy,
  Target,
  TrendingUp,
  Shield,
  Clock,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

const stats = [
  { icon: <Building2 className="w-6 h-6" strokeWidth={1.5} />, value: "150+", label: "Реализованных проектов" },
  { icon: <Users className="w-6 h-6" strokeWidth={1.5} />, value: "80+", label: "Инженеров в штате" },
  { icon: <Clock className="w-6 h-6" strokeWidth={1.5} />, value: "10 лет", label: "На рынке автоматизации" },
  { icon: <Trophy className="w-6 h-6" strokeWidth={1.5} />, value: "50+", label: "Корпоративных клиентов" },
];

const values = [
  {
    icon: <Target className="w-6 h-6" strokeWidth={1.5} />,
    title: "Инженерная экспертиза",
    desc: "Каждый сотрудник проходит сертификацию вендоров. Мы не просто интеграторы — мы инженеры, создающие надёжные решения.",
  },
  {
    icon: <Shield className="w-6 h-6" strokeWidth={1.5} />,
    title: "Надёжность 24/7",
    desc: "Собственная круглосуточная служба поддержки с трёхуровневой системой эскалации. SLA 99,8% с финансовой гарантией.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" strokeWidth={1.5} />,
    title: "Измеримый результат",
    desc: "Все метрики проекта фиксируются в дашборде: энергоэффективность, время реакции, кол-во инцидентов. Экономия от 15% годовых.",
  },
  {
    icon: <BadgeCheck className="w-6 h-6" strokeWidth={1.5} />,
    title: "Вендоронезависимость",
    desc: "Подбираем оптимальный стек оборудования под бюджет и задачи. Партнёры: Schneider Electric, Siemens, Honeywell, Delta Controls, Hikvision.",
  },
];

const timelineItems = [
  {
    year: "2014",
    title: "Основание компании",
    desc: "Старт как инженерный интегратор слаботочных систем с командой из 5 человек.",
  },
  {
    year: "2016",
    title: "Запуск Helpdesk 24/7",
    desc: "Собственная круглосуточная служба поддержки. Первый контракт на аутсорсинг эксплуатации БЦ класса А.",
  },
  {
    year: "2018",
    title: "BMS-направление",
    desc: "Аккредитация Schneider Electric EcoXpert. Реализация диспетчеризации для портфеля из 12 объектов.",
  },
  {
    year: "2020",
    title: "Комплексная безопасность",
    desc: "Запуск направления систем безопасности: СКУД, видеонаблюдение, ОПС с полным циклом проектирования.",
  },
  {
    year: "2023",
    title: "Цифровая трансформация",
    desc: "Облачная диспетчеризация, предиктивная аналитика, IoT-платформа для удалённого управления.",
  },
  {
    year: "2025",
    title: "Масштабирование",
    desc: "Расширение портфеля до 150+ объектов. Партнёрство с ведущими девелоперами и УК.",
  },
];

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const el = document.getElementById("about");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && !animated) {
      // Delay slightly for stats counter animation feel
      const t = setTimeout(() => setAnimated(true), 200);
      return () => clearTimeout(t);
    }
  }, [isVisible, animated]);

  return (
    <section id="about" className="relative py-20 md:py-28 bg-slate-900/40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-cyan-500/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-14 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-cyan-400 mb-4">
            О компании
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            TECH4 — надёжный партнёр в инженерной автоматизации
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Мы проектируем, внедряем и обслуживаем интеллектуальные системы управления зданиями
            для коммерческой и промышленной недвижимости по всей России.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 mb-16 md:mb-24 transition-all duration-700 ${
            animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center text-center p-6 rounded-2xl gradient-border group hover:translate-y-[-4px] transition-all duration-300"
            >
              <div className="p-3 rounded-xl border border-white/10 bg-slate-900/50 text-cyan-400 mb-4 transition-all duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-500/10">
                {stat.icon}
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-white mb-1" style={{ fontVariantNumeric: "tabular-nums" }}>
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-slate-400">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Mission & Values */}
        <div className="grid lg:grid-cols-2 gap-10 md:gap-14 items-center mb-16 md:mb-24">
          {/* Mission Text */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-5">
              <Zap className="w-3.5 h-3.5" strokeWidth={2.5} />
              Наша миссия
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight">
              Делаем здания умными, эксплуатацию — прозрачной, бизнес — эффективным
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              TECH4 — это команда инженеров, объединённых общей целью: создавать и обслуживать
              интеллектуальные системы управления недвижимостью, которые реально экономят ресурсы
              и повышают качество эксплуатации.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Мы не продаём «коробочные» решения. Мы погружаемся в бизнес-процессы заказчика,
              проектируем систему под конкретный объект и сопровождаем её на всём жизненном цикле —
              от концепции до круглосуточной поддержки.
            </p>
            <div className="mt-6">
              <a
                href="#contacts"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
              >
                Обсудить сотрудничество
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Values Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((val, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl gradient-border transition-all duration-300 hover:translate-y-[-3px] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${100 + idx * 100}ms` }}
              >
                <div className="p-2.5 rounded-xl border border-white/10 bg-slate-900/50 text-cyan-400 mb-3 inline-block">
                  {val.icon}
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">{val.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline / History */}
        <div className="mb-16 md:mb-24">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-slate-500 mb-3">
              История развития
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              От стартапа до системного интегратора
            </h3>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-white/10 to-transparent transform md:-translate-x-px" />

            <div className="space-y-8">
              {timelineItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row gap-4 md:gap-8 items-start transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-cyan-400 border-2 border-slate-950 transform -translate-x-1/2 mt-1.5 shadow-sm shadow-cyan-500/30 z-10" />

                  {/* Content Card — alternating sides */}
                  <div
                    className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] p-5 rounded-2xl gradient-border transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 ${
                      idx % 2 === 0 ? "md:mr-auto md:text-right" : "md:ml-auto md:text-left md:order-2"
                    }`}
                    style={{ order: idx % 2 === 0 ? 1 : 2 }}
                  >
                    <span className="inline-block text-xs font-bold font-mono text-cyan-400 mb-2">
                      {item.year}
                    </span>
                    <h4 className="text-sm font-semibold text-white mb-1.5">{item.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" style={{ order: idx % 2 === 0 ? 2 : 1 }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partners Banner */}
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.1em] uppercase text-slate-600 mb-6">
            Технологические партнёры
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {["Schneider Electric", "Siemens", "Honeywell", "Delta Controls", "Hikvision", "Dahua Technology"].map(
              (partner) => (
                <span
                  key={partner}
                  className="text-sm font-semibold text-slate-500 hover:text-slate-300 transition-colors cursor-default"
                >
                  {partner}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}