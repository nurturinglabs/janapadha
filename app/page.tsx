'use client';

import Link from "next/link";
import {
  Calendar,
  Trophy,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  ArrowRight,
  Award,
  Clock,
  Sparkles,
  BookOpen,
  Users,
  Target,
  Heart,
  PenTool,
} from "lucide-react";
import { useLanguage } from "./context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <LanguageToggle />

      {/* Modern Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 z-40">
        <div className="container-custom py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center relative">
                <BookOpen className="w-5 h-5 text-white" />
                <PenTool className="w-3 h-3 text-white absolute bottom-1 right-1" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t.nav.logo}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                {t.nav.about}
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                {t.nav.howItWorks}
              </a>
              <a href="#rules" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                {t.nav.rules}
              </a>
              <a href="#faq" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                {t.nav.faq}
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                {t.nav.contact}
              </a>
            </div>
            <Link
              href="/register"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 font-semibold"
            >
              {t.nav.register}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Modern & Bold */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2000&auto=format&fit=crop')"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-blue-50/70 to-purple-50/70" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                {t.hero.nextCompetition}
              </div>

              <h1 className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                {t.hero.title}
              </h1>

              <p className="text-2xl md:text-3xl text-gray-700 font-semibold mb-4">
                {t.hero.subtitle}
              </p>

              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
                {t.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Link
                  href="/register"
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 font-semibold text-lg flex items-center gap-2"
                >
                  {t.hero.registerButton}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#about"
                  className="px-8 py-4 rounded-xl border-2 border-gray-200 text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 font-semibold text-lg"
                >
                  {t.hero.learnMore}
                </a>
              </div>

              {/* Stats - Modern Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm border border-gray-100 p-6 rounded-2xl hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl font-black text-blue-600 mb-2">{t.hero.stats.entryFee}</div>
                  <div className="text-sm text-gray-600 font-medium">{t.hero.stats.entryFeeLabel}</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm border border-gray-100 p-6 rounded-2xl hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl font-black text-purple-600 mb-2">{t.hero.stats.frequency}</div>
                  <div className="text-sm text-gray-600 font-medium">{t.hero.stats.frequencyLabel}</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm border border-gray-100 p-6 rounded-2xl hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl font-black text-pink-600 mb-2">{t.hero.stats.location}</div>
                  <div className="text-sm text-gray-600 font-medium">{t.hero.stats.locationLabel}</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm border border-gray-100 p-6 rounded-2xl hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl font-black text-indigo-600 mb-2">{t.hero.stats.grades}</div>
                  <div className="text-sm text-gray-600 font-medium">{t.hero.stats.gradesLabel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Clean & Elegant */}
      <section id="about" className="py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4 text-gray-900">{t.mission.title}</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t.mission.subtitle}
              </p>
            </div>

            {/* Why BAREYIRI Exists */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-12 rounded-3xl mb-16 border border-blue-100">
              <div className="text-center">
                <Heart className="w-12 h-12 text-purple-600 mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-4 text-gray-900">{t.mission.whyExists.title}</h3>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  {t.mission.whyExists.description}
                </p>
              </div>
            </div>

            {/* Key Pillars */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-10 rounded-3xl hover:shadow-2xl transition-all duration-300 border border-blue-100">
                <BookOpen className="w-12 h-12 text-blue-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{t.mission.readingFeeds.title}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t.mission.readingFeeds.description}
                </p>
                <p className="text-gray-600 italic text-sm border-l-4 border-blue-600 pl-4">
                  {t.mission.readingFeeds.quote}
                </p>
              </div>

              <div className="group bg-gradient-to-br from-purple-50 to-purple-100 p-10 rounded-3xl hover:shadow-2xl transition-all duration-300 border border-purple-100">
                <Users className="w-12 h-12 text-purple-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{t.mission.bilingual.title}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t.mission.bilingual.description}
                </p>
                <p className="text-gray-600 italic text-sm border-l-4 border-purple-600 pl-4">
                  {t.mission.bilingual.quote}
                </p>
              </div>
            </div>

            {/* Three Core Values */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="bg-white border border-gray-100 p-8 rounded-2xl hover:shadow-xl hover:border-blue-200 transition-all duration-300">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{t.mission.lifeSkill.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.mission.lifeSkill.description}
                </p>
              </div>

              <div className="bg-white border border-gray-100 p-8 rounded-2xl hover:shadow-xl hover:border-purple-200 transition-all duration-300">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{t.mission.loveLiterature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.mission.loveLiterature.description}
                </p>
              </div>

              <div className="bg-white border border-gray-100 p-8 rounded-2xl hover:shadow-xl hover:border-pink-200 transition-all duration-300">
                <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{t.mission.holistic.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.mission.holistic.description}
                </p>
              </div>
            </div>

            {/* What Makes Us Different */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-10 rounded-3xl border border-gray-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">{t.mission.whatMakes.title}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {t.mission.whatMakes.points.map((point, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: point }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Timeline Style */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 text-gray-900">{t.howItWorks.title}</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-6 mb-16">
            {t.howItWorks.steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`w-16 h-16 ${
                    index === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                    index === 1 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                    index === 2 ? 'bg-gradient-to-br from-pink-500 to-pink-600' :
                    'bg-gradient-to-br from-green-500 to-green-600'
                  } rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <span className="text-3xl font-black text-white">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quarterly Schedule */}
          <div className="max-w-4xl mx-auto bg-white border border-gray-200 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">{t.howItWorks.schedule.title}</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {t.howItWorks.schedule.quarters.map((quarter, index) => (
                <div key={index} className={`p-5 ${
                  index === 0 ? 'bg-blue-50 border-blue-200' :
                  index === 1 ? 'bg-purple-50 border-purple-200' :
                  index === 2 ? 'bg-pink-50 border-pink-200' :
                  'bg-green-50 border-green-200'
                } border-2 rounded-xl`}>
                  <div className={`font-bold text-lg mb-1 ${
                    index === 0 ? 'text-blue-700' :
                    index === 1 ? 'text-purple-700' :
                    index === 2 ? 'text-pink-700' :
                    'text-green-700'
                  }`}>{quarter.name}</div>
                  <div className="text-sm text-gray-600 font-medium">{quarter.months}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dates & Prizes - Side by Side */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Important Dates */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{t.dates.title}</h2>
              </div>
              <div className="space-y-3">
                {t.dates.timeline.map((event, index) => (
                  <div key={index} className={`flex gap-4 p-5 ${
                    index < 2 ? 'bg-blue-50 border-blue-100' :
                    index < 4 ? 'bg-purple-50 border-purple-100' :
                    'bg-pink-50 border-pink-100'
                  } border rounded-xl hover:shadow-md transition-all`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      index < 4 ? 'bg-white' : 'bg-pink-200'
                    }`}>
                      {index < 4 ? (
                        <Clock className={`w-5 h-5 ${
                          index < 2 ? 'text-blue-600' : 'text-purple-600'
                        }`} />
                      ) : (
                        <Trophy className="w-5 h-5 text-pink-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{event.event}</div>
                      <div className="text-sm text-gray-600">{event.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prizes */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                  <Trophy className="w-7 h-7 text-yellow-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{t.prizes.title}</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl border-2 border-yellow-300 hover:shadow-xl transition-all">
                  <div className="text-3xl font-black text-yellow-700 mb-2">{t.prizes.first.medal}</div>
                  <div className="text-gray-700 font-semibold">{t.prizes.first.details}</div>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border-2 border-gray-300 hover:shadow-xl transition-all">
                  <div className="text-3xl font-black text-gray-700 mb-2">{t.prizes.second.medal}</div>
                  <div className="text-gray-700 font-semibold">{t.prizes.second.details}</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border-2 border-orange-300 hover:shadow-xl transition-all">
                  <div className="text-3xl font-black text-orange-700 mb-2">{t.prizes.third.medal}</div>
                  <div className="text-gray-700 font-semibold">{t.prizes.third.details}</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl">
                  <div className="font-semibold text-gray-900 mb-1">{t.prizes.participation.title}</div>
                  <div className="text-sm text-gray-600">{t.prizes.participation.details}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rules - Clean Cards */}
      <section id="rules" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4 text-gray-900">{t.rules.title}</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
              <p className="text-xl text-gray-600">
                {t.rules.subtitle}
              </p>
            </div>

            <div className="space-y-6">
              {t.rules.sections.map((section, index) => (
                <div key={index} className="bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                  </div>
                  {section.intro && (
                    <p className="text-gray-700 mb-4 ml-11">{section.intro}</p>
                  )}
                  <ul className="space-y-2 ml-11">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: item }} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Accordion Style */}
      <section id="faq" className="py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4 text-gray-900">{t.faq.title}</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
            </div>

            <div className="space-y-4">
              {t.faq.questions.map((item, index) => (
                <details key={index} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                  <summary className="p-6 cursor-pointer font-semibold text-lg text-gray-900 hover:text-blue-600 transition-colors flex justify-between items-center">
                    {item.question}
                    <span className="text-blue-600 text-2xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Bold & Centered */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="container-custom text-center relative z-10">
          <Sparkles className="w-16 h-16 text-white/80 mx-auto mb-6" />
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            {t.cta.title}
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.cta.description}
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-xl"
          >
            {t.cta.button}
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-white/80 mt-6 font-medium">{t.cta.deadline}</p>
        </div>
      </section>

      {/* Contact - Modern Cards */}
      <section id="contact" className="py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4 text-gray-900">{t.contact.title}</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
              <p className="text-xl text-gray-600">
                {t.contact.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-8 rounded-2xl hover:shadow-xl transition-all text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-gray-900">{t.contact.email.label}</h3>
                <a
                  href={`mailto:${t.contact.email.value}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {t.contact.email.value}
                </a>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 p-8 rounded-2xl hover:shadow-xl transition-all text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-gray-900">{t.contact.phone.label}</h3>
                <a href={`tel:${t.contact.phone.value}`} className="text-purple-600 hover:text-purple-700 font-medium">
                  {t.contact.phone.value}
                </a>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 p-8 rounded-2xl hover:shadow-xl transition-all text-center">
                <div className="w-16 h-16 bg-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-gray-900">{t.contact.location.label}</h3>
                <p className="text-gray-600 font-medium">{t.contact.location.value}</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-6 font-medium">{t.contact.followUs}</p>
              <div className="flex gap-4 justify-center">
                <a
                  href="#"
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition-all duration-300 font-bold"
                  aria-label="Facebook"
                >
                  f
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition-all duration-300"
                  aria-label="Twitter"
                >
                  𝕏
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition-all duration-300 text-xl"
                  aria-label="Instagram"
                >
                  📷
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal & Clean */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">{t.footer.about.title}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t.footer.about.description}
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">{t.footer.quickLinks.title}</h4>
              <ul className="space-y-3">
                {t.footer.quickLinks.links.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">{t.footer.legal.title}</h4>
              <ul className="space-y-3">
                {t.footer.legal.links.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">{t.footer.support.title}</h4>
              <ul className="space-y-3">
                {t.footer.support.links.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
