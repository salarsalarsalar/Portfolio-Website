# Salar Ahmed's Data Science & Full-Stack Portfolio

![Portfolio Screenshot](public/website_screenshot.png)


A dynamic and modern portfolio website showcasing my expertise in Data Science, Machine Learning, Data Visualization, and Full-Stack Development. This interactive platform features dynamically loaded GitHub projects, an expandable portfolio image gallery, and engaging scroll-reveal animations.

## Live Demo

Explore the live version of my portfolio deployed on Vercel:
👉 [https://my-portfolio-m4elqliu4-salar-ahmeds-projects.vercel.app/](https://my-portfolio-m4elqliu4-salar-ahmeds-projects.vercel.app/)

## Features

* **Professional Summary:** An overview of my skills and professional background.
* **Education & Experience:** Details of my academic background and work experience.
* **Comprehensive Skills Section:** Categorized list of programming languages, data visualization tools, machine learning frameworks, DevOps tools, web development technologies, databases, and blockchain tools.
* **Dynamic GitHub Projects:** Fetches and displays public repositories directly from my GitHub profile (`salarsalarsalar`), providing up-to-date project showcases. Includes fallback projects if fetching fails.
* **Interactive Portfolio Gallery:** Displays 36 portfolio images with unique descriptions. Clicking an image expands it to reveal more details with a smooth transition. Clicking outside collapses the expanded image.
* **Engaging Scroll Reveal Animations:** Small computer and data science-related icons subtly fade and slide into view as you scroll through the "About" and "Skills" sections, adding a modern and interactive feel.
* **Responsive Design:** Optimized for seamless viewing and interaction across various devices (desktop, tablet, mobile).
* **Contact Section:** Easy access to my contact information.

## Technologies Used

This project is built with:

* **React.js:** A JavaScript library for building user interfaces.
* **Tailwind CSS v4 (Alpha/Beta):** A utility-first CSS framework for rapid UI development, configured via PostCSS.
* **JavaScript (ES6+):** For all interactive functionalities.
* **HTML5 & CSS3:** For structuring and styling the content.
* **GitHub API:** Used to fetch public repository data.
* **Intersection Observer API:** For implementing scroll-reveal animations without external libraries.

## Setup and Local Development

To run this project on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/salarsalarsalar/my-portfolio.git](https://github.com/salarsalarsalar/my-portfolio.git) # Replace with your actual repo URL
    cd my-portfolio
    ```

2.  **Install dependencies:**
    This project uses Tailwind CSS v4 which requires specific setup.
    ```bash
    npm install
    npm install -D tailwindcss@next @tailwindcss/postcss postcss autoprefixer
    ```

3.  **Ensure PostCSS Configuration:**
    Create a `postcss.config.js` file in the root of your project (next to `package.json`) with the following content:
    ```javascript
    // postcss.config.js
    module.exports = {
      plugins: {
        '@tailwindcss/postcss': {},
        autoprefixer: {},
      },
    };
    ```

4.  **Verify Main CSS File:**
    Ensure your `src/index.css` file starts with the following import:
    ```css
    @import "tailwindcss";
    /* Your other global styles below */
    ```
    Also, add the custom keyframe animations required for the scroll reveal effect to `src/index.css`:
    ```css
    /* Custom Keyframes for Scroll Reveal */
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fade-in-up-delay-1 { /* ... same as above ... */ }
    @keyframes fade-in-up-delay-2 { /* ... same as above ... */ }
    @keyframes fade-in-up-delay-3 { /* ... same as above ... */ }
    /* Ensure you have proper animation properties defined in tailwind.config.js if not directly in index.css */
    ```

5.  **Place Portfolio Images:**
    Create a folder named `Portfolio_images` inside the `public` directory (`public/Portfolio_images/`). Place your images (named `image (1).png`, `image (2).png`, etc.) inside this folder.

6.  **Start the development server:**
    ```bash
    npm start
    ```
    The application will open in your browser at `http://localhost:3000`.

## Deployment

This project is configured for easy deployment with [Vercel](https://vercel.com/).

1.  Push your code to a GitHub (or GitLab/Bitbucket) repository.
2.  Log in to Vercel and select "New Project".
3.  Import your repository. Vercel will automatically detect the React framework and set up the build process.
4.  Click "Deploy" to publish your portfolio online!

## Contact

Feel free to reach out to me:

* **Email:** salarahmed9876@gmail.com
* **GitHub:** [https://github.com/salarsalarsalar](https://github.com/salarsalarsalar)
* **LinkedIn:** (Add your LinkedIn profile URL here)