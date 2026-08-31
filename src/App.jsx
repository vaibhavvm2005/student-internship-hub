import { useState } from "react";
import "./App.css";

const internships = [
  {
    id: 1,
    company: "TechNova",
    role: "Data Science Intern",
    location: "Bengaluru",
    type: "Hybrid",
    duration: "3 Months",
    stipend: "₹15,000/month",
    skills: ["Python", "SQL", "Machine Learning"],
  },
  {
    id: 2,
    company: "AI Labs",
    role: "AI/ML Intern",
    location: "Remote",
    type: "Remote",
    duration: "6 Months",
    stipend: "₹20,000/month",
    skills: ["Python", "TensorFlow", "Machine Learning"],
  },
  {
    id: 3,
    company: "WebWorks",
    role: "Frontend Developer Intern",
    location: "Hyderabad",
    type: "On-site",
    duration: "3 Months",
    stipend: "₹12,000/month",
    skills: ["React", "JavaScript", "CSS"],
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

const filteredInternships = internships.filter((internship) => {
  const matchesSearch =
    `${internship.role} ${internship.company} ${internship.location}`
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesLocation =
    locationFilter === "All" ||
    internship.location === locationFilter;

  const matchesType =
    typeFilter === "All" ||
    internship.type === typeFilter;

  return matchesSearch && matchesLocation && matchesType;
});

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">InternHub</div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#internships">Internships</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <p className="eyebrow">YOUR CAREER STARTS HERE</p>

        <h1>
          Find your next
          <span> internship.</span>
        </h1>

        <p className="hero-text">
          Discover internships, build your skills, and take the first step
          toward your career.
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search internships, skills or companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button>Search</button>
        </div>
        <div className="filters">
  <select
    value={locationFilter}
    onChange={(e) => setLocationFilter(e.target.value)}
  >
    <option value="All">All Locations</option>
    <option value="Bengaluru">Bengaluru</option>
    <option value="Hyderabad">Hyderabad</option>
    <option value="Remote">Remote</option>
  </select>

  <select
    value={typeFilter}
    onChange={(e) => setTypeFilter(e.target.value)}
  >
    <option value="All">All Work Types</option>
    <option value="Remote">Remote</option>
    <option value="Hybrid">Hybrid</option>
    <option value="On-site">On-site</option>
  </select>
</div>
      </section>

      <section className="internships" id="internships">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OPPORTUNITIES</p>
            <h2>Latest internships</h2>
          </div>

          <span>{filteredInternships.length} opportunities</span>
        </div>

        <div className="internship-grid">
          {filteredInternships.map((internship) => (
            <article className="internship-card" key={internship.id}>
              <div className="company-icon">
                {internship.company.charAt(0)}
              </div>

              <p className="company">{internship.company}</p>

              <h3>{internship.role}</h3>

              <div className="details">
                <span>📍 {internship.location}</span>
                <span>💼 {internship.type}</span>
                <span>⏳ {internship.duration}</span>
              </div>

              <div className="skills">
                {internship.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              <div className="card-bottom">
                <strong>{internship.stipend}</strong>
                <button>Apply Now</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <p className="eyebrow">ABOUT INTERNHUB</p>

        <h2>Helping students find opportunities.</h2>

        <p>
          InternHub is an open-source platform designed to make internship
          discovery easier for students.
        </p>
      </section>

      <footer>
        <strong>InternHub</strong>
        <p>Built for students, by the community.</p>
      </footer>
    </div>
  );
}

export default App;