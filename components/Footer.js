import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/#about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policies' },
    { name: 'Terms & Conditions', href: '/terms' },
  ];

  const servicesLinks = [
    { name: 'Personal Loans', href: '/services#personal' },
    { name: 'Home Mortgages', href: '/services#mortgages' },
    { name: 'Business Loans', href: '/services#business' },
    { name: 'Student Loans', href: '/services#student' },
    { name: 'Debt Consolidation', href: '/services#debt' },
  ];

  const socialLinks = [
    { Icon: Facebook, href: 'https://facebook.com' },
    { Icon: Twitter, href: 'https://twitter.com' },
    { Icon: Instagram, href: 'https://instagram.com' },
    { Icon: Linkedin, href: 'https://linkedin.com' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4 brightness-0 invert">
              <Image src="/logo.png" alt="Logo" width={160} height={48} className="h-12 w-auto" />
            </div>
            <p className="text-gray-400 mb-4">Your trusted partner for financial growth and stability. We provide secure and fast lending solutions tailored to your needs.</p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href || '#'} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent">
                  <social.Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Quick Links', links: quickLinks },
            { title: 'Services', links: servicesLinks }
          ].map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href || '#'} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex"><MapPin className="mr-2 text-brand-accent" size={20} /> N Western St ,	San Juan	Metro Manila 1502 Philippines</li>
              <li className="flex"><Phone className="mr-2 text-brand-accent" size={20} /> +63 931 870 2559</li>
              <li className="flex"><Mail className="mr-2 text-brand-accent" size={20} /> support@evercrestl.com</li>
            </ul>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Evercrest Lending. All rights reserved.</p>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
