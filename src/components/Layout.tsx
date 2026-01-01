import React, { useState, useEffect } from 'react';
import { BLOGS } from '../services/blogs';
import { PROJECTS } from '../services/projects';
import ParticlesBackground from './ParticlesBackground';
import { DEV_INFO, WEB_INFO } from '../services/constants';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
}

const NavIcons = {
  home: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  projects: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  skills: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  experience: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg>,
  education: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>,
  blogs: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  contact: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg>
};

const Layout: React.FC<LayoutProps> = ({ children, activePage, setActivePage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  const displayName = WEB_INFO.siteName.toUpperCase();

  useEffect(() => {
    const html = window.document.documentElement;
    if (theme === 'dark') html.classList.add('dark');
    else html.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrolled / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowScrollTop(scrolled > 400);
    };

    window.addEventListener('scroll', handleScroll);
    if (isSidebarOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSidebarOpen]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navLinks = [
    { name: 'Home', id: 'home', icon: NavIcons.home },
    { name: 'Projects', id: 'projects', icon: NavIcons.projects },
    { name: 'Skills', id: 'skills', icon: NavIcons.skills },
    { name: 'Experience', id: 'experience', icon: NavIcons.experience },
    { name: 'Education', id: 'education', icon: NavIcons.education },
    { name: 'Blogs', id: 'blogs', icon: NavIcons.blogs },
    { name: 'Contact', id: 'contact', icon: NavIcons.contact },
  ];

  const socialLinks = [
    { id: 'email', url: `mailto:${DEV_INFO.email}`, icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg> },
    { id: 'phone', url: `tel:${DEV_INFO.phone}`, icon: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> },
    { id: 'whatsapp', url: `https://${DEV_INFO.whatsapp}`, icon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
    { id: 'linkedin', url: `https://${DEV_INFO.linkedin}`, icon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> },
    { id: 'twitter', url: `https://${DEV_INFO.twitter}`, icon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg> },
    { id: 'facebook', url: `https://${DEV_INFO.facebook}`, icon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  ];

  const handleNavClick = (id: string) => {
    setActivePage(id);
    setIsSidebarOpen(false);
    window.history.pushState({}, '', `/${id === 'home' ? '' : id}`);
  };

  const isNavActive = (id: string) => {
    if (activePage === id) return true;
    if (id === 'blogs' && activePage.startsWith('blog-detail-')) return true;
    if (id === 'projects' && activePage.startsWith('project-detail-')) return true;
    return false;
  };

  const getBreadcrumbs = () => {
    if (activePage === 'home') return null;
    const crumbs = [{ name: 'Home', id: 'home', icon: NavIcons.home }];
    if (activePage.startsWith('blog-detail-')) {
      const blogId = activePage.replace('blog-detail-', '');
      const blog = BLOGS.find(b => b.id === blogId);
      crumbs.push({ name: 'Blogs', id: 'blogs', icon: NavIcons.blogs });
      crumbs.push({ name: blog ? (blog.title.length > 15 ? blog.title.substring(0, 12) + "..." : blog.title) : 'Detail', id: activePage, icon: NavIcons.blogs });
    } else if (activePage.startsWith('project-detail-')) {
      const projectId = activePage.replace('project-detail-', '');
      const project = PROJECTS.find(p => p.id === projectId);
      crumbs.push({ name: 'Projects', id: 'projects', icon: NavIcons.projects });
      crumbs.push({ name: project ? project.title : 'Detail', id: activePage, icon: NavIcons.projects });
    } else {
      const current = navLinks.find(l => l.id === activePage);
      if (current) {
        crumbs.push(current);
      } else if (activePage === 'privacy') {
        crumbs.push({ name: 'Privacy', id: 'privacy', icon: NavIcons.home });
      } else if (activePage === 'terms') {
        crumbs.push({ name: 'Terms', id: 'terms', icon: NavIcons.home });
      }
    }
    return crumbs;
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-transparent text-gray-900 dark:text-gray-100 relative overflow-x-hidden">
      <style>{`
        @keyframes heartbeat {
          0% { transform: scale(1); }
          15% { transform: scale(1.25); }
          30% { transform: scale(1); }
          45% { transform: scale(1.15); }
          60% { transform: scale(1); }
          100% { transform: scale(1); }
        }
        .animate-heartbeat {
          display: inline-block;
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      
      {isLoading && (
        <div className="fixed inset-0 z-[200] bg-white dark:bg-gray-950 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <img src={WEB_INFO.logoUrl} alt="Logo" className="w-24 h-24 sm:w-32 sm:h-32 object-contain animate-pulse mb-8" />
            <div className="w-48 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 animate-[loading_1.5s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>
      )}

      <ParticlesBackground theme={theme} />
      {isSidebarOpen && <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setIsSidebarOpen(false)} />}
      
      <aside className={`fixed top-0 left-0 z-[70] w-[75vw] h-full bg-white dark:bg-gray-900 border-r-2 border-gray-200 dark:border-gray-800 transition-transform duration-500 lg:hidden rounded-tr-[3.5rem] rounded-br-[3.5rem] shadow-2xl flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 h-full flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-12 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <img src={WEB_INFO.logoUrl} alt="Logo" className="w-8 h-8 object-contain" />
              <span className="text-base font-black uppercase tracking-widest">{displayName}</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
          <nav className="space-y-2 overflow-y-auto pr-2 scrollbar-hide">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => handleNavClick(link.id)} className={`w-full text-left px-6 py-4 rounded-2xl font-bold flex items-center justify-between transition-all ${isNavActive(link.id) ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`}>
                <span className="flex items-center gap-4">{link.icon} {link.name}</span>
                {isNavActive(link.id) && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <nav className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-6 pt-4 h-20 sm:h-24">
        <div className="max-w-7xl mx-auto h-full bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-800 rounded-[2rem] shadow-sm flex justify-between items-center px-6 sm:px-10">
          <div className="flex items-center">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 mr-3 lg:hidden text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition-colors"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
            <div onClick={() => handleNavClick('home')} className="flex items-center space-x-3 cursor-pointer group">
              <img src={WEB_INFO.logoUrl} alt="Logo" className="w-10 h-10 sm:w-14 sm:h-14 object-contain transition-transform group-hover:scale-110" />
              <span className="text-xl sm:text-2xl font-black">{displayName}</span>
            </div>
          </div>
          <div className="hidden lg:flex space-x-8">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => handleNavClick(link.id)} className={`text-[11px] font-black uppercase tracking-[0.2em] relative py-2 flex items-center gap-2 transition-colors ${isNavActive(link.id) ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600'}`}>
                {link.icon} {link.name}
                {isNavActive(link.id) && <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-indigo-600 rounded-full"></span>}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition-colors shadow-sm">
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            <a href={`https://${DEV_INFO.github}`} target="_blank" rel="noopener noreferrer" className="hidden sm:flex bg-gray-900 dark:bg-white text-white dark:text-black w-12 h-12 rounded-full items-center justify-center hover:scale-110 shadow-lg transition-all"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
          </div>
        </div>
      </nav>
      
      <main className="flex-grow pt-24 sm:pt-32 z-10 flex flex-col">
        {getBreadcrumbs() && (
          <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 mb-2 flex-shrink-0">
            <nav className="flex items-center space-x-2 text-[11px] text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-900/50 w-fit px-4 py-1.5 rounded-full border-2 border-gray-200 dark:border-gray-800 backdrop-blur-sm shadow-sm transition-all overflow-x-auto whitespace-nowrap scrollbar-hide">
              {getBreadcrumbs()?.map((crumb, idx) => (
                <React.Fragment key={crumb.id}>
                  {idx > 0 && <svg className="w-3.5 h-3.5 opacity-50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
                  <button onClick={() => handleNavClick(crumb.id)} className={`flex items-center gap-1.5 uppercase tracking-widest transition-colors flex-shrink-0 ${idx === getBreadcrumbs()!.length - 1 || isNavActive(crumb.id) ? 'font-black text-indigo-600 dark:text-indigo-400' : 'font-bold hover:text-indigo-600'}`}>
                    {crumb.icon} {crumb.name}
                  </button>
                </React.Fragment>
              ))}
            </nav>
          </div>
        )}
        <div className="flex-grow">{children}</div>
      </main>

      <button 
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 z-[90] w-14 h-14 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center border-2 border-gray-100 dark:border-gray-800 shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 group ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
      >
        <svg className="absolute w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r={radius} fill="transparent" stroke="currentColor" strokeWidth="3" className="text-gray-100 dark:text-gray-800" />
          <circle cx="25" cy="25" r={radius} fill="transparent" stroke="currentColor" strokeWidth="3" strokeDasharray={circumference} strokeDashoffset={dashOffset} strokeLinecap="round" className="text-indigo-600 dark:text-indigo-500 transition-all duration-150" />
        </svg>
        <div className="relative flex flex-col items-center justify-center">
            <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-500 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" /></svg>
            <span className="text-[8px] font-black text-indigo-600 dark:text-indigo-500 uppercase mt-0.5">{Math.round(scrollProgress)}%</span>
        </div>
      </button>

      <footer className="bg-white/40 dark:bg-gray-950/40 backdrop-blur-xl border-t-2 border-gray-300 dark:border-gray-800 py-16 z-10 rounded-t-[3rem] mt-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="mb-12 text-center md:text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8">Transmission Grid</h4>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {socialLinks.map(s => (
                <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/50 dark:bg-gray-900/50 border-2 border-gray-100 dark:border-gray-800 rounded-2xl text-gray-500 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all hover:scale-110 shadow-sm" title={s.id}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="pt-8 border-t-2 border-gray-300 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] text-center md:text-left">
              © 2024 — {new Date().getFullYear()} {displayName} <span className="animate-heartbeat inline-block ml-1">💛</span>
            </span>
            <div className="flex gap-8">
              <button onClick={() => handleNavClick('privacy')} className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-indigo-500 transition-colors">Privacy</button>
              <button onClick={() => handleNavClick('terms')} className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-indigo-500 transition-colors">Terms</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
