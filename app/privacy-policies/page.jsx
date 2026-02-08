import React from 'react';
import Navbar from '@/components/Navbar';


const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Navbar />
      
      <div className="bg-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100 prose prose-blue max-w-none">
          <p className="lead text-xl text-gray-600 mb-8">
            At Evercrest Lending, we value your trust and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Personal identification information (Name, email address, phone number, mailing address)</li>
            <li>Financial information (Income, employment history, bank account details)</li>
            <li>Loan application data (Loan amount, purpose, credit history)</li>
            <li>Communications with our support team</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Process and evaluate your loan applications</li>
            <li>Verify your identity and creditworthiness</li>
            <li>Communicate with you about your account and our services</li>
            <li>Improve our website and customer experience</li>
            <li>Comply with legal and regulatory requirements</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Information Sharing</h2>
          <p className="text-gray-700 mb-4">
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Credit bureaus to report account history</li>
            <li>Service providers who assist in our operations (e.g., payment processing, data storage)</li>
            <li>Legal authorities when required by law or to protect our rights</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Data Security</h2>
          <p className="text-gray-700 mb-4">
            We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and strict access controls.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Your Rights</h2>
          <p className="text-gray-700 mb-4">
            Depending on your location, you may have the right to:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data (subject to legal retention requirements)</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-900">Evercrest Lending Privacy Team</p>
            <p className="text-gray-600">N Western St ,	San Juan</p>
            <p className="text-gray-600">Metro Manila 1502 Philippines</p>
            <p className="text-gray-600 mt-2">Email: privacy@evercrestlending.com</p>
            <p className="text-gray-600">Phone: +63 931 870 2559</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PrivacyPolicyPage;