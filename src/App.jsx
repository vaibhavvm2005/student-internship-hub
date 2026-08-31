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
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [locationFilter, setLocationFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [savedInternships, setSavedInternships] = useState([]);

  // Search function
  const handleSearch = () => {
    setSearch(searchInput.trim());
  };

  // Search when pressing Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Filter internships
  const filteredInternships = internships.filter((internship) => {
    const searchText = [
      internship.company,
      internship.role,
      internship.location,
      internship.type,
      internship.duration,
      internship.stipend,
      ...internship.skills,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchText.includes(search.toLowerCase());

    const matchesLocation =
      locationFilter === "All" ||
      internship.location === locationFilter;

    const matchesType =
      typeFilter === "All" ||
      internship.type === typeFilter;

    return matchesSearch && matchesLocation && matchesType;
  });

  // Save / unsave internship
  const toggleSave = (id) => {
    setSavedInternships((current) => {
      if (current.includes(id)) {
        return current.filter((savedId) => savedId !== id);
      }

      return [...current, id];
    });
  };

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">InternHub</div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#internships">Internships</a>
          <a href="#about">About</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">

        <p className="eyebrow">
          YOUR CAREER STARTS HERE
        </p>

        <h1>
          Find your next
          <span> internship.</span>
        </h1>

        <p className="hero-text">
          Discover internships, build your skills, and take the
          first step toward your career.
        </p>

        {/* Search */}
        <div className="search-box">

          <input
            type="text"
            placeholder="Search internships, skills or companies..."
            value={searchInput}
            onChange={(event) =>
              setSearchInput(event.target.value)
            }
            onKeyDown={handleKeyDown}
          />

          <button
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>

        </div>

        {/* Filters */}
        <div className="filters">

          <select
            value={locationFilter}
            onChange={(event) =>
              setLocationFilter(event.target.value)
            }
          >
            <option value="All">
              All Locations
            </option>

            <option value="Bengaluru">
              Bengaluru
            </option>

            <option value="Hyderabad">
              Hyderabad
            </option>

            <option value="Remote">
              Remote
            </option>
          </select>

          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(event.target.value)
            }
          >
            <option value="All">
              All Work Types
            </option>

            <option value="Remote">
              Remote
            </option>

            <option value="Hybrid">
              Hybrid
            </option>

            <option value="On-site">
              On-site
            </option>
          </select>

        </div>
      </section>

      {/* Internship Section */}
      <section
        className="internships"
        id="internships"
      >

        <div className="section-heading">

          <div>
            <p className="eyebrow">
              OPPORTUNITIES
            </p>

            <h2>
              Latest internships
            </h2>
          </div>

          <span>
            {filteredInternships.length} opportunities
            {" · "}
            {savedInternships.length} saved
          </span>

        </div>

        {/* Internship Cards */}
        <div className="internship-grid">

          {filteredInternships.length > 0 ? (

            filteredInternships.map((internship) => {

              const isSaved =
                savedInternships.includes(
                  internship.id
                );

              return (
                <article
                  className="internship-card"
                  key={internship.id}
                >

                  {/* Save Button */}
                  <button
                    type="button"
                    className={`save-button ${
                      isSaved ? "saved" : ""
                    }`}
                    onClick={() =>
                      toggleSave(internship.id)
                    }
                    aria-label={
                      isSaved
                        ? "Remove saved internship"
                        : "Save internship"
                    }
                  >
                    {isSaved ? "♥" : "♡"}
                  </button>

                  {/* Company Icon */}
                  <div className="company-icon">
                    {internship.company.charAt(0)}
                  </div>

                  {/* Company */}
                  <p className="company">
                    {internship.company}
                  </p>

                  {/* Role */}
                  <h3>
                    {internship.role}
                  </h3>

                  {/* Details */}
                  <div className="details">

                    <span>
                      📍 {internship.location}
                    </span>

                    <span>
                      💼 {internship.type}
                    </span>

                    <span>
                      ⏳ {internship.duration}
                    </span>

                  </div>

                  {/* Skills */}
                  <div className="skills">

                    {internship.skills.map(
                      (skill) => (
                        <span key={skill}>
                          {skill}
                        </span>
                      )
                    )}

                  </div>

                  {/* Card Bottom */}
                  <div className="card-bottom">

                    <strong>
                      {internship.stipend}
                    </strong>

                    <button type="button">
                      Apply Now
                    </button>

                  </div>

                </article>
              );
            })

          ) : (

            <div className="no-results">

              <h3>
                No internships found
              </h3>

              <p>
                Try another keyword or change
                your filters.
              </p>

            </div>

          )}

        </div>
      </section>

      {/* About */}
      <section
        className="about"
        id="about"
      >

        <p className="eyebrow">
          ABOUT INTERNHUB
        </p>

        <h2>
          Helping students find opportunities.
        </h2>

        <p>
          InternHub is an open-source platform
          designed to make internship discovery
          easier for students.
        </p>

      </section>

      {/* Footer */}
      <footer>

        <strong>
          InternHub
        </strong>

        <p>
          Built for students, by the community.
        </p>

      </footer>

    </div>
  );
}

export default App;