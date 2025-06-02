import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Mail, Menu, X, ChevronDown, Linkedin, Youtube, PenTool, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import LoadingState from './components/LoadingState';
import ErrorBoundary from './components/ErrorBoundary';
import ChatWidget from './components/ChatWidget';

const ROICalculator = lazy(() => import('./components/ROICalculator'));
const TrustSignals = lazy(() => import('./components/TrustSignals'));

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleServiceClick = (service: string) => {
    setSelectedService(service);
    scrollToSection('contact');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') || 'Not provided';
    const email = formData.get('email') || 'Not provided';
    const company = formData.get('company') || 'Not provided';
    const phone = formData.get('phone') || 'Not provided';
    const message = formData.get('message') || 'Not provided';
    
    const subject = `New Project Inquiry from ${name}`;
    const body = `Hello Karthikeya,

I'm interested in your digital marketing and web development services.

Contact Details:
Name: ${name}
Email: ${email}
Company: ${company}
Phone: ${phone}

Project Details:
${message}

Best regards,
${name}`;
    
    window.location.href = `mailto:karthikeya.gsi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const Logo = () => (
    <a href="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
      Global Sustainable Initiative
    </a>
  );

  const services = [
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Custom website development with modern technologies, responsive design, and optimized performance. From landing pages to complex web applications with SEO-friendly architecture.'
    },
    {
      icon: '📱',
      title: 'Meta Ads (Facebook & Instagram)',
      description: 'Strategic advertising campaigns across Meta platforms. Targeted audience engagement, conversion optimization, and measurable ROI through Facebook and Instagram ads.'
    },
    {
      icon: '🎯',
      title: 'Google Ads & Analytics',
      description: 'Comprehensive Google Ads management and Google Analytics 4 implementation. Search, Display, and YouTube ad campaigns with detailed performance tracking and optimization.'
    },
    {
      icon: '🔍',
      title: 'Microsoft & LinkedIn Ads',
      description: 'Professional B2B advertising on LinkedIn and Microsoft Advertising Network. Targeted campaigns for business audiences and professional networks.'
    },
    {
      icon: '📌',
      title: 'Pinterest & X Ads',
      description: 'Visual-focused Pinterest advertising and strategic X (formerly Twitter) campaigns. Engage audiences through creative pins and targeted tweets.'
    },
    {
      icon: '📊',
      title: 'Business Presence & Analytics',
      description: 'Google My Business optimization, local SEO, and comprehensive analytics setup. Track and improve your digital presence with data-driven insights.'
    }
  ];

  return (
    <div className="font-sans text-gray-100">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/98 backdrop-blur-md' : 'bg-slate-900/95 backdrop-blur-md'} border-b border-slate-700/10`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Logo />
            
            <div className="hidden md:flex space-x-8">
              {['home', 'services', 'about', 'contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-gray-200 hover:text-emerald-400 font-medium transition-all duration-300 relative group"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  <span className="absolute bottom-[-5px] left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
            
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/98 backdrop-blur-md border-t border-slate-800/20 py-4">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              {['home', 'services', 'about', 'contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-gray-200 hover:text-emerald-400 py-2 font-medium transition-all duration-300"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(6,214,160,0.1),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(17,138,178,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 z-10 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Turn Your Marketing Green, Turn Your Profits Gold
              </h1>
              <div className="text-xl md:text-2xl text-slate-400 mb-8 font-light">
                Sustainable marketing strategies that grow your business while saving the planet
              </div>
              <p className="text-lg text-slate-300 mb-10 max-w-2xl leading-relaxed">
                Join the future of marketing with strategies that deliver exceptional ROI while minimizing environmental impact. Our proven approach combines cutting-edge digital solutions with sustainable practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-emerald-400 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 relative overflow-hidden group"
                >
                  Get Your Free Sustainability Audit
                </motion.button>
                <motion.a 
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:karthikeya.gsi@gmail.com" 
                  className="border-2 border-emerald-400 text-emerald-400 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-emerald-400 hover:text-white flex items-center justify-center gap-2"
                >
                  <Mail size={18} />
                  Contact Us
                </motion.a>
              </div>
            </motion.div>
            
            <div className="hidden md:block">
              <ErrorBoundary>
                <Suspense fallback={<LoadingState />}>
                  <ROICalculator />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <ErrorBoundary>
        <Suspense fallback={<LoadingState />}>
          <TrustSignals />
        </Suspense>
      </ErrorBoundary>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-transparent to-slate-900/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-lg text-slate-400 text-center mb-16 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to accelerate your business growth and establish a powerful online presence.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <button 
                key={index}
                onClick={() => handleServiceClick(service.title)}
                className="bg-white/3 backdrop-blur-xl border border-white/10 rounded-3xl p-12 transition-all duration-500 hover:translate-y-[-10px] hover:border-emerald-400/30 hover:shadow-2xl hover:shadow-emerald-400/10 group relative overflow-hidden text-left"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-blue-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl flex items-center justify-center text-4xl mb-6 relative z-10">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white relative z-10">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed relative z-10">{service.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-emerald-400/5 to-blue-500/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-slate-400 mb-12">
              Let's discuss your project and create a customized solution that drives sustainable growth for your business.
            </p>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-12">
              <h3 className="text-emerald-400 text-2xl font-semibold mb-4">Get In Touch Directly</h3>
              <div className="flex justify-center items-center gap-4 mb-4 flex-wrap">
                <Mail size={24} className="text-emerald-400" />
                <a 
                  href="mailto:karthikeya.gsi@gmail.com" 
                  className="text-white text-xl font-semibold hover:text-emerald-400 transition-colors duration-300"
                >
                  karthikeya.gsi@gmail.com
                </a>
              </div>
              <p className="text-slate-400 text-sm">Click to send us an email directly or use the form below</p>
            </div>
            
            <form 
              className="grid gap-6 max-w-2xl mx-auto"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  required
                  className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10 transition-all duration-300"
                />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email Address" 
                  required
                  className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10 transition-all duration-300"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  name="company" 
                  placeholder="Company Name"
                  className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10 transition-all duration-300"
                />
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="Phone Number"
                  className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10 transition-all duration-300"
                />
              </div>
              <textarea 
                name="message" 
                placeholder={selectedService ? `Tell us about your ${selectedService.toLowerCase()} project and requirements...` : "Tell us about your project and goals..."} 
                required
                rows={5}
                className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10 transition-all duration-300 resize-y"
              ></textarea>
              <button 
                type="submit"
                className="bg-gradient-to-r from-emerald-400 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg hover:shadow-emerald-500/20 justify-self-center"
              >
                Get Free Consultation
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-slate-900/20 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-48 h-48 rounded-full overflow-hidden mb-8 border-4 border-emerald-400/20 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src="/me.jpg" 
                  alt="Karthikeya Thallapally" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <motion.a
                href="https://www.linkedin.com/in/karthikeyagsi/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-6 py-3 mb-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-emerald-400 hover:bg-emerald-400/10 transition-all duration-300"
              >
                <Linkedin size={20} />
                Get to Know Me
              </motion.a>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-slate-300 mb-6"
              >
                Led by Karthikeya Thallapally, a forward-thinking sustainable entrepreneur and digital native, we are a next-generation agency committed to building brands that are not just successful—but truly sustainable.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-slate-400"
              >
                At the heart of our mission lies a belief that technology and sustainability are not opposing forces—they are the future of business. We combine impact-driven design with results-focused digital strategy to empower brands to grow responsibly and meaningfully in a rapidly evolving digital landscape.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-emerald-400/30">
                <h3 className="text-2xl font-semibold text-emerald-400 mb-4">Our Core Services</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    </div>
                    <div>
                      <span className="text-white font-semibold">Web Development</span>
                      <p className="text-slate-400">High-performance, fully responsive websites built for scalability and user experience</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    </div>
                    <div>
                      <span className="text-white font-semibold">Digital Marketing</span>
                      <p className="text-slate-400">Comprehensive digital marketing across Meta, Google, LinkedIn, X, Pinterest, and Microsoft platforms</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    </div>
                    <div>
                      <span className="text-white font-semibold">Analytics & Insights</span>
                      <p className="text-slate-400">Google Analytics 4, performance tracking, and data-driven optimization</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-emerald-400/30">
                <h3 className="text-2xl font-semibold text-emerald-400 mb-4">Follow Our Journey</h3>
                <div className="space-y-4">
                  <a 
                    href="https://medium.com/@KarthikeyaGSI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white hover:text-emerald-400 transition-colors duration-300"
                  >
                    <PenTool size={20} />
                    <span>Medium Articles</span>
                  </a>
                  <a 
                    href="https://substack.com/@karthikeyathallapally"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white hover:text-emerald-400 transition-colors duration-300"
                  >
                    <BookOpen size={20} />
                    <span>Substack Newsletter</span>
                  </a>
                  <a 
                    href="https://www.youtube.com/@karthikeyagsi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white hover:text-emerald-400 transition-colors duration-300"
                  >
                    <Youtube size={20} />
                    <span>YouTube Channel</span>
                  </a>
                  <a 
                    href="https://www.quora.com/profile/Karthikeya-Thallapally"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white hover:text-emerald-400 transition-colors duration-300"
                  >
                    <Mail size={20} />
                    <span>Quora Insights</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/90 backdrop-blur-xl border-t border-slate-700/10 pt-12 pb-4">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo and Navigation */}
            <div className="md:col-span-1">
              <Logo />
              <div className="flex flex-col gap-4 mt-6">
                {['Home', 'Services', 'About', 'Contact'].map((item, index) => (
                  <button 
                    key={index}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-left"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Support Section */}
            <div className="md:col-span-1">
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <div className="flex flex-col gap-4">
                <a 
                  href="mailto:customerrelations.gsi@gmail.com"
                  className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2"
                >
                  <Mail size={16} />
                  Contact Support
                </a>
                <button 
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-left"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => setIsTermsModalOpen(true)}
                  className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 text-left"
                >
                  Terms of Service
                </button>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="md:col-span-1">
              <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
              <a 
                href="https://www.linkedin.com/newsletters/global-sustainable-initiative-7325848775837577216"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2"
              >
                <PenTool size={16} />
                Awesome Newsletters
              </a>
            </div>

            {/* Our Work Section */}
            <div className="md:col-span-1">
              <h3 className="text-white font-semibold mb-4">Our Work</h3>
              <a 
                href="https://bestdealsindia.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform duration-300"></span>
                Best Deals India
              </a>
            </div>
          </div>

          <div className="text-slate-500 text-sm text-center border-t border-slate-800/50 pt-4">
            © 2025 Global Sustainable Initiative. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-white/10">
            <div className="sticky top-0 bg-gradient-to-r from-emerald-400 to-blue-500 p-6 rounded-t-2xl flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Privacy Policy</h2>
              <button 
                onClick={() => setIsPrivacyModalOpen(false)}
                className="text-white text-2xl hover:opacity-70 transition-opacity"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8 text-slate-300 leading-relaxed">
              <p className="font-semibold">Effective Date: May 27, 2025</p>
              
              <h3 className="text-emerald-400 text-xl font-semibold mt-8 mb-4">1. Information Collection</h3>
              <p>We collect information you provide directly to us through forms and communications.</p>
              
              <h3 className="text-emerald-400 text-xl font-semibold mt-8 mb-4">2. Use of Information</h3>
              <p>We use collected information to provide and improve our services, communicate with clients, and process payments.</p>
              
              <h3 className="text-emerald-400 text-xl font-semibold mt-8 mb-4">3. Contact Information</h3>
              <p>For privacy-related inquiries, please contact us at: <a href="mailto:cx.gsi.eco@gmail.com" className="text-emerald-400 hover:underline">cx.gsi.eco@gmail.com</a></p>
              
              <h3 className="text-emerald-400 text-xl font-semibold mt-8 mb-4">4. Service Delivery</h3>
              <p>Timeline and deliverables will be specified in individual project agreements. We strive to meet all deadlines but cannot guarantee specific results.</p>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {isTermsModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-white/10">
            <div className="sticky top-0 bg-gradient-to-r from-emerald-400 to-blue-500 p-6 rounded-t-2xl flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Terms of Service</h2>
              <button 
                onClick={() => setIsTermsModalOpen(false)}
                className="text-white text-2xl hover:opacity-70 transition-opacity"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8 text-slate-300 leading-relaxed">
              <p className="font-semibold">Effective Date: May 27, 2025</p>
              
              <h3 className="text-emerald-400 text-xl font-semibold mt-8 mb-4">1. Service Agreement</h3>
              <p>By engaging our services, you agree to these terms and any project-specific agreements.</p>
              
              <h3 className="text-emerald-400 text-xl font-semibold mt-8 mb-4">2. Payment Terms</h3>
              <p>Payment schedules will be outlined in project proposals. We require a deposit before beginning work.</p>
              
              <h3 className="text-emerald-400 text-xl font-semibold mt-8 mb-4">3. No Refund Policy</h3>
              <p>All sales are final. We do not offer refunds for completed work or work in progress.</p>
              
              <h3 className="text-emerald-400 text-xl font-semibold mt-8 mb-4">4. Project Timelines</h3>
              <p>While we strive to meet all deadlines, exact completion times may vary based on project complexity and client responsiveness.</p>
              
              <h3 className="text-emerald-400 text-xl font-semibold mt-8 mb-4">5. Intellectual Property</h3>
              <p>Rights transfer upon final payment. We retain rights to display work in our portfolio.</p>
            </div>
          </div>
        </div>
      )}

      {/* About Us Modal */}
      {isAboutModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-white/10">
            <div className="sticky top-0 bg-gradient-to-r from-emerald-400 to-blue-500 p-6 rounded-t-2xl flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">About Us</h2>
              <button 
                onClick={() => setIsAboutModalOpen(false)}
                className="text-white text-2xl hover:opacity-70 transition-opacity"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8 text-slate-300 leading-relaxed">
              <h3 className="text-emerald-400 text-xl font-semibold mb-6">Our Vision</h3>
              <p className="mb-6">
                Led by Karthikeya Thallapally, a forward-thinking sustainable entrepreneur and digital native, we are a next-generation agency committed to building brands that are not just successful—but truly sustainable.
              </p>
              
              <h3 className="text-emerald-400 text-xl font-semibold mb-6">Our Mission</h3>
              <p className="mb-6">
                At the heart of our mission lies a belief that technology and sustainability are not opposing forces—they are the future of business. We combine impact-driven design with results-focused digital strategy to empower brands to grow responsibly and meaningfully in a rapidly evolving digital landscape.
              </p>
              
              <h3 className="text-emerald-400 text-xl font-semibold mb-6">Our Expertise</h3>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  </div>
                  <div>
                    <span className="text-white font-semibold">Digital Marketing Excellence</span>
                    <p className="text-slate-400">Strategic campaigns across Meta, Google, X, LinkedIn, and Pinterest with proven ROI</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  </div>
                  <div>
                    <span className="text-white font-semibold">Web Development</span>
                    <p className="text-slate-400">High-performance, responsive websites built for modern businesses</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  </div>
                  <div>
                    <span className="text-white font-semibold">Sustainable Solutions</span>
                    <p className="text-slate-400">Eco-friendly digital strategies that minimize environmental impact</p>
                  </div>
                </li>
              </ul>
              
              <div className="text-center mt-8">
                <p className="text-lg text-emerald-400 font-semibold">
                  Let's shape a future where your brand thrives—digitally and sustainably. 🌍🚀
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-right" />
      <ChatWidget />
    </div>
  );
}

export default App;