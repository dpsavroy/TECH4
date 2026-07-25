"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  MapPin,
  Maximize2,
  Zap,
  Shield,
  Eye,
  TrendingDown,
  ArrowUpRight,
  ChevronDown,
  BarChart3,
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  type: string;
  location: string;
  area: string;
  techStack: string[];
  keyResult: string;
  resultValue: string;
  description: string;
  details: string[];
  year: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Бизнес-центр «ТехноПлаза»",
    type: "БЦ класса А",
    location: "Москва, Ленинградский пр-т, 39",
    area: "62 000 м²",
    techStack: ["BMS EcoStruxure", "СКУД HID", "CCTV Hikvision"],
    keyResult: "Снижение энергопотребления",
    resultValue: "−18%",
    description:
      "Полная диспетчеризация инженерных систем 35-этажного БЦ с интеграцией СКУД и видеонаблюдения. Единая SCADA-панель для управления климатом, освещением и безопасностью.",
    details: [
      "Интеграция 2 500+ точек BACnet/Modbus в Schneider Electric EcoStruxure",
      "СКУД на 240 точек прохода с биометрией (HID Signo)",
      "Видеонаблюдение — 420 IP-камер Hikvision с видеоаналитикой",
      "Система мониторинга энергопотребления: экономия 2,4 млн руб./год",
      "Обучение штатной службы эксплуатации (12 чел.)",
    ],
    year: "2024",
  },
  {
    id: 2,
    title: "Логистический комплекс «Север»",
    type: "Складской комплекс",
    location: "Московская обл., Солнечногорск",
    area: "48 000 м²",
    techStack: ["BMS Siemens Desigo", "ОПС Hochiki", "CCTV Dahua"],
    keyResult: "Сокращение инцидентов на",
    resultValue: "−35%",
    description:
      "Автоматизация трёх складских корпусов и АБК. Внедрение Helpdesk 24/7 с выездными бригадами и удалённым мониторингом холодоснабжения.",
    details: [
      "Диспетчеризация холодильного оборудования — контроль 120 холодильных камер",
      "Автоматизация ОВиК на базе Siemens Desigo CC",
      "Охранно-пожарная сигнализация Hochiki + ИСО «Орион»",
      "Круглосуточный Helpdesk с SLA 99,8% — 15-минутная реакция",
      "Интеграция управления воротами и доковым оборудованием",
    ],
    year: "2024",
  },
  {
    id: 3,
    title: "Торгово-развлекательный центр «Атриум»",
    type: "ТРЦ",
    location: "Москва, Каширское шоссе, 26",
    area: "85 000 м²",
    techStack: ["BMS Honeywell Niagara", "СКУД Suprema", "CCTV Hikvision"],
    keyResult: "Повышение комфорта посетителей",
    resultValue: "+22% NPS",
    description:
      "Комплексная модернизация BMS и безопасности действующего ТРЦ без остановки арендаторов. Интеллектуальное управление зонами климата и паркингом.",
    details: [
      "Переход с локальной автоматики на Honeywell Niagara Framework",
      "Зонирование климата: 48 независимых зон (арендаторы, галереи, фудкорт)",
      "СКУД для персонала и паркинга — Suprema BioStar 2",
      "Видеонаблюдение с распознаванием номеров на парковке (850 камер)",
      "Интеграция инженерных систем без остановки работы ТРЦ",
    ],
    year: "2023",
  },
  {
    id: 4,
    title: "Центр обработки данных «Восток»",
    type: "ЦОД уровня Tier III",
    location: "Москва, ул. Авиамоторная, 10",
    area: "4 200 м² (2 000 стоек)",
    techStack: ["BMS Delta Controls", "СКУД IronLogic", "CCTV Dahua"],
    keyResult: "Достигнут PUE",
    resultValue: "1,31",
    description:
      "Полный цикл проектирования и запуска ЦОД: автоматизация охлаждения, мониторинг энергопотребления, безопасность периметра и 3-уровневый СКУД.",
    details: [
      "Прецизионное управление охлаждением — Delta Controls enteliWEB",
      "Мониторинг энергопотребления по стойкам (PUE 1,31)",
      "3-уровневая СКУД: периметр, машинные залы, стойки (IronLogic)",
      "Видеоаналитика периметра — Dahua DSS Pro",
      "Круглосуточный Helpdesk с эскалацией до инженеров дата-центра",
    ],
    year: "2024",
  },
  {
    id: 5,
    title: "Гостиничный комплекс «River Park»",
    type: "Отель 5 звёзд",
    location: "Москва, наб. Тараса Шевченко, 23",
    area: "29 000 м² (287 номеров)",
    techStack: ["BMS Schneider", "СКУД HID", "CCTV Hikvision"],
    keyResult: "Экономия на ТО и эксплуатации",
    resultValue: "−27%",
    description:
      "Интеграция BMS с гостиничной PMS-системой. Управление климатом в номерах, СКУД с мобильными ключами, централизованный мониторинг 24/7.",
    details: [
      "Интеграция EcoStruxure с Opera PMS — управление климатом по заселению",
      "СКУД с мобильными ключами HID Mobile Access (287 номеров)",
      "IP-видеонаблюдение Hikvision — 310 камер в公共 зонах и периметре",
      "Автоматизация конференц-залов: климат, освещение, шторы",
      "Вынесенный Helpdesk: 3 инженера на объекте + удалённая поддержка",
    ],
    year: "2023",
  },
  {
    id: 6,
    title: "Медицинский центр «МедГрад»",
    type: "Медицинский центр",
    location: "Москва, Ленинский пр-т, 156",
    area: "14 500 м²",
    techStack: ["BMS Siemens", "СКУД Suprema", "CCTV Dahua"],
    keyResult: "Соответствие стандарту",
    resultValue: "ISO 14644",
    description:
      "Автоматизация чистых помещений и операционных блоков. Контроль температуры, влажности и давления с точностью до десятых. Интеграция с медицинскими газовыми системами.",
    details: [
      "Управление климатом чистых помещений класса ISO 5–8 (Siemens Desigo)",
      "Мониторинг медицинских газов (O₂, N₂O, сжатый воздух)",
      "СКУД с разделением потоков: персонал, пациенты, посетители",
      "Система оповещения и пожаротушения с интеграцией в BMS",
      "Валидация систем согласно GMP и ISO 14644",
    ],
    year: "2024",
  },
];

const typeIcons: Record<string, React.ReactNode> = {
  "БЦ класса А": <Building2 className="w-5 h-5" strokeWidth={1.5} />,
  "Складской комплекс": <Building2 className="w-5 h-5" strokeWidth={1.5} />,
  ТРЦ: <Building2 className="w-5 h-5" strokeWidth={1.5} />,
  "ЦОД уровня Tier III": <Building2 className="w-5 h-5" strokeWidth={1.5} />,
  "Отель 5 звёзд": <Building2 className="w-5 h-5" strokeWidth={1.5} />,
  "Медицинский центр": <Building2 className="w-5 h-5" strokeWidth={1.5} />,
};

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string>("Все");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const el = document.getElementById("projects");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleProject = (id: number) => {
    setExpandedProject((prev) => (prev === id ? null : id));
  };

  const allTypes = ["Все", ...Array.from(new Set(projects.map((p) => p.type)))];

  const filteredProjects =
    filterType === "Все"
      ? projects
      : projects.filter((p) => p.type === filterType);

  return (
    <section id="projects" className="relative py-20 md:py-28 bg-slate-900/60 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-14 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-cyan-400 mb-4">
            Наши проекты
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Выполненные кейсы и внедрения
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Реализованные проекты для коммерческой, промышленной и социальной недвижимости
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {allTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                filterType === type
                  ? "bg-cyan-500/15 border border-cyan-400/40 text-cyan-400 shadow-sm shadow-cyan-500/10"
                  : "border border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-transparent"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          className={`grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {filteredProjects.map((project) => {
            const isExpanded = expandedProject === project.id;
            return (
              <div
                key={project.id}
                className={`group relative flex flex-col rounded-2xl gradient-border transition-all duration-300 ${
                  isExpanded
                    ? "translate-y-[-4px] shadow-xl shadow-cyan-500/5"
                    : "hover:translate-y-[-4px] hover:shadow-lg hover:shadow-cyan-500/5"
                }`}
              >
                {/* Card Content */}
                <div className="flex flex-col flex-1 p-6 md:p-7">
                  {/* Type & Year Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400/80 uppercase tracking-wider">
                      <span className="text-cyan-500">
                        {typeIcons[project.type] || <Building2 className="w-4 h-4" strokeWidth={1.5} />}
                      </span>
                      {project.type}
                    </span>
                    <span className="text-xs font-mono text-slate-600 bg-slate-900/80 px-2 py-0.5 rounded-md border border-white/5">
                      {project.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-3 leading-tight">
                    {project.title}
                  </h3>

                  {/* Location & Area */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                      {project.area}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 border border-white/8 text-slate-300"
                      >
                        {tech.includes("BMS") ? (
                          <Zap className="w-3 h-3 text-cyan-400" strokeWidth={2} />
                        ) : tech.includes("СКУД") ? (
                          <Shield className="w-3 h-3 text-cyan-400" strokeWidth={2} />
                        ) : (
                          <Eye className="w-3 h-3 text-cyan-400" strokeWidth={2} />
                        )}
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Key Result */}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/10 mb-5">
                    <TrendingDown className="w-6 h-6 text-cyan-400 shrink-0" strokeWidth={1.5} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-500 uppercase tracking-wider">
                        {project.keyResult}
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-cyan-400 leading-tight">
                        {project.resultValue}
                      </p>
                    </div>
                  </div>

                  {/* Expand Toggle */}
                  <button
                    onClick={() => toggleProject(project.id)}
                    className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      isExpanded ? "text-cyan-400" : "text-slate-500 hover:text-cyan-400"
                    }`}
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? "Свернуть детали" : "Детализация проекта"}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      strokeWidth={2.5}
                    />
                  </button>

                  {/* Expanded Details */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isExpanded ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pt-4 border-t border-white/5 space-y-2.5">
                      {project.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5 text-sm text-slate-400">
                          <BarChart3 className="w-4 h-4 text-cyan-500/60 shrink-0 mt-0.5" strokeWidth={1.5} />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href="#contacts"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
                    >
                      Обсудить похожий проект
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state when filter yields nothing */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-4" strokeWidth={1} />
            <p className="text-slate-500 text-sm">
              Нет проектов по выбранному фильтру
            </p>
          </div>
        )}

        {/* CTA to contacts */}
        <div className="text-center mt-16">
          <a
            href="#contacts"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 active:scale-[0.97]"
          >
            Стать следующим кейсом
            <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  );
}