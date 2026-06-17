import { motion } from 'motion/react';

export function Journey() {
  const roadmap = [
    {
      year: 'Present',
      title: 'JEE Preparation',
      description: 'Dedicated focus on physics, chemistry, and advanced mathematics, honing analytical thinking and intense problem-solving capabilities under pressure.',
      side: 'left',
    },
    {
      year: 'Present',
      title: 'Coding Journey Initiated',
      description: 'Started self-taught pathways into Python and modern JavaScript. Understanding fundamentals like DOM manipulation, loops, and object-oriented concepts.',
      side: 'right',
    },
    {
      year: 'Upcoming',
      title: 'Building Real SaaS',
      description: 'The goal is to leverage prompt engineering and fast-iteration frameworks to launch micro-SaaS products that solve niche academic or productivity problems.',
      side: 'left',
    },
    {
      year: 'Future',
      title: 'Startup Foundation',
      description: 'Integrating engineering academics with hands-on coding to step into the startup ecosystem, focusing on AI-driven workflows.',
      side: 'right',
    },
  ];

  return (
    <section id="journey" className="py-24 bg-slate-100/50 dark:bg-slate-900/20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">My Learning Journey</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-8" />
          <p className="text-lg text-slate-600 dark:text-slate-400">
            A timeline of balancing intense academic requirements with my genuine passion for tech and business.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-slate-300 dark:bg-slate-700 hidden md:block" />

          <div className="space-y-12">
            {roadmap.map((item, index) => (
              <div key={index} className="relative flex flex-col md:flex-row items-center justify-between w-full">
                
                {/* Left Side */}
                <div className="w-full md:w-5/12 flex justify-end">
                  {item.side === 'left' && (
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5 }}
                      className="glass px-8 py-6 rounded-2xl shadow-lg w-full"
                    >
                       <span className="text-indigo-500 font-bold mb-2 block">{item.year}</span>
                       <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                       <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.description}</p>
                    </motion.div>
                  )}
                </div>

                {/* Center Node */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-500 border-4 border-white dark:border-slate-950 z-10 items-center justify-center">
                   <div className="w-2 h-2 rounded-full bg-white" />
                </div>

                {/* Right Side */}
                <div className="w-full md:w-5/12 mt-8 md:mt-0 flex justify-start">
                  {item.side === 'right' && (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5 }}
                      className="glass px-8 py-6 rounded-2xl shadow-lg w-full"
                    >
                       <span className="text-purple-500 font-bold mb-2 block">{item.year}</span>
                       <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                       <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.description}</p>
                    </motion.div>
                  )}
                  {/* Mobile fallback for Left items since layout is row above */}
                  {item.side === 'left' && (
                    <div className="md:hidden block w-full mt-4">
                      {/* Already rendered in left side on mobile, but just pushing it visually. Actually, flex-col naturally stacks it. We just need to fix display rules. */}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
