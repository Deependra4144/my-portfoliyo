import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Download,
  Code,
  Palette,
  Smartphone,
  Globe,
  ChevronDown,
  Menu,
  X,
  Moon,
  Sun
} from 'lucide-react';

// Auto-typing animation component
const TypewriterText = ({ text, speed = 100, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-0.5 h-8 bg-primary-600 ml-1"
      />
    </span>
  );
};

const App = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setCurrentSection(sectionId);
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const skills = [
    { name: 'React.js', icon: <Code />, category: 'Frontend' },
    { name: 'Redux Toolkit', icon: <Smartphone />, category: 'Frontend' },
    { name: 'Next.js', icon: <Smartphone />, category: 'Frontend' },
    { name: 'JavaScript', icon: <Code />, category: 'Frontend' },
    { name: 'React Hook Form', icon: <Smartphone />, category: 'Frontend' },
    { name: 'Yup', icon: <Code />, category: 'Frontend' },
    { name: 'Tailwind CSS', icon: <Palette />, category: 'Styling' },
    { name: 'Bootstrap', icon: <Palette />, category: 'Styling' },
    { name: 'Node.js', icon: <Code />, category: 'Backend' },
    { name: 'Express.js', icon: <Globe />, category: 'Backend' },
    { name: 'MongoDB', icon: <Globe />, category: 'Database' },
    { name: 'Axios', icon: <Smartphone />, category: 'Utilities' },
    { name: 'Fetch API', icon: <Smartphone />, category: 'Utilities' },
  ];

  const projects = [
    {
      title: "Wildly Indian (Fish E-commerce)",
      description: "A MERN-based fish-selling e-commerce website with dynamic product listings, search, filtering, cart system, and UPI payment integration.",
      tech: ["React", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "Tailwind"],
      image: "https://via.placeholder.com/400x250/3b82f6/ffffff?text=Wildly+Indian",
      link: "https://wildlyindian.com"
    },
    {
      title: "Viraasi (Jewelry E-commerce)",
      description: "Developed user and admin panels for an online jewelry store with product CRUD, order management, and responsive UI optimized for performance.",
      tech: ["React", "Redux Toolkit", "Tailwind", "API Integration"],
      image: "https://www.viraasi.com/cdn/shop/files/viraasi-official-logo.png?v=1661511874&width=500",
      link: "https://www.viraasi.com/"
    },
    {
      title: "The Dolphin (MLM Platform)",
      description: "Designed and developed user and admin interfaces for an MLM platform with digital products, referral rewards, and responsive layouts.",
      tech: ["React", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "Bootstrap"],
      image: "https://via.placeholder.com/400x250/ef4444/ffffff?text=The+Dolphin",
      link: "#"
    },
    {
      title: "YouTube Backend API System",
      description: "A backend system built with Node.js and MongoDB to support video uploads, authentication, subscriptions, comments, and history tracking.",
      tech: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Cloudinary"],
      image: "https://via.placeholder.com/400x250/8b5cf6/ffffff?text=YouTube+API",
      link: "#"
    }
  ];


  return (
    <div className={`min-h-screen ${darkMode ? 'bg-secondary-900' : 'bg-white'}`}>
      {/* Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 border-b ${darkMode ? 'bg-secondary-900/90 border-secondary-800' : 'bg-white/90 border-gray-200'} backdrop-blur-md`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="text-2xl font-bold text-primary-600"
              whileHover={{ scale: 1.05 }}
            >
              Portfolio
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentSection === item.id
                    ? 'text-primary-600 bg-primary-50 dark:bg-secondary-800 dark:text-primary-400'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50 dark:text-secondary-100 dark:hover:text-primary-400 dark:hover:bg-secondary-800'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
              {/* Dark mode toggle */}
              <button
                className="ml-4 p-2 rounded-full border border-transparent hover:border-primary-400 transition-colors bg-secondary-100 dark:bg-secondary-800 text-primary-600 dark:text-primary-400"
                onClick={() => setDarkMode((d) => !d)}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            <motion.button
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50 dark:text-secondary-100 dark:hover:text-primary-400 dark:hover:bg-secondary-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={`md:hidden fixed top-16 left-0 right-0 z-40 shadow-lg border-b ${darkMode ? 'bg-secondary-900 border-secondary-800' : 'bg-white border-gray-200'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentSection === item.id
                    ? 'text-primary-600 bg-primary-50 dark:bg-secondary-800 dark:text-primary-400'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50 dark:text-secondary-100 dark:hover:text-primary-400 dark:hover:bg-secondary-800'
                    }`}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
              {/* Dark mode toggle in mobile menu */}
              <button
                className="mt-2 p-2 rounded-full border border-transparent hover:border-primary-400 transition-colors bg-secondary-100 dark:bg-secondary-800 text-primary-600 dark:text-primary-400 w-full flex items-center justify-center"
                onClick={() => setDarkMode((d) => !d)}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                <span className="ml-2 text-sm">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className={`min-h-screen flex items-center justify-center pt-16 bg-gradient-to-br ${darkMode ? 'from-secondary-900 to-secondary-800' : 'from-primary-50 to-secondary-50'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.h6
                className="text-5xl md:text-7xl font-bold text-secondary-900 dark:text-primary-100 mb-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Hi, I'm{' '}
                <span className="text-primary-600">
                  <TypewriterText text="Deependra Swami" speed={100} />
                </span>
              </motion.h6>
              <motion.p
                className="text-xl md:text-2xl text-secondary-600 dark:text-primary-300 mb-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Full Stack Developer & UI/UX Designer
              </motion.p>
              <motion.p
                className="text-lg text-secondary-500 dark:text-primary-400 mb-8 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                I create beautiful, functional, and user-centered digital experiences.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <motion.button
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={20} />
                  Download CV
                </motion.button>
                <motion.button
                  className="btn btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                >
                  Get In Touch
                </motion.button>
              </motion.div>

              <motion.div
                className="flex justify-center lg:justify-start space-x-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <motion.a
                  href="#"
                  className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl text-secondary-600 hover:text-primary-600 transition-all duration-300 dark:bg-secondary-800 dark:text-primary-400 dark:hover:bg-secondary-700"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github size={24} />
                </motion.a>
                <motion.a
                  href="#"
                  className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl text-secondary-600 hover:text-primary-600 transition-all duration-300 dark:bg-secondary-800 dark:text-primary-400 dark:hover:bg-secondary-700"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin size={24} />
                </motion.a>
                <motion.a
                  href="#"
                  className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl text-secondary-600 hover:text-primary-600 transition-all duration-300 dark:bg-secondary-800 dark:text-primary-400 dark:hover:bg-secondary-700"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mail size={24} />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full blur-xl opacity-20 -z-10 dark:from-primary-500 dark:to-secondary-500"></div>

                {/* Profile image container */}
                <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl dark:border-secondary-700">
                  <img
                    src={'/My-image.jpeg'}
                    alt="Deependra Swami"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating elements for decoration */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500 rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary-500 rounded-full"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute top-1/2 -right-8 w-4 h-4 bg-primary-300 rounded-full"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => scrollToSection('about')}
          >
            <ChevronDown size={24} className="text-secondary-400" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-secondary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-secondary-600 dark:text-primary-300 leading-relaxed">
                I’m Deependra Swami, a passionate Frontend Developer with over 1 year of experience in building responsive and user-friendly web applications. I specialize in React.js, with strong skills in JavaScript, Redux Toolkit, Tailwind CSS, and Bootstrap, focusing on performance optimization and clean UI/UX design.

                Currently, I’m working as a Frontend Developer at Stomer Infotech, where I contribute to real-world projects including e-commerce platforms, MLM systems, and scalable web solutions. My work spans from developing intuitive user panels to integrating APIs, ensuring smooth performance, and delivering efficient admin interfaces.
              </p>
              <p className="text-lg text-secondary-600 dark:text-primary-300 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 gap-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center p-6 bg-primary-50 rounded-lg dark:bg-secondary-800">
                <h3 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">1+</h3>
                <p className="text-secondary-600 dark:text-primary-300">Years Experience</p>
              </div>
              <div className="text-center p-6 bg-secondary-50 rounded-lg dark:bg-secondary-800">
                <h3 className="text-3xl font-bold text-secondary-600 dark:text-primary-400 mb-2">20+</h3>
                <p className="text-secondary-600 dark:text-primary-300">Projects Completed</p>
              </div>
              <div className="text-center p-6 bg-primary-50 rounded-lg dark:bg-secondary-800">
                <h3 className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">20+</h3>
                <p className="text-secondary-600 dark:text-primary-300">Happy Clients</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-secondary-50 dark:bg-secondary-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Skills & Technologies
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="flex items-center bg-white rounded-xl shadow-lg p-5 gap-5 group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 dark:bg-secondary-700 dark:shadow-lg dark:hover:shadow-2xl dark:hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 shadow group-hover:shadow-lg group-hover:from-primary-200 group-hover:to-secondary-200 transition-all duration-300 dark:from-primary-200 dark:to-secondary-200">
                    <motion.div
                      className="text-3xl text-primary-600"
                      whileHover={{ scale: 1.15, filter: 'drop-shadow(0 0 8px #6366f1)' }}
                      transition={{ duration: 0.3 }}
                    >
                      {skill.icon}
                    </motion.div>
                  </div>
                </div>
                {/* Skill Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-semibold text-secondary-900 dark:text-primary-100 truncate">{skill.name}</span>
                    <span className="px-2 py-0.5 text-xs font-medium rounded bg-primary-50 text-primary-700 ml-2 dark:bg-secondary-700 dark:text-primary-300">{skill.category}</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-2">
                    <div className="w-full h-3 bg-secondary-100 rounded-full overflow-hidden dark:bg-secondary-600">
                      <motion.div
                        className="h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full shadow"
                        initial={{ width: 0 }}
                        whileInView={{ width: '78%' }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1, type: 'spring' }}
                        viewport={{ once: true }}
                      />
                    </div>
                    <span className="text-xs text-secondary-500 dark:text-primary-400 mt-1 inline-block">Proficiency: 78%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white dark:bg-secondary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden dark:bg-secondary-700 dark:shadow-lg dark:hover:shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <motion.a
                      href={project.link}
                      className="bg-white text-secondary-900 px-4 py-2 rounded-lg font-medium"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      View Project
                    </motion.a>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-primary-100 mb-3">{project.title}</h3>
                  <p className="text-secondary-600 dark:text-primary-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm dark:bg-secondary-600 dark:text-primary-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-secondary-50 dark:bg-secondary-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-secondary-900 dark:text-primary-100">Let's work together!</h3>
              <p className="text-lg text-secondary-600 dark:text-primary-300">
                I'm always interested in hearing about new projects and opportunities.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail size={20} className="text-primary-600" />
                  <span className="text-secondary-600 dark:text-primary-300">your.email@example.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Linkedin size={20} className="text-primary-600" />
                  <span className="text-secondary-600 dark:text-primary-300">linkedin.com/in/yourprofile</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Github size={20} className="text-primary-600" />
                  <span className="text-secondary-600 dark:text-primary-300">github.com/yourusername</span>
                </div>
              </div>
            </motion.div>

            <motion.form
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-secondary-700 dark:border-secondary-600 dark:text-primary-100 dark:focus:ring-primary-500 dark:focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-secondary-700 dark:border-secondary-600 dark:text-primary-100 dark:focus:ring-primary-500 dark:focus:border-transparent"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  required
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none dark:bg-secondary-700 dark:border-secondary-600 dark:text-primary-100 dark:focus:ring-primary-500 dark:focus:border-transparent"
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="btn btn-primary w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="bg-secondary-900 text-white py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Your Name. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default App;
