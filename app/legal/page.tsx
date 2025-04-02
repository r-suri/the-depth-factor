"use client";

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function Legal() {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');
  
  return (
    <div className="min-h-screen bg-[var(--color-jet)]">
      <Header />
      
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-10 text-center font-heading text-[var(--color-floral-white)]">
            Legal Information
          </h1>
          
          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="bg-[#363636] rounded-full p-1 flex">
              <button
                onClick={() => setActiveTab('privacy')}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeTab === 'privacy'
                    ? 'bg-[var(--color-cinnabar)] text-white font-medium'
                    : 'hover:bg-gray-700 text-[var(--color-floral-white)]/70'
                }`}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setActiveTab('terms')}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeTab === 'terms'
                    ? 'bg-[var(--color-verdigris)] text-white font-medium'
                    : 'hover:bg-gray-700 text-[var(--color-floral-white)]/70'
                }`}
              >
                Terms of Service
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="bg-[#363636] p-8 rounded-lg shadow-md">
            {activeTab === 'privacy' ? (
              <div className="prose prose-lg prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-6 font-heading">Privacy Policy</h2>
                <p className="mb-4">
                  <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 font-heading">1. Introduction</h3>
                <p>
                  Welcome to The Depth Factor ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 font-heading">2. Information We Collect</h3>
                <p>
                  We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                </p>
                <ul className="list-disc pl-5 mt-2 mb-4">
                  <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                  <li><strong>Contact Data</strong> includes email address.</li>
                  <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                  <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 font-heading">3. How We Use Your Information</h3>
                <p>
                  We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-5 mt-2 mb-4">
                  <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                  <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                  <li>Where we need to comply with a legal obligation.</li>
                  <li>With your consent.</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 font-heading">4. Data Security</h3>
                <p>
                  We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 font-heading">5. Data Retention</h3>
                <p>
                  We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements.
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 font-heading">6. Your Legal Rights</h3>
                <p>
                  Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
                </p>
                <ul className="list-disc pl-5 mt-2 mb-4">
                  <li>Request access to your personal data.</li>
                  <li>Request correction of your personal data.</li>
                  <li>Request erasure of your personal data.</li>
                  <li>Object to processing of your personal data.</li>
                  <li>Request restriction of processing your personal data.</li>
                  <li>Request transfer of your personal data.</li>
                  <li>Right to withdraw consent.</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 font-heading">7. Third-Party Links</h3>
                <p>
                  This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 font-heading">8. Changes to the Privacy Policy</h3>
                <p>
                  We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 font-heading">9. Contact Us</h3>
                <p>
                  If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:info@thedepthfactor.com" className="text-[var(--color-cinnabar)]">info@thedepthfactor.com</a>
                </p>
              </div>
            ) : (
              <div className="prose prose-lg prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-6 font-heading">Terms of Service</h2>
                <p className="mb-4">
                  <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 font-heading">1. Introduction</h3>
                <p>
                  Welcome to The Depth Factor. These terms and conditions govern your use of our website and services. By accessing or using our website, you agree to be bound by these terms.
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 font-heading">2. Definitions</h3>
                <p>
                  "Website" refers to The Depth Factor, accessible from thedepthfactor.com.
                </p>
                <p>
                  "Service" refers to the website and any other related services provided by The Depth Factor.
                </p>
                <p>
                  "You" refers to the individual accessing or using the service, or the company, or other legal entity on behalf of which such individual is accessing or using the service.
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 font-heading">3. Content</h3>
                <p>
                  Our Service allows you to access content provided by Dr. Raghav Suri and The Depth Factor. The content on our website is for informational and educational purposes only.
                </p>
                <p>
                  All content found on the website is the property of The Depth Factor or used with permission. This content is protected by copyright, trademark, and other intellectual property laws.
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 font-heading">4. Use License</h3>
                <p>
                  Permission is granted to temporarily view the materials on The Depth Factor's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-5 mt-2 mb-4">
                  <li>Modify or copy the materials;</li>
                  <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                  <li>Attempt to decompile or reverse engineer any software contained on The Depth Factor's website;</li>
                  <li>Remove any copyright or other proprietary notations from the materials; or</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 font-heading">5. Disclaimer</h3>
                <p>
                  The information provided on this website is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
                </p>
                <p>
                  The content provided by The Depth Factor is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 font-heading">6. Limitations</h3>
                <p>
                  In no event shall The Depth Factor or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on The Depth Factor's website, even if The Depth Factor or a The Depth Factor authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 font-heading">7. Revisions and Errata</h3>
                <p>
                  The materials appearing on The Depth Factor's website could include technical, typographical, or photographic errors. The Depth Factor does not warrant that any of the materials on its website are accurate, complete, or current. The Depth Factor may make changes to the materials contained on its website at any time without notice.
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 font-heading">8. Modifications</h3>
                <p>
                  The Depth Factor may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 font-heading">9. Governing Law</h3>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                </p>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 font-heading">10. Contact Us</h3>
                <p>
                  If you have any questions about these Terms of Service, please contact us at: <a href="mailto:info@thedepthfactor.com" className="text-[var(--color-verdigris)]">info@thedepthfactor.com</a>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
} 