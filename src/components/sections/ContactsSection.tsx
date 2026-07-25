"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertTriangle,
  Building2,
  Headset,
  ArrowRight,
} from "lucide-react";

const contactInfo = {
  address: {
    label: "Центральный офис",
    lines: ["Москва, Пресненская набережная, 12", "БЦ «Башня Федерация», 45 этаж"],
    icon: <MapPin className="w-5 h-5" strokeWidth={1.5} />,
  },
  phones: [
    {
      label: "Отдел продаж",
      value: "+7 (495) 123-45-67",
      href: "tel:+74951234567",
      icon: <Phone className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      label: "Техподдержка 24/7",
      value: "+7 (495) 765-43-21",
      href: "tel:+74957654321",
      icon: <Headset className="w-5 h-5" strokeWidth={1.5} />,
    },
  ],
  emails: [
    {
      label: "Общие вопросы",
      value: "info@tech4.ru",
      href: "mailto:info@tech4.ru",
      icon: <Mail className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
      label: "Техподдержка",
      value: "support@tech4.ru",
      href: "mailto:support@tech4.ru",
      icon: <Clock className="w-5 h-5" strokeWidth={1.5} />,
    },
  ],
};

const serviceOptions = [
  { value: "", label: "Выберите направление" },
  { value: "bms", label: "Диспетчеризация и BMS" },
  { value: "helpdesk", label: "Helpdesk и поддержка 24/7" },
  { value: "integration", label: "Интеграция систем безопасности" },
  { value: "audit", label: "Аудит и консалтинг" },
  { value: "other", label: "Другое" },
];

export function ContactsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const el = document.getElementById("contacts");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate form submission (в реальности здесь был бы API-запрос)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormState({ name: "", company: "", email: "", phone: "", service: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contacts" className="relative py-20 md:py-28 bg-slate-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-blue-600/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-14 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-cyan-400 mb-4">
            Контакты
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Обсудим ваш проект
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Оставьте заявку — мы свяжемся с вами в течение рабочего дня. Для срочных вопросов звоните в техподдержку 24/7.
          </p>
        </div>

        <div
          className={`grid lg:grid-cols-5 gap-10 md:gap-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Contact Form — 3 cols */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Two-column row: Name + Company */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Имя <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Иван Петров"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="company" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Компания <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formState.company}
                    onChange={handleChange}
                    placeholder='ООО "Ваша компания"'
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all"
                  />
                </div>
              </div>

              {/* Two-column row: Email + Phone */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Email <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="ivan@company.ru"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder="+7 (999) 123-45-67"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all"
                  />
                </div>
              </div>

              {/* Service Select */}
              <div className="space-y-1.5">
                <label htmlFor="service" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Направление <span className="text-cyan-400">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={formState.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 0.75rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.25rem",
                    paddingRight: "2.5rem",
                  }}
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} disabled={opt.value === ""} className="bg-slate-900 text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Сообщение <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Опишите задачу, тип объекта, сроки..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {status === "sending" ? (
                  <>
                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Отправка...
                  </>
                ) : (
                  <>
                    Отправить заявку
                    <Send className="w-4 h-4" strokeWidth={2} />
                  </>
                )}
              </button>

              {/* Status Messages */}
              {status === "success" && (
                <div className="flex items-center gap-2.5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                  <CheckCircle className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                  <span>Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.</span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2.5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertTriangle className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                  <span>Произошла ошибка при отправке. Пожалуйста, позвоните нам или попробуйте позже.</span>
                </div>
              )}
            </form>
          </div>

          {/* Contact Info Sidebar — 2 cols */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 space-y-8">
              {/* Address Card */}
              <div className="p-6 rounded-2xl gradient-border">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl border border-white/10 bg-slate-900/50 text-cyan-400 shrink-0">
                    {contactInfo.address.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">{contactInfo.address.label}</h4>
                    {contactInfo.address.lines.map((line, i) => (
                      <p key={i} className="text-sm text-slate-400">{line}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Phones Card */}
              <div className="p-6 rounded-2xl gradient-border space-y-4">
                <h4 className="text-xs font-semibold tracking-[0.1em] uppercase text-slate-500 mb-3">
                  Телефоны
                </h4>
                {contactInfo.phones.map((phone) => (
                  <a
                    key={phone.value}
                    href={phone.href}
                    className="flex items-center gap-3 group hover:bg-white/5 rounded-xl p-2 -mx-2 transition-all"
                  >
                    <div className="p-2 rounded-lg border border-white/10 bg-slate-900/50 text-cyan-400 shrink-0 group-hover:border-cyan-400/30 group-hover:bg-cyan-500/10 transition-all">
                      {phone.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">{phone.label}</p>
                      <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {phone.value}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0 ml-auto" strokeWidth={2} />
                  </a>
                ))}
              </div>

              {/* Email Card */}
              <div className="p-6 rounded-2xl gradient-border space-y-4">
                <h4 className="text-xs font-semibold tracking-[0.1em] uppercase text-slate-500 mb-3">
                  Email
                </h4>
                {contactInfo.emails.map((email) => (
                  <a
                    key={email.value}
                    href={email.href}
                    className="flex items-center gap-3 group hover:bg-white/5 rounded-xl p-2 -mx-2 transition-all"
                  >
                    <div className="p-2 rounded-lg border border-white/10 bg-slate-900/50 text-cyan-400 shrink-0 group-hover:border-cyan-400/30 group-hover:bg-cyan-500/10 transition-all">
                      {email.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">{email.label}</p>
                      <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {email.value}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0 ml-auto" strokeWidth={2} />
                  </a>
                ))}
              </div>

              {/* Work Hours */}
              <div className="p-6 rounded-2xl gradient-border">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl border border-white/10 bg-slate-900/50 text-cyan-400 shrink-0">
                    <Clock className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Режим работы</h4>
                    <p className="text-sm text-slate-400">Офис: Пн–Пт, 9:00–18:00</p>
                    <p className="text-sm text-slate-400 mt-1">Техподдержка: Круглосуточно, 24/7</p>
                  </div>
                </div>
              </div>

              {/* Quick CTA */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                <div className="flex items-start gap-3">
                  <Building2 className="w-8 h-8 text-cyan-400 shrink-0" strokeWidth={1.5} />
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Нужна срочная консультация?</h4>
                    <p className="text-xs text-slate-400 mb-3">
                      Позвоните в техподдержку 24/7 — дежурный инженер ответит в течение 15 минут.
                    </p>
                    <a
                      href="tel:+74957654321"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      +7 (495) 765-43-21
                      <ArrowRight className="w-4 h-4" strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}