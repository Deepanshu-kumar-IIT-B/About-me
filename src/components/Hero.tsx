import { motion } from 'motion/react';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';

export function Hero() {
  const typedText = useTypewriter([
    'Prompt Engineer',
    'JEE Aspirant',
    'Web Developer',
    'SaaS Builder',
  ]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob dark:mix-blend-screen" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 dark:mix-blend-screen" />
      <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 dark:mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
            Welcome to my portfolio! 👋
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6"
        >
          Hi, I'm <span className="text-gradient">Deepanshu Kumar</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-3xl text-slate-600 dark:text-slate-400 font-medium h-12 mb-8"
        >
          I am a{' '}
          <span className="text-slate-900 dark:text-slate-100 border-r-2 border-indigo-500 pr-1 truncate">
            {typedText}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed"
        >
          Passionate about coding, AI, building SaaS products, and entrepreneurial ventures. 
          Currently balancing my JEE preparation while learning Python and modern web development.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex items-center justify-center gap-2 transition-transform hover:scale-105"
          >
            Let's Connect <ArrowRight size={18} />
          </a>
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-3 rounded-full glass hover:bg-slate-100 dark:hover:bg-slate-800 font-medium flex items-center justify-center gap-2 transition-transform hover:scale-105"
          >
            View Projects
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-6"
        >
          {[
            { icon: <Github size={24} />, href: 'https://github.com/Deepanshu-kumar-IIT-B' },
            { icon: <Linkedin size={24} />, href: 'https://www.linkedin.com/in/deepanshu-kumar-7a56b7417/' },
            { icon: <Mail size={24} />, href: 'mailto:dk.iit.b.2026@gmail.com' }
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-indigo-500 transition-colors"
            >
              {social.icon}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
