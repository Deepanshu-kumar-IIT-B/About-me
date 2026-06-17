import { motion } from 'motion/react';
import { ExternalLink, Github, FolderGit2 } from 'lucide-react';

export function Projects() {
  const projects = [
    {
      title: 'Chat with AI',
      description: 'Intelligent conversational AI designed for guidance, productivity, learning, and meaningful interactions.',
      tags: ['Python', 'Logic', 'Input Handling' , 'Real human talk'],
      github: 'https://github.com/Deepanshu-kumar-IIT-B/Chat-with-Ai',
      live: '#',
      status: 'Completed',
    },
    {
      title: 'Deepanshu_AI_Studio',
      description: 'One-click AI photo editing solution delivering fast, professional-quality image enhancements.',
      tags: ['Easy to use', 'Save your time', 'Fast photo edit'],
      github: 'https://github.com/Deepanshu-kumar-IIT-B/Deepanshu_AI_Studio',
      live: '#',
      status: 'completed',
    },
    {
      title: 'Mock-test-maker',
      description: 'Converts PDFs and previous-year papers into interactive quizzes and mock tests for effective exam preparation.',
      tags: ['Prompt Engineering', 'API', 'Automation'],
      github: 'https://github.com/Deepanshu-kumar-IIT-B/Pdf-to-Quiz-as-a-mock-test',
      live: '#',
      status: 'completed',
    },
    {
      title: 'AI Design Studio',
      description: 'AI Design Studio is an AI-powered platform that transforms text prompts into professional thumbnails, logos, banners, and social media designs within seconds.',
      tags: ['HTML', 'CSS', 'UI/UX'],
      github: 'https://github.com/Deepanshu-kumar-IIT-B/AI-Design-Studio',
      live: '#',
      status: 'completed',
    },
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-8" />
          <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            A collection of things I've built or am currently building in my journey to master software engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl">
                  <FolderGit2 size={32} />
                </div>
                <div className="flex gap-4">
                  <a href={project.github} className="text-slate-400 hover:text-indigo-500 transition-colors">
                    <Github size={24} />
                  </a>
                  <a href={project.live} className="text-slate-400 hover:text-indigo-500 transition-colors">
                    <ExternalLink size={24} />
                  </a>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-500 transition-colors">{project.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow">
                {project.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tIndex) => {
                    const colors = [
                      'bg-blue-500/10 text-blue-600 dark:text-blue-400',
                      'bg-purple-500/10 text-purple-600 dark:text-purple-400',
                      'bg-pink-500/10 text-pink-600 dark:text-pink-400',
                      'bg-orange-500/10 text-orange-600 dark:text-orange-400',
                      'bg-teal-500/10 text-teal-600 dark:text-teal-400',
                      'bg-rose-500/10 text-rose-600 dark:text-rose-400',
                    ];
                    const hash = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                    const colorClass = colors[hash % colors.length];
                    
                    return (
                      <span key={tIndex} className={`text-xs font-mono px-3 py-1 rounded-full ${colorClass}`}>
                        {tag}
                      </span>
                    );
                  })}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  project.status.toLowerCase() === 'completed' ? 'bg-green-500/10 text-green-500' :
                  project.status === 'In Progress' ? 'bg-yellow-500/10 text-yellow-500' :
                  'bg-blue-500/10 text-blue-500'
                }`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
