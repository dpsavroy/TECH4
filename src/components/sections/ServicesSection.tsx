"use client";

import { useEffect, useState, useRef } from "react";
import {
  Cpu,
  BarChart3,
  Thermometer,
  Headset,
  Wrench,
  Clock,
  Shield,
  Eye,
  Lock,
  Radio,
  PenTool,
  Cog,
  Package,
  Settings,
  ChevronDown,
  AlertCircle,
} from "lucide-react";

const coreServices = [
  {
    icon: <Cpu className="w-8 h-8" strokeWidth={1.5} />,
    title: "Диспетчеризация и BMS",
    subtitle: "Автоматизация инженерных систем",
    description:
      "Построение централизованных систем мониторинга и управления климатом, вентиляцией, энергопотреблением и освещением. Интеграция протоколов BACnet, Modbus, KNX в единый интерфейс.",
    bullets: [
      { icon: <BarChart3 className="w-4 h-4" />, text: "Мониторинг энергоэффективности (ISO 50001)" },
      { icon: <Thermometer className="w-4 h-4" />, text: "Управление микроклиматом (ОВиК, чиллеры, VRF)" },
      { icon: <Radio className="w-4 h-4" />, text: "Диспетчеризация в реальном времени (SCADA)" },
    ],
    subcategories: [
      "Интеграция BACnet, Modbus, KNX, M-Bus, OPC UA",
      "Программирование контроллеров Siemens, Schneider, Honeywell",
      "Облачная диспетчеризация с мобильным доступом",
      "Автоматическое управление освещением DALI",
      "Мониторинг ИБП, ДГУ, трансформаторных подстанций",
    ],
  },
  {
    icon: <Headset className="w-8 h-8" strokeWidth={1.5} />,
    title: "Helpdesk и поддержка 24/7",
    subtitle: "Сервисное обслуживание и аутсорсинг",
    description:
      "Круглосуточная служба поддержки с гарантированным SLA. Выездные инженеры, удалённая диагностика, плановое ТО и аутсорсинг эксплуатации инженерных систем.",
    bullets: [
      { icon: <Clock className="w-4 h-4" />, text: "Реакция на инциденты от 15 минут (SLA 99,8%)" },
      { icon: <Wrench className="w-4 h-4" />, text: "Выездные бригады инженеров (45 мин. – Москва)" },
      { icon: <Headset className="w-4 h-4" />, text: "Аутсорсинг эксплуатации (Service Desk + ТО)" },
    ],
    subcategories: [
      "Приём заявок: телефон, email, Telegram-бот",
      "Планово-предупредительное ТО (ППР)",
      "Удалённая диагностика и мониторинг 24/7",
      "Ведение технической документации в EAM-системе",
      "Ежемесячная отчётность и KPI-дашборды",
    ],
  },
  {
    icon: <Shield className="w-8 h-8" strokeWidth={1.5} />,
    title: "Интеграция систем безопасности",
    subtitle: "СКУД, видеонаблюдение, ОПС",
    description:
      "Проектирование и интеграция комплексных систем безопасности: контроль доступа, IP-видеонаблюдение, охранно-пожарная сигнализация в едином центре управления.",
    bullets: [
      { icon: <Lock className="w-4 h-4" />, text: "СКУД и биометрия (HID, Suprema, IronLogic)" },
      { icon: <Eye className="w-4 h-4" />, text: "IP-видеонаблюдение и видеоаналитика (Hikvision, Dahua)" },
      { icon: <Shield className="w-4 h-4" />, text: "ОПС и пожаротушение (SAP, Hochiki, ИСО «Орион»)" },
    ],
    subcategories: [
      "Проектирование СКУД любой сложности",
      "Видеоаналитика: распознавание лиц, номеров, периметр",
      "Системы охранно-пожарной сигнализации (ОПС)",
      "СКУД-интеграция с BMS и лифтовыми системами",
      "Аудит и модернизация существующих систем",
    ],
  },
];

const engineeringCompetencies = [
  {
    icon: <PenTool className="w-5 h-5" />,
    title: "Проектирование слаботочных систем",
    desc: "Разработка проектной и рабочей документации (стадии П и Р) СКС, ЛВС, СКУД, ОПС, видеонаблюдения по ГОСТ Р 21.1101.",
  },
  {
    icon: <Cog className="w-5 h-5" />,
    title: "Автоматизация ОВиК",
    desc: "Программирование контроллеров, щиты автоматики, интеграция частотных приводов и датчиков в единую SCADA-систему.",
  },
  {
    icon: <Package className="w-5 h-5" />,
    title: "Поставка оборудования",
    desc: "Прямые поставки оборудования Schneider Electric, Siemens, Honeywell, Hikvision, Delta Controls со склада и под заказ.",
  },
  {
    icon: <Settings className="w-5 h-5" />,
    title: "Пусконаладочные работы",
    desc: "ПНР систем автоматизации и безопасности, холодное/горячее тестирование, обучение персонала, передача в эксплуатацию.",
  },
];

interface FaqItem {
  q: string;
  a: string;
}

const faqItems: FaqItem[] = [
  {
    q: "С какими BMS-платформами вы работаете?",
    a: "Мы работаем с ведущими мировыми платформами: Schneider Electric EcoStruxure, Siemens Desigo CC, Honeywell Niagara (Tridium), Delta Controls enteliWEB, а также с открытыми решениями на базе BACnet/Modbus. Наши инженеры сертифицированы по каждой из платформ, что позволяет нам подбирать оптимальный стек под бюджет и задачи конкретного объекта.",
  },
  {
    q: "Как быстро реагирует Helpdesk 24/7?",
    a: "Среднее время реакции на критические инциденты — 15 минут. Выезд инженера по Москве — в течение 45 минут, по Московской области — до 2 часов. Для удалённых объектов доступна круглосуточная дистанционная диагностика с возможностью перезапуска/перенастройки оборудования без выезда.",
  },
  {
    q: "Можно ли интегрировать уже установленные системы безопасности?",
    a: "Да, это одна из наших ключевых компетенций. Мы выполняем аудит существующих систем, разрабатываем план миграции/интеграции и поэтапно подключаем оборудование разных вендоров в единый интерфейс управления без остановки бизнес-процессов.",
  },
  {
    q: "Берёте ли объекты без диспетчеризации на обслуживание?",
    a: "Безусловно. Мы часто начинаем с аудита и сервисного обслуживания, а затем предлагаем поэтапное внедрение диспетчеризации. Это позволяет заказчику плавно перейти к цифровому управлению зданием без капитальных затрат на старте.",
  },
];

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const el = document.getElementById("services");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleCard = (idx: number) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="services" className="relative py-20 md:py-28 bg-slate-950 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-14 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-cyan-400 mb-4">
            Ключевые направления
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Интеллектуальные решения для вашего объекта
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Полный спектр услуг по автоматизации, безопасности и эксплуатации
            коммерческой и промышленной недвижимости.
          </p>
        </div>

        {/* Core Services Cards Grid */}
        <div
          className={`grid md:grid-cols-3 gap-6 md:gap-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {coreServices.map((service, idx) => {
            const isExpanded = expandedCards.has(idx);
            return (
              <div
                key={idx}
                className={`group relative flex flex-col p-6 md:p-8 rounded-2xl gradient-border cursor-default transition-all duration-300 ${
                  activeCard === idx
                    ? "translate-y-[-6px] shadow-xl shadow-cyan-500/5 border-cyan-500/30"
                    : "translate-y-0"
                }`}
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Card Header */}
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className={`p-3 rounded-xl border transition-all duration-500 shrink-0 ${
                      activeCard === idx
                        ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-400"
                        : "border-white/10 bg-slate-900/50 text-slate-400"
                    }`}
                  >
                    {service.icon}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-cyan-400/70 mt-1">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">
                  {service.description}
                </p>

                {/* Bullet points */}
                <div className="space-y-2.5 pt-5 border-t border-white/5 mb-4">
                  {service.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-3 text-sm">
                      <span
                        className={`transition-colors duration-300 shrink-0 ${
                          activeCard === idx ? "text-cyan-400" : "text-slate-500"
                        }`}
                      >
                        {bullet.icon}
                      </span>
                      <span className="text-slate-300">{bullet.text}</span>
                    </div>
                  ))}
                </div>

                {/* Expand button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCard(idx);
                  }}
                  className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isExpanded ? "text-cyan-400" : "text-slate-500 hover:text-cyan-400"
                  }`}
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? "Свернуть" : "Подробнее"}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    strokeWidth={2.5}
                  />
                </button>

                {/* Expandable subcategories */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isExpanded ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pt-3 border-t border-white/5 space-y-2">
                    {service.subcategories.map((sub, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2.5 text-sm text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60 shrink-0" />
                        {sub}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accent glow on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 ${
                    activeCard === idx ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background:
                      "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(6,182,212,0.06), transparent 40%)",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Engineering Competencies Grid */}
        <div className="mt-20 md:mt-28">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-slate-500 mb-3">
              Дополнительные компетенции
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Инженерный консалтинг и реализация
            </h3>
            <p className="mt-3 text-slate-400 max-w-lg mx-auto text-sm">
              Закрываем полный цикл — от проекта до сдачи в эксплуатацию
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {engineeringCompetencies.map((comp, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col items-center text-center p-6 rounded-2xl gradient-border transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-cyan-500/5"
              >
                <div className="p-3 rounded-xl border border-white/10 bg-slate-900/50 text-cyan-400 mb-4 transition-all duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-500/10">
                  {comp.icon}
                </div>
                <h4 className="text-sm font-semibold text-white mb-2">{comp.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-20 md:mt-28">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-cyan-400 mb-3">
              FAQ
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Часто задаваемые вопросы
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  ref={(el) => {
                    faqRefs.current[idx] = el;
                  }}
                  className="gradient-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle
                        className={`w-5 h-5 shrink-0 transition-colors ${
                          isOpen ? "text-cyan-400" : "text-slate-500"
                        }`}
                        strokeWidth={1.5}
                      />
                      <span
                        className={`text-sm sm:text-base font-medium transition-colors ${
                          isOpen ? "text-white" : "text-slate-300"
                        }`}
                      >
                        {item.q}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-all duration-300 ${
                        isOpen ? "rotate-180 text-cyan-400" : "text-slate-500"
                      }`}
                      strokeWidth={2}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-5 pl-14">
                      <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}