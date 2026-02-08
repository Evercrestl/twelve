"use client"
import Link from 'next/link';
import { useState } from 'react';
import LoanModal from '@/components/LoanModal';
import Navbar from "@/components/Navbar"
import { ArrowRight, Shield, Clock, Percent, CheckCircle, TrendingUp, Users } from 'lucide-react';


export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://public.youware.com/users-website-assets/prod/0060604d-563e-4b70-9f2f-5525f45b31de/6221bd8b874a420f8a783247e1f0787e.jpg"
            alt="Happy couple moving into new home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#003d80]/90 to-[#0056b3]/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left w-full">
          <div className="md:w-2/3 lg:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Building Your Future, <br />
              <span className="text-[#00a8e8]">One Loan at a Time</span>
            </h1>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Experience hassle-free lending with Evercrest. Whether it's your dream home or business expansion, we provide the financial foundation you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <button className="px-8 py-4 bg-[#00a8e8] text-white font-semibold rounded-lg hover:bg-blue-400 transition-all shadow-lg flex items-center justify-center">
                  Get Started Now <ArrowRight className="ml-2" size={20} />
                </button>
              </Link>
              <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white text-white font-semibold rounded-lg hover:bg-white/20 transition-all flex items-center justify-center">
                View Rates
              </button>
              <LoanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Evercrest?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We combine modern technology with traditional banking values to offer you the best lending experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#e6f0fa] rounded-xl hover:shadow-xl transition-shadow duration-300 border border-blue-100">
              <div className="w-14 h-14 bg-[#0056b3] rounded-lg flex items-center justify-center mb-6 text-white">
                <Percent size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Competitive Rates</h3>
              <p className="text-gray-600 bg-">
                We offer some of the lowest interest rates in the market, ensuring your loan is affordable and manageable.
              </p>
            </div>

            <div className="p-8 bg-[#e6f0fa] rounded-xl hover:shadow-xl transition-shadow duration-300 border border-blue-100">
              <div className="w-14 h-14 bg-[#0056b3] rounded-lg flex items-center justify-center mb-6 text-white">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Approval</h3>
              <p className="text-gray-600">
                Our streamlined digital process means you can get approved in minutes, not days. No more waiting in lines.
              </p>
            </div>

            <div className="p-8 bg-[#e6f0fa] rounded-xl hover:shadow-xl transition-shadow duration-300 border border-blue-100">
              <div className="w-14 h-14 bg-[#0056b3] rounded-lg flex items-center justify-center mb-6 text-white">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Private</h3>
              <p className="text-gray-600">
                Your financial data is protected with bank-grade encryption. We prioritize your privacy and security above all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img
                src="https://public.youware.com/users-website-assets/prod/0060604d-563e-4b70-9f2f-5525f45b31de/c6d11673c2f54d2a9c9b4532128016a4.jpg"
                alt="Business handshake"
                className="rounded-2xl shadow-2xl w-full object-cover h-125"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Committed to Your Financial Success</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Evercrest Lending, we believe that financial freedom should be accessible to everyone. Founded in 2010, we have helped over 50,000 families and businesses achieve their goals.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our team of financial experts works tirelessly to find the best loan solutions for your unique situation. We don't just lend money; we build lasting partnerships.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="text-brand-blue mr-3" size={24} />
                  <span className="text-gray-800 font-medium">Transparent terms with no hidden fees</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-brand-blue mr-3" size={24} />
                  <span className="text-gray-800 font-medium">Personalized loan options</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-brand-blue mr-3" size={24} />
                  <span className="text-gray-800 font-medium">24/7 Customer support</span>
                </div>
              </div>

              <Link href="/contact">
                <button className="mt-8 px-6 py-3 border-2 border-[#0056b3] text-brand-blue font-semibold rounded-lg hover:bg-[#889fb8] hover:text-white transition-colors">
                  Learn More About Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#0056b3] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">R500M+</div>
              <div className="text-blue-200">Loans Funded</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50k+</div>
              <div className="text-blue-200">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-200">Approval Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-200">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Lending Solutions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tailored financial products designed to meet your specific needs at every stage of life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: "personal-loans", title: "Personal Loans", icon: Users, desc: "Flexible personal loans for debt consolidation, travel, or unexpected expenses." },
              { id: "home-mortgages", title: "Home Mortgages", icon: Shield, desc: "Competitive mortgage rates to help you buy your dream home with confidence." },
              { id: "business-growth", title: "Business Growth", icon: TrendingUp, desc: "Capital to expand your business, buy equipment, or hire new talent." },
              { id: "auto-loans", title: "Auto Loans", icon: ArrowRight, desc: "Get behind the wheel faster with our quick auto loan approvals." },
              { id: "student-loans", title: "Student Loans", icon: Percent, desc: "Invest in your education with low-interest student loan options." },
              { id: "refinancing", title: "Refinancing", icon: Clock, desc: "Lower your monthly payments by refinancing your existing loans." }
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:border-[#0056b3]/30 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-brand-light text-[#0056b3] rounded-full flex items-center justify-center mb-6">
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <Link href={`/services#${service.id}`} className="text-brand-blue font-medium hover:text-brand-dark flex items-center">
                  Learn more <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://public.youware.com/users-website-assets/prod/0060604d-563e-4b70-9f2f-5525f45b31de/2c826f5c72c942bc8a92393c682b86f0.jpg"
            alt="Finance background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Take the Next Step?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied customers who have chosen Evercrest Lending for their financial needs. Apply today and get a decision in minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <button className="px-8 py-4 bg-brand-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-lg">
                Apply Now
              </button>
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-transparent border border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors inline-block">
              Contact Support
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
