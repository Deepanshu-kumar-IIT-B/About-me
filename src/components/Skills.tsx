import { motion } from 'motion/react';

export function Skills() {
  const skillsConfig = [
    { name: 'Problem Solving', level: 90, color: 'from-blue-500 to-cyan-500' },
    { name: 'Prompt Engineering', level: 85, color: 'from-indigo-500 to-purple-500' },
    { name: 'Basic Web Development (HTML, CSS)', level: 80, color: 'from-pink-500 to-rose-500' },
    { name: 'AI Tools Overview', level: 75, color: 'from-fuchsia-500 to-pink-500' },
    { name: 'Learning Python', level: 60, color: 'from-yellow-400 to-orange-500' },
    { name: 'Learning JavaScript', level: 50, color: 'from-yellow-300 to-yellow-500' },
  ];

  return (
    <section id="skills" className="py-24 bg-slate-100/50 dark:bg-slate-900/20 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-8" />
          <p className="text-lg text-slate-600 dark:text-slate-400">
            A snapshot of my current technical proficiencies and soft skills. I believe in continuous learning and adapting to new technologies.
          </p>
        </motion.div>

        <div className="space-y-8">
          {skillsConfig.map((skill, index) => (
            <div key={index} className="w-full">
              <div className="flex justify-between items-end mb-2">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{skill.name}</span>
                <span className="text-sm font-mono text-slate-500">{skill.level}%</span>
              </div>
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
