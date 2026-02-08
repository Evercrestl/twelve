"use client"
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';
import { ArrowRight, Shield, TrendingUp, Users, Car, GraduationCap, RefreshCw } from 'lucide-react';
import Link from 'next/link';

const ServicesPage = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const services = [
    {
      id: "personal-loans",
      title: "Personal Loans",
      icon: Users,
      description: "Flexible personal loans designed to help you manage life's expenses. whether you're consolidating debt, planning a wedding, or covering unexpected costs.",
      features: ["Rates as low as 5.99% APR", "Loan amounts up to R50,000", "No prepayment penalties", "Funds in as little as 24 hours"]
    },
    {
      id: "home-mortgages",
      title: "Home Mortgages",
      icon: Shield,
      description: "Find your dream home with our competitive mortgage rates. We offer a variety of terms and options to fit your budget and lifestyle.",
      features: ["Fixed and adjustable rate options", "FHA and VA loans available", "First-time homebuyer programs", "Fast pre-approval process"]
    },
    {
      id: "business-growth",
      title: "Business Growth",
      icon: TrendingUp,
      description: "Fuel your business expansion with our tailored commercial lending solutions. From equipment financing to working capital, we have you covered.",
      features: ["Lines of credit up to R500k", "Equipment financing", "SBA loan assistance", "Dedicated business relationship manager"]
    },
    {
      id: "auto-loans",
      title: "Auto Loans",
      icon: Car,
      description: "Get behind the wheel of your new car faster. Our auto loans offer low rates and flexible terms for both new and used vehicles.",
      features: ["Rates starting at 3.49% APR", "Terms up to 84 months", "Refinancing available", "Easy online application"]
    },
    {
      id: "student-loans",
      title: "Student Loans",
      icon: GraduationCap,
      description: "Invest in your future with our student loan options. We offer competitive rates to help you pay for tuition, books, and housing.",
      features: ["Variable and fixed rates", "Deferred payment options", "Cosigner release available", "No origination fees"]
    },
    {
      id: "refinancing",
      title: "Refinancing",
      icon: RefreshCw,
      description: "Lower your monthly payments or pay off your loan sooner by refinancing. We make the process simple and transparent.",
      features: ["Consolidate high-interest debt", "Lower your interest rate", "Change your loan term", "Cash-out refinancing options"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Navbar />

      {/* Header Section */}
      <div className="bg-brand-blue pt-32 pb-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Comprehensive financial solutions tailored to your unique needs. Explore our range of lending products below.
          </p>
        </div>
      </div>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-20">
          {services.map((service, index) => (
            <div key={service.id} id={service.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
              <div className="lg:w-1/2">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-full">
                  <div className="w-16 h-16 bg-brand-light text-brand-blue rounded-xl flex items-center justify-center mb-6">
                    <service.icon size={32} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits:</h3>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-brand-accent rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href="/register">
                    <button className="px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors flex items-center">
                      Apply for {service.title} <ArrowRight size={18} className="ml-2" />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                {/* Placeholder for service image - using a generic finance one for now */}
                <img
                  src="https://public.youware.com/users-website-assets/prod/0060604d-563e-4b70-9f2f-5525f45b31de/2c826f5c72c942bc8a92393c682b86f0.jpg"
                  alt={service.title}
                  className="rounded-2xl shadow-lg object-cover w-full h-100"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Not sure which loan is right for you?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Our financial experts are here to help you find the perfect solution for your situation.
          </p>

          <Link href="/contact">
            <button className="px-8 py-4 bg-white text-brand-blue font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
              Talk to an Expert
            </button>
          </Link>
        </div>
      </section>
      {/* <Footer /> */}
    </div>

  );
};

export default ServicesPage;
