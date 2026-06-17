import { motion } from 'motion/react';
import { BookOpen, Target, Code2, Rocket } from 'lucide-react';

export function About() {
  const cards = [
    {
      icon: <BookOpen className="text-indigo-500" size={32} />,
      title: 'Education',
      description: 'Currently preparing for JEE while pursuing my engineering goals.',
    },
    {
      icon: <Code2 className="text-purple-500" size={32} />,
      title: 'Coding Journey',
      description: 'Learning Python, JavaScript, and building web applications.',
    },
    {
      icon: <Target className="text-pink-500" size={32} />,
      title: 'Future Goals',
      description: 'Aspiring to build my own SaaS and exploring AI tools.',
    },
    {
      icon: <Rocket className="text-blue-500" size={32} />,
      title: 'Entrepreneurship',
      description: 'Passionate about startups, product management, and solving real problems.',
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-8" />
          <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            I am a highly motivated student with a unique blend of academic rigor and entrepreneurial spirit. 
            While securing a strong foundation through my JEE preparation, I actively explore the realms of 
            artificial intelligence, modern software development, and the strategies behind successful SaaS products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl flex flex-col items-start hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-xl mb-6">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
