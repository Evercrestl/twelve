import React from 'react';
import Navbar from '@/components/Navbar';


const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Navbar />
      
      <div className="bg-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100 prose prose-blue max-w-none">
          <p className="lead text-xl text-gray-600 mb-8">
            Welcome to Evercrest Lending. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 mb-4">
            By accessing or using the Evercrest Lending website or services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you must not use our services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Eligibility</h2>
          <p className="text-gray-700 mb-4">
            To use our services, you must be at least 18 years old and a legal resident of the jurisdiction in which you reside. You represent and warrant that you have the right, authority, and capacity to enter into this agreement.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Loan Application and Approval</h2>
          <p className="text-gray-700 mb-4">
            All loan applications are subject to approval based on our credit criteria and underwriting standards. Submission of an application does not guarantee approval. We reserve the right to decline any application at our sole discretion.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Repayment Terms</h2>
          <p className="text-gray-700 mb-4">
            You agree to repay your loan in accordance with the terms set forth in your loan agreement. Failure to make timely payments may result in late fees, additional interest, and negative reporting to credit bureaus.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Interest and Fees</h2>
          <p className="text-gray-700 mb-4">
            Interest rates and fees vary based on the loan product and your creditworthiness. All applicable rates and fees will be disclosed to you in your loan agreement before you accept the loan.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Limitation of Liability</h2>
          <p className="text-gray-700 mb-4">
            Evercrest Lending shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or in connection with your use of our services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Governing Law</h2>
          <p className="text-gray-700 mb-4">
            These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of the Philippines. Any dispute arising out of or in connection with these Terms and Conditions shall be subject to the exclusive jurisdiction of the competent courts of Manila, Philippines, without regard to conflict of law principles.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Changes to Terms</h2>
          <p className="text-gray-700 mb-4">
            We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on our website. Your continued use of our services constitutes your acceptance of the modified terms.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Contact Information</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-900">Evercrest Lending Legal Team</p>
            <p className="text-gray-600">N Western St ,	San Juan</p>
            <p className="text-gray-600">Metro Manila 1502 Philippines</p>
            <p className="text-gray-600 mt-2">Email: legal@evercrestlending.com</p>
            <p className="text-gray-600">Phone: +63 931 870 2559</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
