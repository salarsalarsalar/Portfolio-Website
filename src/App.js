import React, { useState, useEffect, useRef, useCallback } from 'react';

// Custom Hook for Scroll Reveal Animation
const useScrollReveal = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Only set to true if it enters the viewport
      if (entry.isIntersecting) {
        setIsVisible(true);
        // If you want the animation to play only once, disconnect the observer
        observer.disconnect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]); // Re-run effect if options change (though unlikely for this use case)

  return [ref, isVisible];
};

// Main App Component
const App = () => {
  // State for smooth scrolling
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // State for portfolio image expansion
  const [expandedImageId, setExpandedImageId] = useState(null);

  // State for fetched GitHub repositories
  const [githubProjects, setGithubProjects] = useState([]);
  const [loadingGithubProjects, setLoadingGithubProjects] = useState(true);
  const [githubError, setGithubError] = useState(null);

  // Portfolio images - Now correctly referencing images like 'image (1).png' with unique descriptions
  const portfolioImages = Array.from({ length: 27 }, (_, i) => ({
    id: i + 1,
    src: `/Portfolio_images/image (${i + 1}).png`, // Updated to match 'image (1).png' format
    alt: `Portfolio Image ${i + 1}`,
    description: `Made by Salar Ahmed`,
  }));

  // Projects data (fallback from resume, used if GitHub fetch fails)
  const fallbackProjects = [
    {
      id: 1,
      title: 'AI-Powered Career Counseling System',
      description: 'Developed a web-based AI-powered platform to provide personalized career guidance, integrating web scraping and data preprocessing in Python. Features a React-based chatbot interface powered by the OpenAI API and includes personality assessments and university/course recommendation modules.',
      link: '#', // Replace with actual GitHub repo link
    },
    {
      id: 2,
      title: 'Data Visualization Dashboards',
      description: 'Created dynamic dashboards using Tableau, Matplotlib, Seaborn, and D3.js to enable actionable insights through user-friendly visual interfaces.',
      link: '#', // Replace with actual GitHub repo link
    },
    {
      id: 3,
      title: 'DevOps Automation for ML Models',
      description: 'Deployed machine learning models using Docker and GitHub workflows. Automated end-to-end ML pipelines using Apache Airflow and MLflow.',
      link: '#', // Replace with actual GitHub repo link
    },
    {
      id: 4,
      title: 'Predictive Machine Learning Models',
      description: 'Built predictive models to analyze relationships between diabetes, high blood pressure, gender, and anemia, utilizing scikit-learn and TensorFlow for model development.',
      link: '#', // Replace with actual GitHub repo link
    },
    {
      id: 5,
      title: 'Java-Based Data Warehouse',
      description: 'Designed and implemented a Java-based data warehouse for large-scale datasets, including data indexing, querying, and ETL processes.',
      link: '#', // Replace with actual GitHub repo link
    },
    {
      id: 6,
      title: 'Blockchain-Based File Storage',
      description: 'Built a custom blockchain using Go and integrated IPFS for decentralized storage. Deployed smart contracts with Solidity using Ganache, Truffle, and MetaMask.',
      link: '#', // Replace with actual GitHub repo link
    },
    {
      id: 7,
      title: 'Full-Stack Web Application (Express.js)',
      description: 'Engineered a scalable backend system using Express.js and microservices following MVC architecture. Integrated RESTful APIs with MongoDB, MySQL; containerized deployment using Docker and GitLab CI/CD.',
      link: '#', // Replace with actual GitHub repo link
    },
  ];

  // Function to fetch GitHub repositories
  const fetchGitHubRepos = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`); // Fetch up to 100 repos
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }
      const data = await response.json();
      return data.map(repo => ({
        id: repo.id,
        title: repo.name,
        description: repo.description || 'No description provided.',
        link: repo.html_url,
      }));
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      setGithubError('Failed to load GitHub repositories. Displaying fallback projects.');
      return fallbackProjects; // Return fallback projects on error
    } finally {
      setLoadingGithubProjects(false);
    }
  };

  // useEffect to fetch GitHub repositories on component mount
  useEffect(() => {
    const username = 'salarsalarsalar'; // Your GitHub username
    fetchGitHubRepos(username).then(repos => {
      setGithubProjects(repos);
    });
  }, []); // Empty dependency array means this runs once on mount

  // Handle clicks outside of expanded image cards to collapse them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (expandedImageId !== null && !event.target.closest('.portfolio-item')) {
        setExpandedImageId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [expandedImageId]);

  // Scroll Reveal for About section
  const [aboutRef, aboutIsVisible] = useScrollReveal({ threshold: 0.1 });
  const [educationRef, educationIsVisible] = useScrollReveal({ threshold: 0.1 });
  const [workRef, workIsVisible] = useScrollReveal({ threshold: 0.1 });
  const [volunteerRef, volunteerIsVisible] = useScrollReveal({ threshold: 0.1 });

  // Scroll Reveal for Skills section
  const [skillsRef, skillsIsVisible] = useScrollReveal({ threshold: 0.1 });

  // The main App component render
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter">
      {/* Navigation Bar */}
      <nav className="fixed w-full bg-gray-800 bg-opacity-90 z-20 shadow-lg py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-teal-400">Salar Ahmed</a>
          <div className="flex space-x-6 md:space-x-8">
            <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-teal-400 transition duration-300">About</button>
            <button onClick={() => scrollToSection('skills')} className="text-gray-300 hover:text-teal-400 transition duration-300">Skills</button>
            <button onClick={() => scrollToSection('portfolio')} className="text-gray-300 hover:text-teal-400 transition duration-300">Portfolio</button>
            <button onClick={() => scrollToSection('projects')} className="text-gray-300 hover:text-teal-400 transition duration-300">Projects</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-teal-400 transition duration-300">Contact</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-center px-4 pt-24">
        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-white p-6 bg-gray-900 bg-opacity-70 rounded-lg shadow-xl">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
            Hi, I'm <span className="text-teal-400">Salar Ahmed</span>
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-gray-300 mb-8">
            Results-driven <span className="text-purple-300">Data Scientist</span> with a solid foundation in machine learning, data visualization, and full-stack development.
          </p>
          <p className="text-lg text-gray-400 mb-10">
            Skilled in deploying data-centric solutions to support strategic decision-making. Adept at using a diverse tech stack and DevOps tools. Passionate about continuous learning, research, and delivering impactful insights.
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <a href="https://github.com/salarsalarsalar" target="_blank" rel="noopener noreferrer" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              GitHub Profile
            </a>
            <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              LinkedIn Profile
            </a>
          </div>
          <button
            onClick={() => scrollToSection('contact')}
            className="mt-6 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
          >
            Contact Me
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-800 relative overflow-hidden">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-teal-400 mb-12">About Me</h2>
          
          {/* Scroll Reveal Icons for About Section */}
          <div ref={aboutRef} className="absolute inset-0 z-0 pointer-events-none">
            <span className={`absolute top-1/4 left-1/4 text-5xl opacity-0 transform -translate-x-1/2 -translate-y-1/2 ${aboutIsVisible ? 'animate-fade-in-up-delay-1' : ''}`}>💻</span>
            <span className={`absolute top-3/4 right-1/4 text-6xl opacity-0 transform translate-x-1/2 translate-y-1/2 ${aboutIsVisible ? 'animate-fade-in-up-delay-2' : ''}`}>📈</span>
            <span className={`absolute bottom-1/4 left-1/2 text-4xl opacity-0 transform -translate-x-1/2 translate-y-1/2 ${aboutIsVisible ? 'animate-fade-in-up-delay-3' : ''}`}>🧠</span>
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-start">
            <div ref={educationRef} className={`transition-all duration-700 ${educationIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-3xl font-semibold text-white mb-6">Education</h3>
              <div className="bg-gray-700 p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-xl font-bold text-gray-200">Bachelor of Science: Data Science</h4>
                <p className="text-gray-400">Fast University</p>
                <p className="text-gray-500 text-sm">January 2020 – February 2025</p>
              </div>
            </div>
            <div ref={workRef} className={`transition-all duration-700 delay-100 ${workIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-3xl font-semibold text-white mb-6">Work Experience</h3>
              <div className="bg-gray-700 p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-xl font-bold text-gray-200">Internship: AKSA-SDS</h4>
                <p className="text-gray-400">19 March 2025 – 15 July 2025</p>
                <p className="text-gray-300 mt-2">Worked on technologies like Node.js, JavaScript, and Express.js, advancing in web development by making web APIs for an IOT-based web project.</p>
              </div>
            </div>
          </div>
          <div ref={volunteerRef} className={`relative z-10 mt-12 transition-all duration-700 delay-200 ${volunteerIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-3xl font-semibold text-white mb-6 text-center">Volunteer Experience</h3>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
              <h4 className="text-xl font-bold text-gray-200">Volunteer Teacher: Orphan Home - Islamabad, Pakistan</h4>
              <p className="text-gray-400">Taught core academic subjects to middle school students. Designed interactive lesson plans to support diverse learning styles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-teal-400 mb-12">My Skills</h2>

          {/* Scroll Reveal Icons for Skills Section */}
          <div ref={skillsRef} className="absolute inset-0 z-0 pointer-events-none">
            <span className={`absolute top-1/4 right-1/4 text-5xl opacity-0 transform translate-x-1/2 -translate-y-1/2 ${skillsIsVisible ? 'animate-fade-in-up-delay-1' : ''}`}>🛠️</span>
            <span className={`absolute bottom-1/3 left-1/3 text-6xl opacity-0 transform -translate-x-1/2 translate-y-1/2 ${skillsIsVisible ? 'animate-fade-in-up-delay-2' : ''}`}>☁️</span>
            <span className={`absolute top-1/2 left-[5%] text-4xl opacity-0 transform translate-x-1/2 -translate-y-1/2 ${skillsIsVisible ? 'animate-fade-in-up-delay-3' : ''}`}>🌐</span>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { category: 'Programming Languages', items: ['Python', 'JavaScript', 'R', 'Golang', 'Solidity', 'C', 'C++'] },
              { category: 'Data Visualization', items: ['Tableau', 'matplotlib', 'seaborn', 'D3.js'] },
              { category: 'Machine Learning', items: ['scikit-learn', 'TensorFlow'] },
              { category: 'DevOps', items: ['Docker', 'GitHub', 'Apache Airflow', 'MLflow'] },
              { category: 'Web Development', items: ['Express.js', 'Flask', 'React'] },
              { category: 'Databases', items: ['SQL', 'MySQL', 'NoSQL', 'MongoDB'] },
              { category: 'Blockchain & Cryptocurrency', items: ['MetaMask', 'Ganache', 'Remix', 'Web3.js', 'Truffle'] },
              { category: 'Soft Skills', items: ['Effective Communication', 'Problem-solving', 'Adaptability', 'Community Engagement'] },
            ].map((skillCategory, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 transform hover:scale-105 transition duration-300">
                <h3 className="text-2xl font-semibold text-purple-300 mb-4">{skillCategory.category}</h3>
                {/* Changed text-gray-300 on ul to text-gray-300 text-lg on li for bigger font */}
                <ul className="list-disc list-inside">
                  {skillCategory.items.map((item, i) => (
                    <li key={i} className="mb-2 flex items-center justify-between text-gray-300 text-lg">
                      <span><span className="text-teal-400 text-lg mr-2">&bull;</span> {item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-teal-400 mb-12">My Portfolio</h2>
          <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
            Below are some visual examples from my portfolio. Click on an image to learn more!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {portfolioImages.map((image) => (
              <div
                key={image.id}
                className={`
                  bg-gray-700 rounded-lg shadow-lg overflow-hidden cursor-pointer
                  transform transition-all duration-300
                  ${expandedImageId === image.id ? 'scale-105 ring-4 ring-teal-500 bg-gray-600' : 'hover:scale-105'}
                  portfolio-item // Added for click-outside detection
                `}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent document click from immediately closing
                  setExpandedImageId(expandedImageId === image.id ? null : image.id);
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 object-cover object-center"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/000000?text=Image+Not+Found"; }}
                />
                <div className="p-4">
                  <p className="text-gray-200 text-lg font-medium">{image.alt}</p>
                </div>

                {/* Expanded info section */}
                <div
                  className={`
                    transition-all duration-500 ease-in-out overflow-hidden
                    ${expandedImageId === image.id ? 'max-h-96 opacity-100 p-4 pt-0' : 'max-h-0 opacity-0'}
                  `}
                >
                  <p className="text-gray-300 text-sm">
                    {image.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section (GitHub Repos) */}
      <section id="projects" className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-teal-400 mb-12">My Projects</h2>
          {githubError && (
            <p className="text-center text-red-400 mb-4">{githubError}</p>
          )}
          {loadingGithubProjects ? (
            <p className="text-center text-gray-300">Loading GitHub repositories...</p>
          ) : (
            <>
              <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
                These are my public GitHub repositories. Click on a project to view it on GitHub.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(githubProjects.length > 0 ? githubProjects : fallbackProjects).map((project) => (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" key={project.id} className="block">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 h-full flex flex-col justify-between transform hover:scale-105 transition duration-300">
                      <div>
                        <h3 className="text-2xl font-semibold text-white mb-3">{project.title}</h3>
                        <p className="text-gray-300 mb-4">
                          {project.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-teal-400 hover:underline">View Project &rarr;</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-teal-400 mb-12">Get in Touch</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg flex items-center space-x-4 max-w-md w-full">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 2a2 2 0 00-2 2v4a2 2 0 01-2 2H7a2 2 0 01-2-2v-4a2 2 0 00-2-2"></path></svg>
              <p className="text-gray-200 text-xl">salarahmed9876@gmail.com</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg flex items-center space-x-4 max-w-md w-full">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
              <p className="text-gray-200 text-xl">+92 349 1057973</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-4 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Salar Ahmed. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://github.com/salarsalarsalar" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">GitHub</a>
          <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">LinkedIn</a>
          {/* Add more social links as needed */}
        </div>
      </footer>
    </div>
  );
};

export default App;
