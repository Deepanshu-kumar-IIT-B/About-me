import { motion } from 'motion/react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Contact() {
  const { user, openAuthModal } = useAuth();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal('required');
      return;
    }
    alert(`Thank you ${user.name}! Your message has been simulated to be sent.`);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-8" />
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Open to opportunities, freelance projects, or just a chat about tech and startups.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Let's talk about your next project or idea</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Whether you have a question, want to collaborate on a SaaS project, or simply want to say hi, feel free to drop a message. I typically respond within 24 hours.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 glass rounded-xl">
                <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-full">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Email</p>
                  <a href="mailto:dkumar9319850585@gmail.com" className="font-bold hover:text-indigo-500 transition-colors break-all">
                    dkumar9319850585@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 glass rounded-xl">
                <div className="p-3 bg-purple-500/10 text-purple-500 rounded-full">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Socials</p>
                  <div className="flex gap-4 mt-1 font-bold">
                    <a href="https://www.linkedin.com/in/deepanshu-kumar-7a56b7417/" className="hover:text-purple-500 transition-colors">Linkedin</a>
                    <a href="https://github.com/Deepanshu-kumar-IIT-B" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 transition-colors">GitHub</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass p-8 rounded-2xl flex flex-col gap-6"
            onSubmit={handleContactSubmit}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 opacity-80">Name</label>
              <input
                type="text"
                id="name"
                className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="John Doe"
                defaultValue={user?.name || ''}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 opacity-80">Email</label>
              <input
                type="email"
                id="email"
                className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="john@example.com"
                defaultValue={user?.email || ''}
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 opacity-80">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                placeholder="Hi Deepanshu, I'd like to talk about..."
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white font-bold flex items-center justify-center gap-2 transition-all mt-2"
            >
              Send Message <Send size={18} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
