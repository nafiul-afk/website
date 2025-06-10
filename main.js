// app/page.js
import Link from 'next/link';

function Header() {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Nafiul Islam</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Nafiul Islam. All rights reserved.</p>
      </div>
    </footer>
  );
}

function ProjectCard({ title, description, imageUrl, link }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-md mb-2" />
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View Project
      </a>
    </div>
  );
}

export default function Home() {
  const projects = [
    {
      title: 'Project 1',
      description: 'Description of project 1.',
      imageUrl: 'https://via.placeholder.com/400x300',
      link: '#',
    },
    {
      title: 'Project 2',
      description: 'Description of project 2.',
      imageUrl: 'https://via.placeholder.com/400x300',
      link: '#',
    },
  ];

  return (
    <div>
      <Header />
      <main className="container mx-auto py-8">
        {/* Home Section */}
        <section id="home" className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Hello, I'm Nafiul Islam</h1>
          <p className="text-lg text-gray-700">
            Welcome to my digital space! I'm a passionate data science student at United International University.
          </p>
        </section>

        {/* About Section */}
        <section id="about" className="mb-8">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-gray-700">
            I'm a data science student at United International University, passionate about machine learning and artificial intelligence.
          </p>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
          <p className="text-lg text-gray-700">
            You can reach me at: <a href="mailto:your.email@example.com">your.email@example.com</a>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
