import React, { useState, useEffect } from 'react';

// Main App Component
const App = () => {
  // State for smooth scrolling
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Portfolio images - Using placeholders. Replace these with your actual image URLs!
  const portfolioImages = Array.from({ length: 36 }, (_, i) => ({
    id: i + 1,
    src: `https://placehold.co/600x400/34D399/FFFFFF?text=Portfolio+Image+${i + 1}`, // Example placeholder
    alt: `Portfolio Image ${i + 1}`,
  }));

  // Projects data (from resume) - You'll replace this with GitHub fetched data
  const projects = [
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

  // Function to fetch GitHub repositories - Requires user's GitHub username
  const fetchGitHubRepos = async (username) => {
    // You'll need to replace 'YOUR_GITHUB_USERNAME' with the user's actual username.
    // For now, this function is illustrative and won't be called without user input.
    if (!username) return [];
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
      // Fallback to local projects if fetching fails
      return projects;
    }
  };

  // The main App component render
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter">
      {/*
        NOTE FOR TAILWIND CSS V4:
        - The Tailwind CSS CDN script is no longer needed as you're using a local installation.
        - The meta viewport tag should be in your public/index.html file (which Create React App usually includes).
        - The font link can be moved to public/index.html or imported in src/index.css via @import rule.
      */}

      {/* If you want to keep the font import here, ensure it's loaded appropriately
          Otherwise, consider moving it to public/index.html or src/index.css
      */}
      {/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" /> */}

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
      <section id="hero" className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-center px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
            Hi, I'm <span className="text-teal-400">Salar Ahmed</span>
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-gray-300 mb-8">
            Results-driven <span className="text-purple-300">Data Scientist</span> with a solid foundation in machine learning, data visualization, and full-stack development.
          </p>
          <p className="text-lg text-gray-400 mb-10">
            Skilled in deploying data-centric solutions to support strategic decision-making. Adept at using a diverse tech stack and DevOps tools. Passionate about continuous learning, research, and delivering impactful insights.
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <a href="https://github.com/YOUR_GITHUB_USERNAME" target="_blank" rel="noopener noreferrer" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              GitHub Profile
            </a>
            <a href="https://linkedin.com/in/YOUR_LINKEDIN_USERNAME" target="_blank" rel="noopener noreferrer" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
              LinkedIn Profile
            </a>
          </div>
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
          >
            Contact Me
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-teal-400 mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-3xl font-semibold text-white mb-6">Education</h3>
              <div className="bg-gray-700 p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-xl font-bold text-gray-200">Bachelor of Science: Data Science</h4>
                <p className="text-gray-400">Fast University</p>
                <p className="text-gray-500 text-sm">January 2020 – February 2025</p>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-semibold text-white mb-6">Work Experience</h3>
              <div className="bg-gray-700 p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-xl font-bold text-gray-200">Internship: AKSA-SDS</h4>
                <p className="text-gray-400">19 March 2025 – 15 July 2025</p>
                <p className="text-gray-300 mt-2">Worked on technologies like Node.js, JavaScript, and Express.js, advancing in web development by making web APIs for an IOT-based web project.</p>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-3xl font-semibold text-white mb-6 text-center">Volunteer Experience</h3>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
              <h4 className="text-xl font-bold text-gray-200">Volunteer Teacher: Orphan Home - Islamabad, Pakistan</h4>
              <p className="text-gray-400">Taught core academic subjects to middle school students. Designed interactive lesson plans to support diverse learning styles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-teal-400 mb-12">My Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <ul className="list-disc list-inside text-gray-300">
                  {skillCategory.items.map((item, i) => (
                    <li key={i} className="mb-2">
                      <span className="text-teal-400 text-lg mr-2">&bull;</span> {item}
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
            Below are some visual examples from my portfolio. Please note that these are placeholder images. You can replace them with your actual project screenshots or visual outputs!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {portfolioImages.map((image) => (
              <div key={image.id} className="bg-gray-700 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 object-cover object-center"
                  // Fallback for broken images
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/000000?text=Image+Not+Found"; }}
                />
                <div className="p-4">
                  <p className="text-gray-200 text-lg font-medium">{image.alt}</p>
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
          <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
            These are some of the key projects from my resume. To display your actual GitHub repositories dynamically, please update the `fetchGitHubRepos` function with your GitHub username.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <a href={project.link} target="_blank" rel="noopener noreferrer" key={project.id} className="block">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 h-full flex flex-col justify-between transform hover:scale-105 transition duration-300">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-teal-400 hover:underline">View Project &rarr;</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <p className="text-center text-gray-400 mt-12 text-sm">
            Note: For live GitHub repository fetching, uncomment the `fetchGitHubRepos` call in a `useEffect` and provide your GitHub username.
          </p>
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
          <a href="https://github.com/YOUR_GITHUB_USERNAME" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">GitHub</a>
          <a href="https://linkedin.com/in/YOUR_LINKEDIN_USERNAME" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">LinkedIn</a>
          {/* Add more social links as needed */}
        </div>
      </footer>
    </div>
  );
};

export default App;
