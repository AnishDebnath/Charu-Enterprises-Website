
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ACHIEVEMENTS, PRODUCTS, MARKETS, TESTIMONIALS, AWARDS, BLOG_POSTS } from './constants';
import { askProductConsultant } from './services/geminiService';
import { Product } from './types';

type Page = 'home' | 'products' | 'about' | 'exports' | 'certifications' | 'awards' | 'news' | 'contact';

// --- Animated Counter Component ---
const CountUp: React.FC<{ stat: string }> = ({ stat }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  const { targetNum, suffix, hasNumber } = useMemo(() => {
    const numMatch = stat.match(/(\d+)/);
    if (!numMatch) {
      return { targetNum: 0, suffix: stat, hasNumber: false };
    }
    const num = parseInt(numMatch[0], 10);
    const suff = stat.replace(num.toString(), '');
    return { targetNum: num, suffix: suff, hasNumber: true };
  }, [stat]);

  useEffect(() => {
    if (!hasNumber) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [hasNumber]);

  useEffect(() => {
    if (!isVisible || targetNum === 0 || !hasNumber) return;
    let startTime: number | null = null;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * targetNum));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [isVisible, targetNum, hasNumber]);

  if (!hasNumber) return <span>{stat}</span>;
  return <span ref={elementRef}>{count}{suffix}</span>;
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isConsulting, setIsConsulting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [comparedProductIds, setComparedProductIds] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      document.body.style.overflow = 'unset';
    }
  }, [currentPage]);

  const toggleMobileMenu = () => {
    const nextState = !isMobileMenuOpen;
    setIsMobileMenuOpen(nextState);
    document.body.style.overflow = nextState ? 'hidden' : 'unset';
  };

  const handleConsultantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsConsulting(true);
    const response = await askProductConsultant(query);
    setAiResponse(response);
    setIsConsulting(false);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Inquiry sent successfully! Our export team will get back to you shortly.");
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Callback request received! Our expert will call you during your preferred time.");
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'unset';
  };

  const toggleProductComparison = (productId: string) => {
    setComparedProductIds(prev => {
      if (prev.includes(productId)) return prev.filter(id => id !== productId);
      if (prev.length >= 4) {
        alert("You can compare up to 4 products at a time.");
        return prev;
      }
      return [...prev, productId];
    });
  };

  const categories = useMemo(() => {
    const cats = PRODUCTS.map(p => p.category);
    return ['All', ...Array.from(new Set(cats))];
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(productSearch.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [productSearch, selectedCategory]);

  const PageHeader = ({ title, subtitle, children }: { title: string; subtitle: string; children?: React.ReactNode }) => (
    <div className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-[#0b1120] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Industrial header" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0b1120]"></div>
      <div className="container mx-auto px-4 relative z-10 text-white flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-3 sm:mb-4 uppercase tracking-tight text-white leading-tight">{title}</h1>
          <p className="text-lg sm:text-xl text-slate-400">{subtitle}</p>
        </div>
        <div className="flex-shrink-0 w-full md:w-auto">
          {children}
        </div>
      </div>
    </div>
  );

  const Home = () => (
    <>
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0b1120]">
        <div className="absolute inset-0 z-0 scale-105 animate-pulse-slow">
          <img
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1920"
            alt="Industrial Background"
            className="w-full h-full object-cover filter brightness-[0.2]"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-white py-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 sm:w-12 h-[2px] bg-orange-500"></span>
              <h4 className="text-orange-400 font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm">Global B2B Manufacturing Leader</h4>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 sm:mb-8 leading-[1.1] tracking-tighter">Forging the Future of <br className="hidden sm:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Fencing Solutions</span></h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-10 sm:mb-12 text-slate-400 leading-relaxed max-w-2xl">Specialized in high-precision pressed steel and malleable fittings. Delivering reliability to the world's most demanding security projects for over 50 years.</p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button onClick={() => setCurrentPage('products')} className="bg-orange-500 hover:bg-orange-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-3 transition-all shadow-2xl shadow-orange-500/20">Explore Full Catalog <i className="fas fa-arrow-right"></i></button>
              <button onClick={() => setCurrentPage('about')} className="bg-white/5 backdrop-blur-xl border border-white/20 hover:bg-white/10 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg transition-all">Our Legacy & Impact</button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust & Compliance Ribbon */}
      <section className="py-8 bg-[#0b1120] border-y border-white/5 backdrop-blur-sm relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-6 sm:gap-10">
            <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
              <i className="fas fa-check-circle text-lg text-orange-500"></i>
              <span className="font-black text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white whitespace-nowrap">ISO 9001:2015</span>
            </div>
            <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
              <i className="fas fa-certificate text-lg text-orange-500"></i>
              <span className="font-black text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white whitespace-nowrap">ASTM F626 COMPLIANT</span>
            </div>
            <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
              <i className="fas fa-medal text-lg text-orange-500"></i>
              <span className="font-black text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white whitespace-nowrap">EEPC STAR PERFORMER</span>
            </div>
            <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
              <i className="fas fa-shield-alt text-lg text-orange-500"></i>
              <span className="font-black text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white whitespace-nowrap">GOVT. RECOGNIZED HOUSE</span>
            </div>
            <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
              <i className="fas fa-bolt text-lg text-orange-500"></i>
              <span className="font-black text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white whitespace-nowrap">ZINC COATING EXCELLENCE</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <section className="py-16 sm:py-24 bg-[#0b1120] relative border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
            {ACHIEVEMENTS.map((item) => (
              <div key={item.id} className="bg-[#111827] p-10 sm:p-12 rounded-[2.5rem] shadow-2xl border border-white/5 flex flex-col items-center text-center group hover:border-orange-500/50 transition-all duration-500">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 flex items-center justify-center text-orange-500 text-2xl sm:text-3xl mb-8 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-xl shadow-black/50">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3 className="text-4xl sm:text-6xl font-black text-white mb-2 tracking-tighter">
                  <CountUp stat={item.stat} />
                </h3>
                <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Products Showcase - Showing 12 products now */}
      <section className="py-24 bg-[#0b1120]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
            <div className="max-w-3xl">
              <h4 className="text-orange-500 font-bold uppercase tracking-[0.2em] mb-4 text-xs sm:text-sm">Industrial Showcase</h4>
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">Precision Engineered <br /><span className="text-orange-500">Components</span></h2>
            </div>
            <button onClick={() => setCurrentPage('products')} className="group bg-transparent border border-orange-500 text-orange-500 px-10 py-4 rounded-xl font-black hover:bg-orange-500/10 transition-all flex items-center gap-3 w-full sm:w-auto justify-center uppercase tracking-widest text-[10px] shadow-[0_0_15px_rgba(249,115,22,0.1)] hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              Full Catalog <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>

          <div className="p-8 sm:p-12 border border-blue-500/20 rounded-[3rem] bg-navy-light/20 shadow-2xl backdrop-blur-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {PRODUCTS.slice(0, 12).map((product) => (
                <div key={product.id} className="bg-[#111827] rounded-[2.5rem] overflow-hidden group cursor-pointer border border-white/5 hover:border-orange-500/50 transition-all flex flex-col h-full shadow-2xl relative" onClick={() => openProductModal(product)}>
                  <div className="h-64 overflow-hidden relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover brightness-[0.75] group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-6 left-6 bg-orange-500/90 text-white text-[8px] font-black px-4 py-2 rounded-full uppercase tracking-widest backdrop-blur-sm shadow-lg">{product.category}</div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-black text-white mb-4 leading-tight">{product.name}</h3>
                    <p className="text-slate-400 mb-10 text-sm leading-relaxed line-clamp-3 flex-grow font-medium opacity-80">{product.description}</p>
                    <div className="flex items-center gap-2 text-orange-500 font-black text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all">
                      View Specs <i className="fas fa-chevron-right text-[8px]"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Global Footprint Section */}
      <section className="py-24 bg-[#080d1a] relative overflow-hidden border-y border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_with_blue_sea.svg" alt="World Map" className="w-full h-full object-contain filter invert" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 sm:gap-24">
            <div className="w-full lg:w-1/2">
              <h4 className="text-orange-500 font-bold uppercase tracking-widest mb-4 text-sm">Global Footprint</h4>
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-8 leading-tight tracking-tight">Serving Strategic <br /><span className="text-orange-500">Global Markets</span></h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">From the massive security perimeters in the Middle East to residential chain-link systems in the USA, our components are the silent backbone of safety worldwide.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-2xl font-black text-white mb-2">USA / Canada</h3>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">100+ Distribution Centers</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-2xl font-black text-white mb-2">Middle East</h3>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Key Infra Projects</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-2xl font-black text-white mb-2">Europe</h3>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">High-Precision OEM</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-2xl font-black text-white mb-2">Africa</h3>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Strategic Partners</p>
                </div>
              </div>

              <button onClick={() => setCurrentPage('exports')} className="mt-14 bg-white/5 border border-white/10 hover:bg-orange-500 hover:text-white text-white font-black px-10 py-5 rounded-2xl transition-all flex items-center justify-center gap-3 group w-full sm:w-auto uppercase tracking-widest text-sm shadow-2xl">
                Global Logistics Expertise <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-10 bg-orange-500/10 blur-[120px] rounded-full"></div>
                <img
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200"
                  alt="Global Recognition"
                  className="rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] relative z-10 border border-white/5"
                />
                <div className="absolute bottom-10 -left-10 bg-[#111827] p-10 rounded-[2.5rem] border border-white/10 shadow-2xl z-20 animate-float-subtle hidden sm:block">
                  <p className="text-orange-500 text-5xl font-black mb-1">15+</p>
                  <p className="text-white font-black uppercase tracking-widest text-[10px]">Countries Exported To</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Industry Insights Preview */}
      <section className="py-24 bg-[#0b1120]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-orange-500 font-bold uppercase tracking-widest mb-4 text-sm">Industrial Intelligence</h4>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter leading-tight">Latest from the <span className="text-orange-500">Factory Floor</span></h2>
            </div>
            <button onClick={() => setCurrentPage('news')} className="bg-[#111827] text-white hover:text-orange-500 font-black px-8 py-4 rounded-xl border border-white/5 transition-all flex items-center gap-3 uppercase text-xs tracking-[0.2em] shadow-xl">
              View All Insights <i className="fas fa-external-link-alt text-xs"></i>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {BLOG_POSTS.map(post => (
              <div key={post.id} className="bg-[#111827] rounded-[2.5rem] overflow-hidden border border-white/5 group cursor-pointer shadow-2xl" onClick={() => setCurrentPage('news')}>
                <div className="h-64 overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />
                  <div className="absolute top-6 left-6"><span className="bg-orange-500 text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">{post.category}</span></div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-black text-white mb-6 group-hover:text-orange-500 transition-colors leading-tight">{post.title}</h3>
                  <div className="flex items-center justify-between text-slate-500 text-[10px] font-black uppercase tracking-widest mb-8 border-b border-white/5 pb-4">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-10 line-clamp-2">{post.excerpt}</p>
                  <div className="text-orange-500 font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                    Read Technical Post <i className="fas fa-arrow-right text-[10px]"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Trust Signal: Factory Audit */}
      <section className="py-24 bg-[#080d1a] border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-[3rem] sm:rounded-[5rem] p-12 sm:p-24 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(249,115,22,0.3)]">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
              <i className="fas fa-industry text-[30rem] -rotate-12 translate-x-24 translate-y-24 text-white"></i>
            </div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-widest mb-8 border border-white/10">
                  <i className="fas fa-shield-check"></i> Quality Assurance 100%
                </div>
                <h2 className="text-4xl sm:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter">Ready to Audit <br className="hidden sm:block" />Our Standards?</h2>
                <p className="text-white/90 text-lg sm:text-xl mb-12 font-medium leading-relaxed">We welcome factory visits from global procurement teams. Experience our in-house hot-dip galvanizing and high-precision pressing processes firsthand.</p>
                <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                  <button onClick={() => setCurrentPage('contact')} className="bg-white text-orange-700 font-black px-10 py-5 rounded-2xl shadow-2xl hover:bg-slate-50 transition-all uppercase tracking-widest text-sm">Schedule Visit</button>
                  <button onClick={() => setCurrentPage('certifications')} className="bg-transparent border-2 border-white/30 text-white font-black px-10 py-5 rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-sm backdrop-blur-sm">View Manual</button>
                </div>
              </div>
              <div className="flex flex-col items-center gap-6">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center text-white text-4xl shadow-[inset_0_2px_10px_rgba(255,255,255,0.2)] border border-white/20 group cursor-pointer hover:scale-110 transition-transform">
                  <i className="fas fa-download animate-bounce"></i>
                </div>
                <div className="text-center">
                  <p className="text-white font-black uppercase tracking-[0.2em] text-xs mb-1">Catalog 2024</p>
                  <p className="text-white/60 font-bold uppercase tracking-widest text-[9px]">PDF • 12.4 MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Testimonials Section */}
      <section className="py-24 bg-[#080d1a] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 sm:mb-24">
            <h4 className="text-orange-500 font-bold uppercase tracking-widest mb-4 text-sm">Voice of Reliability</h4>
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tighter">Trusted by <span className="text-orange-500">Global Partners</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">Hear from procurement experts who have scaled their supply chain with Charu components.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="bg-[#111827] p-10 sm:p-12 rounded-[3rem] shadow-2xl border border-white/5 flex flex-col relative group hover:border-orange-500/50 transition-all duration-500">
                <div className="flex gap-1.5 text-orange-500 mb-8">
                  <i className="fas fa-star text-xs"></i><i className="fas fa-star text-xs"></i><i className="fas fa-star text-xs"></i><i className="fas fa-star text-xs"></i><i className="fas fa-star text-xs"></i>
                </div>
                <div className="flex-grow">
                  <p className="text-slate-200 text-lg leading-relaxed mb-10 italic font-medium">"{testimonial.content}"</p>
                </div>
                <div className="mt-auto flex items-center gap-5 border-t border-white/10 pt-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-500/20 blur-md rounded-full"></div>
                    <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover border-2 border-orange-500/30 relative z-10" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-lg tracking-tight leading-tight">{testimonial.name}</h4>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">{testimonial.role} • {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const ProductsPage = () => (
    <div className="bg-[#0b1120] min-h-screen">
      <PageHeader title="Technical Catalog" subtitle="Industrial-grade fencing fittings and custom cast components with global compliance." />
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4">

          {/* Comparison Bar */}
          {comparedProductIds.length > 0 && (
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-orange-600/95 backdrop-blur-md text-white px-10 py-5 rounded-[2rem] flex items-center gap-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 animate-in slide-in-from-bottom-10 duration-500">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-black">{comparedProductIds.length}</div>
                <span className="font-black uppercase tracking-widest text-xs">Items Ready to Compare</span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowComparison(true)} className="bg-white text-orange-600 px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">Launch Comparison</button>
                <button onClick={() => setComparedProductIds([])} className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all flex items-center justify-center"><i className="fas fa-times"></i></button>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-6 mb-16 items-center">
            <div className="relative flex-grow w-full group">
              <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors"></i>
              <input type="text" placeholder="Search by name, standard (ASTM), or material..." className="w-full bg-[#111827] border border-white/10 rounded-2xl py-5 pl-16 pr-8 text-white focus:border-orange-500 outline-none transition-all shadow-2xl font-medium" value={productSearch} onChange={(e) => setProductSearch(e.target.value)} />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar w-full md:w-auto">
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border shadow-lg ${selectedCategory === cat ? 'bg-orange-500 border-orange-500 text-white shadow-orange-500/20' : 'bg-[#111827] border-white/10 text-slate-400 hover:text-white hover:border-white/30'}`}>{cat}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-[#111827] rounded-[3rem] overflow-hidden group border border-white/5 hover:border-orange-500/50 transition-all duration-500 flex flex-col h-full shadow-2xl relative">

                {/* Technical Tooltip */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 group-hover:-top-2 transition-all duration-300 pointer-events-none z-[60] flex flex-col items-center">
                  <div className="bg-[#1e293b] border border-orange-500/30 text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3 whitespace-nowrap">
                    <span className="text-orange-500 uppercase tracking-[0.1em]">{product.category}</span>
                    <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                    <span className="uppercase tracking-[0.1em]">{product.materials?.[0] || 'Pressed Steel'}</span>
                  </div>
                  <div className="w-3 h-3 bg-[#1e293b] border-r border-b border-orange-500/30 rotate-45 -mt-1.5"></div>
                </div>

                <div className="absolute top-8 left-8 z-10 flex flex-col gap-2">
                  {product.isBestseller && <span className="bg-orange-500 text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl backdrop-blur-sm">Bestseller</span>}
                  {product.isNew && <span className="bg-blue-600 text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl backdrop-blur-sm">New</span>}
                </div>

                <div className="h-80 overflow-hidden relative group/img">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-90 group-hover:brightness-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-60"></div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <button
                      onClick={(e) => { e.stopPropagation(); openProductModal(product); }}
                      className="bg-white text-orange-600 font-black px-8 py-4 rounded-2xl shadow-2xl pointer-events-auto transform translate-y-6 group-hover/img:translate-y-0 transition-transform duration-500 flex items-center gap-3 uppercase text-xs tracking-[0.2em]"
                    >
                      <i className="fas fa-eye text-sm"></i> Quick View
                    </button>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); toggleProductComparison(product.id); }}
                    className={`absolute bottom-8 right-8 w-14 h-14 rounded-[1.2rem] flex items-center justify-center backdrop-blur-md transition-all shadow-2xl ${comparedProductIds.includes(product.id) ? 'bg-orange-500 text-white scale-110' : 'bg-white/10 text-white hover:bg-orange-500 hover:scale-110'}`}
                    title="Compare Product"
                  >
                    <i className="fas fa-exchange-alt"></i>
                  </button>
                </div>

                <div className="p-10 sm:p-12 flex flex-col flex-grow">
                  <h3 className="text-3xl font-black text-white group-hover:text-orange-500 transition-colors leading-tight mb-6">{product.name}</h3>

                  <div className="flex flex-wrap gap-2.5 mb-8">
                    {product.materials?.slice(0, 2).map((mat, i) => (
                      <span key={i} className="text-[9px] font-black uppercase tracking-widest px-4 py-2 bg-white/5 text-slate-500 border border-white/5 rounded-xl">{mat}</span>
                    ))}
                    {product.standards?.slice(0, 1).map((std, i) => (
                      <span key={i} className="text-[9px] font-black uppercase tracking-widest px-4 py-2 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-xl">{std}</span>
                    ))}
                  </div>

                  <p className="text-slate-400 text-base leading-relaxed mb-10 flex-grow line-clamp-3 font-medium">{product.description}</p>

                  <div className="pt-10 border-t border-white/5 mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-1">Standard Option</span>
                      <span className="text-xs text-white font-black">{product.materials?.[0]}</span>
                    </div>
                    <button
                      onClick={() => openProductModal(product)}
                      className="text-orange-500 font-black text-xs uppercase tracking-[0.2em] hover:text-orange-400 flex items-center gap-3 group/btn"
                    >
                      Specifications <i className="fas fa-arrow-right text-[10px] group-hover/btn:translate-x-2 transition-transform"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-32 text-center">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-10 text-slate-800 text-4xl"><i className="fas fa-search"></i></div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">No Matching Components</h3>
              <p className="text-slate-500 max-w-md mx-auto leading-relaxed">Try adjusting your filters or contact our technical sales team for a custom solution.</p>
              <button onClick={() => { setProductSearch(''); setSelectedCategory('All'); }} className="mt-12 text-orange-500 font-black uppercase tracking-widest text-xs border-b-2 border-orange-500/20 pb-2 hover:border-orange-500 transition-all">Clear All Filters</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );

  const AboutPage = () => (
    <div className="bg-[#0b1120] min-h-screen">
      <PageHeader title="Our Legacy" subtitle="Manufacturing excellence in heavy fabrication and galvanizing since 1969." />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-1 bg-orange-500"></span>
                <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs">Heritage & Reliability</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-white mb-10 leading-[1.1] tracking-tighter">Over <span className="text-orange-500">50 Years</span> of Industrial Leadership</h2>
              <div className="space-y-8 text-slate-400 text-lg leading-relaxed font-medium">
                <p>Charu Enterprises was founded with a singular vision: to bring world-class precision to the fencing and engineering infrastructure market. Over five decades, we have evolved from a local workshop to a premier global exporter.</p>
                <p>Our facility in Howrah, West Bengal, is the nerve center of our operations, housing state-of-the-art die-casting, pressing, and an in-house hot-dip galvanizing plant. This end-to-end integration ensures that every component leaving our floor meets the highest thresholds of quality and durability.</p>
              </div>
              <div className="grid grid-cols-2 gap-10 mt-16 border-t border-white/5 pt-16">
                <div><p className="text-orange-500 text-4xl font-black mb-2">100%</p><p className="text-white font-black uppercase tracking-widest text-[10px]">Quality Audit</p></div>
                <div><p className="text-orange-500 text-4xl font-black mb-2">24h</p><p className="text-white font-black uppercase tracking-widest text-[10px]">Response Time</p></div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-10 bg-orange-500/10 blur-[150px] rounded-full group-hover:bg-orange-500/20 transition-all duration-700"></div>
              <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200" alt="Factory Interior" className="rounded-[4rem] shadow-2xl w-full relative z-10 border border-white/10" />
              <div className="absolute -bottom-12 -left-12 bg-orange-500 p-12 rounded-[3rem] text-white shadow-2xl text-center z-20 group-hover:scale-105 transition-transform"><p className="text-5xl font-black mb-1">1969</p><p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Foundation Year</p></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const ExportsPage = () => (
    <div className="bg-[#0b1120] min-h-screen">
      <PageHeader title="Global Logistics" subtitle="Seamless B2B supply of industrial components to North America, Europe, and the Middle East." />

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl sm:text-6xl font-black text-white mb-8 leading-tight tracking-tighter">Optimized for <span className="text-orange-500">Global Trade</span></h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-12 font-medium">With our strategic location near Kolkata & Haldia ports, we ensure minimum turnaround time from manufacturing to port-side loading. Our export team specializes in handling complex logistics for volume containers.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-8 bg-[#111827] border border-white/5 rounded-3xl flex items-start gap-6 hover:border-orange-500/30 transition-all shadow-xl">
                  <i className="fas fa-ship text-orange-500 text-3xl mt-1"></i>
                  <div><h4 className="text-white font-black text-lg mb-2">Port Proximity</h4><p className="text-slate-500 text-sm font-medium">Minutes from major shipping hubs for rapid dispatch.</p></div>
                </div>
                <div className="p-8 bg-[#111827] border border-white/5 rounded-3xl flex items-start gap-6 hover:border-orange-500/30 transition-all shadow-xl">
                  <i className="fas fa-file-invoice-dollar text-orange-500 text-3xl mt-1"></i>
                  <div><h4 className="text-white font-black text-lg mb-2">Trade Finance</h4><p className="text-slate-500 text-sm font-medium">Flexible L/C, TT and CAD payment terms supported.</p></div>
                </div>
                <div className="p-8 bg-[#111827] border border-white/5 rounded-3xl flex items-start gap-6 hover:border-orange-500/30 transition-all shadow-xl">
                  <i className="fas fa-box-open text-orange-500 text-3xl mt-1"></i>
                  <div><h4 className="text-white font-black text-lg mb-2">Custom Pack</h4><p className="text-slate-500 text-sm font-medium">Standard & heavy-duty ocean-worthy crating.</p></div>
                </div>
                <div className="p-8 bg-[#111827] border border-white/5 rounded-3xl flex items-start gap-6 hover:border-orange-500/30 transition-all shadow-xl">
                  <i className="fas fa-shield-check text-orange-500 text-3xl mt-1"></i>
                  <div><h4 className="text-white font-black text-lg mb-2">Third Party QC</h4><p className="text-slate-500 text-sm font-medium">SGS, Intertek, TUV inspections welcomed.</p></div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-[#111827] rounded-[4rem] p-4 border border-white/5 shadow-2xl relative overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80&w=1200" alt="Global Shipping" className="rounded-[3.5rem] w-full brightness-50 group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent"></div>
                <div className="absolute bottom-16 left-16"><p className="text-orange-500 font-black text-7xl sm:text-8xl tracking-tighter">150M+</p><p className="text-white font-black uppercase tracking-[0.3em] text-xs">Components Exported</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#080d1a] border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h4 className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs mb-6">Regional Expertise</h4>
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter">Adhering to <span className="text-orange-500">Global Standards</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-[#111827] p-12 rounded-[3.5rem] border border-white/5 group hover:border-orange-500/50 transition-all shadow-2xl">
              <div className="text-orange-500 text-5xl mb-10 group-hover:scale-110 transition-transform"><i className="fas fa-flag-usa"></i></div>
              <h3 className="text-3xl font-black text-white mb-6">USA / Canada</h3>
              <p className="text-slate-400 mb-8 font-medium leading-relaxed">Full compliance with ASTM F626 (Standard Specification for Fence Fittings) and ASTM F1664. Specialized in North American chain link systems.</p>
              <ul className="space-y-4 text-[10px] text-slate-500 font-black uppercase tracking-widest">
                <li className="flex items-center gap-3"><i className="fas fa-check text-orange-500"></i> 14GA & 16GA Gauges</li>
                <li className="flex items-center gap-3"><i className="fas fa-check text-orange-500"></i> ASTM A153 Galvanized</li>
              </ul>
            </div>
            <div className="bg-[#111827] p-12 rounded-[3.5rem] border border-white/5 group hover:border-orange-500/50 transition-all shadow-2xl">
              <div className="text-orange-500 text-5xl mb-10 group-hover:scale-110 transition-transform"><i className="fas fa-euro-sign"></i></div>
              <h3 className="text-3xl font-black text-white mb-6">Europe</h3>
              <p className="text-slate-400 mb-8 font-medium leading-relaxed">Meeting DIN and ISO 1461 requirements for corrosion protection. Designed for high-security perimeter systems and European urban fencing.</p>
              <ul className="space-y-4 text-[10px] text-slate-500 font-black uppercase tracking-widest">
                <li className="flex items-center gap-3"><i className="fas fa-check text-orange-500"></i> RAL Powder Coating</li>
                <li className="flex items-center gap-3"><i className="fas fa-check text-orange-500"></i> Precision Die-Casting</li>
              </ul>
            </div>
            <div className="bg-[#111827] p-12 rounded-[3.5rem] border border-white/5 group hover:border-orange-500/50 transition-all shadow-2xl">
              <div className="text-orange-500 text-5xl mb-10 group-hover:scale-110 transition-transform"><i className="fas fa-mosque"></i></div>
              <h3 className="text-3xl font-black text-white mb-6">Middle East</h3>
              <p className="text-slate-400 mb-8 font-medium leading-relaxed">Heavy-duty malleable iron and steel fittings engineered for extreme arid environments and high-heat durability in infrastructure projects.</p>
              <ul className="space-y-4 text-[10px] text-slate-500 font-black uppercase tracking-widest">
                <li className="flex items-center gap-3"><i className="fas fa-check text-orange-500"></i> Heat Resistant Finish</li>
                <li className="flex items-center gap-3"><i className="fas fa-check text-orange-500"></i> Volume Project Capacity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-[4rem] p-12 sm:p-24 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-16 opacity-10 pointer-events-none"><i className="fas fa-globe-americas text-[25rem]"></i></div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl sm:text-7xl font-black text-white mb-10 leading-tight tracking-tighter">Secure Your Global <br />Wholesale Price List</h2>
              <p className="text-white/90 text-lg sm:text-2xl mb-16 leading-relaxed font-medium">Looking for volume pricing for North American or European distributions? Request our comprehensive 2024 export catalog today.</p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <button onClick={() => setCurrentPage('contact')} className="bg-white text-orange-700 font-black px-12 py-6 rounded-2xl text-lg shadow-2xl hover:bg-slate-50 transition-all uppercase tracking-[0.2em]">Request RFQ</button>
                <button onClick={() => setCurrentPage('products')} className="bg-transparent border-2 border-white text-white font-black px-12 py-6 rounded-2xl text-lg hover:bg-white/10 transition-all uppercase tracking-[0.2em]">View Catalog</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const CertificationsPage = () => (
    <div className="bg-[#0b1120] min-h-screen">
      <PageHeader title="Quality Compliance" subtitle="Certifying safety, durability, and engineering excellence across borders." />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-[#111827] p-12 rounded-[3.5rem] border border-white/5 shadow-2xl"><div className="text-orange-500 text-4xl mb-10"><i className="fas fa-certificate"></i></div><h3 className="text-3xl font-black text-white mb-6">ISO 9001:2015</h3><p className="text-slate-400 font-medium leading-relaxed">Standardized quality management systems ensuring consistent product excellence and process reliability across all production lines.</p></div>
            <div className="bg-[#111827] p-12 rounded-[3.5rem] border border-white/10 shadow-2xl scale-105 bg-[#161d2f] ring-2 ring-orange-500/20"><div className="text-orange-500 text-4xl mb-10"><i className="fas fa-shield-alt"></i></div><h3 className="text-3xl font-black text-white mb-6">ASTM F626</h3><p className="text-slate-400 font-medium leading-relaxed">Strict adherence to North American fencing hardware specifications for weight, thickness, and material chemistry.</p></div>
            <div className="bg-[#111827] p-12 rounded-[3.5rem] border border-white/5 shadow-2xl"><div className="text-orange-500 text-4xl mb-10"><i className="fas fa-award"></i></div><h3 className="text-3xl font-black text-white mb-6">EEPC Star</h3><p className="text-slate-400 font-medium leading-relaxed">Recognized by the Ministry of Commerce, Government of India, for outstanding export performance in the engineering category.</p></div>
          </div>
        </div>
      </section>
    </div>
  );

  const AwardsPage = () => (
    <div className="bg-[#0b1120] min-h-screen">
      <PageHeader title="Awards & Honors" subtitle="Honoring 50 years of manufacturing heritage and global trust." />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {AWARDS.map(award => (
              <div key={award.id} className="bg-[#111827] rounded-[4rem] overflow-hidden border border-white/5 flex flex-col sm:flex-row shadow-2xl group">
                <div className="w-full sm:w-2/5 h-64 sm:h-auto overflow-hidden">
                  <img src={award.image} alt={award.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="p-10 sm:p-12 w-full sm:w-3/5">
                  <span className="text-orange-500 font-black text-xs uppercase tracking-[0.3em] mb-4 block">{award.year}</span>
                  <h3 className="text-3xl font-black text-white mb-4 leading-tight group-hover:text-orange-500 transition-colors">{award.title}</h3>
                  <p className="text-slate-400 font-medium text-base leading-relaxed">{award.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const NewsPage = () => (
    <div className="bg-[#0b1120] min-h-screen">
      <PageHeader title="Industrial News" subtitle="Industry updates, trade logistics trends, and manufacturing innovations." />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {BLOG_POSTS.map((post) => (
              <div key={post.id} className="bg-[#111827] rounded-[3.5rem] overflow-hidden border border-white/5 group hover:border-orange-500/50 transition-all cursor-pointer shadow-2xl">
                <div className="h-72 overflow-hidden relative">
                  <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" alt={post.title} />
                  <div className="absolute top-8 left-8"><span className="bg-orange-500 text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">{post.category}</span></div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-black text-white mb-6 group-hover:text-orange-500 transition-colors leading-tight">{post.title}</h3>
                  <p className="text-slate-400 text-base mb-10 line-clamp-2 font-medium">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest border-t border-white/5 pt-6">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const ContactPage = () => (
    <div className="bg-[#0b1120] min-h-screen">
      <PageHeader title="Global Connectivity" subtitle="Get in touch with our expert export division. Available for rapid RFQ processing." />

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-16">
              <div>
                <h4 className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs mb-10">Regional Hubs</h4>
                <div className="space-y-12">
                  <div className="flex gap-8 items-start">
                    <div className="w-16 h-16 bg-[#111827] rounded-[1.5rem] flex items-center justify-center text-orange-500 flex-shrink-0 border border-white/5 shadow-xl"><i className="fas fa-building text-xl"></i></div>
                    <div><h5 className="text-white font-black text-2xl mb-2">Corporate Headquarters</h5><p className="text-slate-400 font-medium text-lg leading-relaxed">28B, Shakespeare Sarani, Kolkata - 700017, India</p></div>
                  </div>
                  <div className="flex gap-8 items-start">
                    <div className="w-16 h-16 bg-[#111827] rounded-[1.5rem] flex items-center justify-center text-orange-500 flex-shrink-0 border border-white/5 shadow-xl"><i className="fas fa-industry text-xl"></i></div>
                    <div><h5 className="text-white font-black text-2xl mb-2">Howrah Plant</h5><p className="text-slate-400 font-medium text-lg leading-relaxed">Howrah 711405, West Bengal, India</p></div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs mb-10">Direct Inquiries</h4>
                <div className="space-y-12">
                  <div className="flex gap-8 items-center group">
                    <div className="w-16 h-16 bg-[#111827] rounded-[1.5rem] flex items-center justify-center text-orange-500 flex-shrink-0 border border-white/5 shadow-xl group-hover:bg-orange-500 group-hover:text-white transition-all"><i className="fas fa-phone-alt text-xl"></i></div>
                    <div><h5 className="text-white font-black text-2xl group-hover:text-orange-500 transition-all">+91 9830083777</h5><p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">24/7 International Desk</p></div>
                  </div>
                  <div className="flex gap-8 items-center group">
                    <div className="w-16 h-16 bg-[#111827] rounded-[1.5rem] flex items-center justify-center text-orange-500 flex-shrink-0 border border-white/5 shadow-xl group-hover:bg-orange-500 group-hover:text-white transition-all"><i className="fas fa-envelope text-xl"></i></div>
                    <div><h5 className="text-white font-black text-2xl group-hover:text-orange-500 transition-all">sales@charu.in</h5><p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Quotations & Partnerships</p></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-[4rem] p-12 sm:p-16 border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 blur-[150px] pointer-events-none"></div>
              <h3 className="text-4xl font-black text-white mb-10 relative z-10 tracking-tight">Request an <span className="text-orange-500">Export RFQ</span></h3>
              <form onSubmit={handleInquirySubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Name</label>
                    <input type="text" placeholder="Full Name" className="w-full bg-[#0b1120] border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-orange-500 outline-none transition-all font-medium" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Work Email</label>
                    <input type="email" placeholder="Corporate Email" className="w-full bg-[#0b1120] border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-orange-500 outline-none transition-all font-medium" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Organization</label>
                  <input type="text" placeholder="Company Name" className="w-full bg-[#0b1120] border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-orange-500 outline-none transition-all font-medium" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Project Brief</label>
                  <textarea rows={5} placeholder="Project requirements (Gauges, Components, Quantities)..." className="w-full bg-[#0b1120] border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-orange-500 outline-none transition-all font-medium resize-none" required></textarea>
                </div>
                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-6 rounded-2xl transition-all shadow-[0_20px_50px_rgba(249,115,22,0.3)] text-lg uppercase tracking-[0.2em]">Submit RFQ</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#080d1a] border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="bg-[#111827] rounded-[4rem] sm:rounded-[6rem] p-12 sm:p-24 border border-orange-500/10 shadow-2xl relative z-10">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="w-full lg:w-1/2">
                <div className="inline-flex items-center gap-4 bg-orange-500/10 text-orange-500 text-[10px] font-black px-5 py-2.5 rounded-full uppercase tracking-widest mb-10 border border-orange-500/20 shadow-lg">
                  <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]"></span> Sales Engineering Consult
                </div>
                <h2 className="text-4xl sm:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter">Request a <span className="text-orange-500">Callback</span></h2>
                <p className="text-slate-400 text-lg sm:text-2xl leading-relaxed mb-12 font-medium opacity-80">Prefer a direct technical conversation? Schedule a call with our specialist to discuss ASTM standards and export container logistics.</p>
              </div>
              <div className="w-full lg:w-1/2 bg-[#0b1120] p-12 rounded-[3.5rem] border border-white/5 shadow-inner">
                <form onSubmit={handleCallbackSubmit} className="space-y-8">
                  <div><label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 block ml-2">Name</label><input type="text" placeholder="Your Name" className="w-full bg-[#111827] border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-orange-500 outline-none transition-all font-bold" required /></div>
                  <div><label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 block ml-2">Contact Number</label><input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-[#111827] border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-orange-500 outline-none transition-all font-bold" required /></div>
                  <div><label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 block ml-2">Preferred Window (IST)</label><select className="w-full bg-[#111827] border border-white/10 rounded-2xl px-8 py-5 text-white focus:border-orange-500 outline-none transition-all font-bold cursor-pointer appearance-none"><option>ASAP</option><option>Morning (10AM - 1PM)</option><option>Afternoon (1PM - 4PM)</option><option>Evening (4PM - 7PM)</option></select></div>
                  <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-6 rounded-2xl transition-all shadow-[0_20px_50px_rgba(249,115,22,0.2)] text-lg uppercase tracking-[0.2em]">Schedule Call</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-200 selection:bg-orange-500 selection:text-white overflow-x-hidden">
      <nav className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-300 ${isScrolled ? 'bg-[#0b1120]/95 backdrop-blur-md shadow-2xl py-2 border-b border-white/5' : 'bg-transparent py-6 text-white'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentPage('home')}>
            <div className="w-10 h-10 rounded-[1rem] bg-orange-500 flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:rotate-12 transition-transform">C</div>
            <span className="text-base sm:text-2xl font-black tracking-tighter text-white whitespace-nowrap group-hover:text-orange-500 transition-colors">CHARU ENTERPRISES</span>
          </div>
          <div className="hidden lg:flex items-center gap-10 font-black uppercase text-[10px] tracking-[0.2em]">
            {['home', 'products', 'about', 'certifications', 'awards', 'news', 'exports', 'contact'].map((p) => (
              <button key={p} onClick={() => setCurrentPage(p as Page)} className={`hover:text-orange-500 transition-colors ${currentPage === p ? 'text-orange-500' : 'text-white'}`}>{p === 'about' ? 'Why Us' : p === 'news' ? 'Industrial News' : p === 'contact' ? 'Contact Us' : p}</button>
            ))}
            <button onClick={() => setCurrentPage('contact')} className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all shadow-[0_10px_30px_rgba(249,115,22,0.3)]">Request Quote</button>
          </div>
          <button onClick={toggleMobileMenu} className="lg:hidden w-12 h-12 flex items-center justify-center text-white text-2xl z-[120] relative"><i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} transition-transform duration-300`}></i></button>
        </div>

        <div className={`lg:hidden fixed inset-0 z-[105] transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-[#080d1a]/95 backdrop-blur-xl" onClick={toggleMobileMenu}></div>
          <div className={`absolute right-0 top-0 bottom-0 w-[85%] bg-[#0b1120] flex flex-col p-12 pt-32 gap-8 transition-transform duration-500 ease-in-out transform border-l border-white/5 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {['home', 'products', 'about', 'certifications', 'awards', 'news', 'exports', 'contact'].map((p) => (
              <button key={p} onClick={() => setCurrentPage(p as Page)} className={`text-left text-4xl font-black transition-all capitalize ${currentPage === p ? 'text-orange-500' : 'text-white hover:text-orange-500'}`}>{p === 'about' ? 'Why Us' : p === 'news' ? 'Industrial News' : p === 'contact' ? 'Contact Us' : p}</button>
            ))}
            <div className="mt-auto"><button onClick={() => setCurrentPage('contact')} className="w-full bg-orange-500 text-white px-10 py-6 rounded-[2rem] text-xl font-black shadow-2xl uppercase tracking-widest">Get A Quote</button></div>
          </div>
        </div>
      </nav>

      <main className="animate-in fade-in duration-700">
        {currentPage === 'home' && <Home />}
        {currentPage === 'products' && <ProductsPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'exports' && <ExportsPage />}
        {currentPage === 'certifications' && <CertificationsPage />}
        {currentPage === 'awards' && <AwardsPage />}
        {currentPage === 'news' && <NewsPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* MODAL SECTION */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={closeProductModal}></div>
          <div className="relative bg-[#111827] w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-[4rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-500">
            <button onClick={closeProductModal} className="fixed top-12 right-12 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-orange-500 transition-all z-[210] shadow-2xl border border-white/10"><i className="fas fa-times text-xl"></i></button>

            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 h-[400px] lg:h-[800px] sticky top-0 bg-[#0b1120]">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent lg:hidden"></div>
              </div>

              <div className="p-10 sm:p-20 w-full lg:w-1/2">
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <span className="bg-orange-500 text-white text-[10px] font-black px-6 py-2.5 rounded-full uppercase tracking-[0.2em] shadow-lg">{selectedProduct.category}</span>
                  {selectedProduct.standards?.map((std, i) => (
                    <span key={i} className="bg-blue-500/10 text-blue-400 text-[10px] font-black px-6 py-2.5 rounded-full uppercase tracking-[0.2em] border border-blue-500/20">{std}</span>
                  ))}
                </div>

                <h2 className="text-4xl sm:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tighter">{selectedProduct.name}</h2>
                <p className="text-slate-400 text-xl mb-14 leading-relaxed font-medium opacity-90">{selectedProduct.description}</p>

                <div className="space-y-16">
                  {selectedProduct.specifications && (
                    <section>
                      <h4 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-xs flex items-center gap-5">
                        <span className="w-12 h-[2px] bg-orange-500"></span> Technical Specifications
                      </h4>
                      <div className="bg-[#0b1120] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-inner">
                        {Object.entries(selectedProduct.specifications).map(([key, val], idx) => (
                          <div key={key} className={`flex justify-between items-center p-6 border-b border-white/5 last:border-0 ${idx % 2 === 0 ? 'bg-white/5' : ''}`}>
                            <span className="text-slate-500 text-xs font-black uppercase tracking-widest">{key}</span>
                            <span className="text-white text-sm font-black text-right">{val}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  <section>
                    <h4 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-xs flex items-center gap-5">
                      <span className="w-12 h-[2px] bg-orange-500"></span> Manufacturing Core
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-8 bg-[#0b1120] rounded-[2rem] border border-white/5 shadow-xl">
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">Primary Materials</p>
                        <p className="text-white font-black text-lg">{selectedProduct.materials?.join(' • ')}</p>
                      </div>
                      <div className="p-8 bg-[#0b1120] rounded-[2rem] border border-white/5 shadow-xl">
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">Standard Process</p>
                        <p className="text-white font-black text-lg">ASTM Galvanizing</p>
                      </div>
                    </div>
                  </section>

                  <div className="pt-10 flex flex-col sm:flex-row gap-6">
                    <button
                      onClick={() => { closeProductModal(); setCurrentPage('contact'); }}
                      className="flex-grow bg-orange-500 hover:bg-orange-600 text-white font-black py-6 rounded-2xl transition-all shadow-[0_20px_50px_rgba(249,115,22,0.4)] text-lg uppercase tracking-[0.2em] flex items-center justify-center gap-4"
                    >
                      Request Volume RFQ <i className="fas fa-file-contract"></i>
                    </button>
                    <button
                      className="bg-white/5 hover:bg-white/10 text-white font-black px-10 py-6 rounded-2xl transition-all border border-white/10 uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-4 shadow-xl"
                    >
                      Download PDF <i className="fas fa-download"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-[#080d1a] text-white pt-24 pb-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-center sm:text-left">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-8 cursor-pointer group" onClick={() => setCurrentPage('home')}>
                <div className="w-10 h-10 rounded-[1rem] bg-orange-500 flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:rotate-12 transition-transform">C</div>
                <span className="text-xl font-black tracking-tighter">CHARU ENTERPRISES</span>
              </div>
              <p className="text-slate-500 mb-10 leading-relaxed font-medium">Global fence fitting manufacturer and exporter since 1969. Engineering reliability for high-security perimeters.</p>
              <div className="flex justify-center sm:justify-start gap-5">
                <a href="#" className="w-12 h-12 rounded-[1.2rem] bg-white/5 flex items-center justify-center text-slate-500 hover:text-orange-500 transition-colors border border-white/5 hover:border-orange-500/30"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="w-12 h-12 rounded-[1.2rem] bg-white/5 flex items-center justify-center text-slate-500 hover:text-orange-500 transition-colors border border-white/5 hover:border-orange-500/30"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="w-12 h-12 rounded-[1.2rem] bg-white/5 flex items-center justify-center text-slate-500 hover:text-orange-500 transition-colors border border-white/5 hover:border-orange-500/30"><i className="fab fa-twitter"></i></a>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-black mb-10 border-b border-white/5 pb-4 uppercase tracking-[0.3em]">Navigation</h4>
              <ul className="space-y-4 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                <li><button onClick={() => setCurrentPage('home')} className="hover:text-orange-500 transition-colors">Industrial Home</button></li>
                <li><button onClick={() => setCurrentPage('products')} className="hover:text-orange-500 transition-colors">Technical Catalog</button></li>
                <li><button onClick={() => setCurrentPage('exports')} className="hover:text-orange-500 transition-colors">Global Logistics</button></li>
                <li><button onClick={() => setCurrentPage('contact')} className="hover:text-orange-500 transition-colors">Inquiry Center</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black mb-10 border-b border-white/5 pb-4 uppercase tracking-[0.3em]">Corporate</h4>
              <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">28B, Shakespeare Sarani, Kolkata - 700017, India</p>
              <p className="text-orange-500 font-black text-lg">+91 9830083777</p>
            </div>
            <div>
              <h4 className="text-xs font-black mb-10 border-b border-white/5 pb-4 uppercase tracking-[0.3em]">Manufacturing</h4>
              <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">Howrah 711405, West Bengal, India</p>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Plant Accreditation</p>
                <p className="text-white text-xs font-black">ISO 9001:2015 Certified</p>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em]">© 2024 Charu Enterprises. Precision Engineered.</p>
            <div className="flex gap-8 text-[10px] text-slate-600 font-black uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Trade Terms</a>
              <a href="#" className="hover:text-white transition-colors">Legal Audit</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
