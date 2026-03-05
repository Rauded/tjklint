import React from "react";
import "./about.scss";
import myPhoto from "../../assets/about/picture_of_me.jpeg";

const About: React.FC = () => {

  return (
    <div className="about-container" id="about">
      <section className="about-intro">
        <div className="about-text">
          <h2 className="about-title">About Me</h2>
          <p>
            Hello! My name is <span className="purple-text">Eduard Hvižďák</span>.
            I’m an AI developer / programmer from Slovakia, currently based in Brno, Czechia,
            where I’m studying{" "}
            <span className="purple-text">Computer Science at Masaryk University</span>.
          </p>
          <p>
            Currently I am working part-time for <span className="purple-text">Centre for International Cooperation Masaryk University</span>
            . Where I am developing a chatbot for helping students with international
            exchange questions.
          </p>
          <p>
            My work is focused on{" "}
            <span className="purple-text">
              LangChain, RAG pipelines, multi-agent orchestration, and FastAPI backends
            </span>
            . I believe in choosing the right tool for the job and thrive in
            environments where I can move fast, learn on the fly, and ship solutions
            that make a real impact.
          </p>
          <p>
            Beyond my main roles, I’ve worked as an AI Developer at{" "}
            <span className="purple-text">iGalileo</span> (municipal chatbots and
            form-filling agents) and as a Think Tank Member &amp; Programmer at the{" "}
            <span className="purple-text">EDUC Alliance</span>, leading a team
            building a digital campus platform for over 200,000 students across
            10 European universities.
          </p>
          <p>
            Outside of tech, you’ll typically find me reading, travelling,
            exploring new places, and occasionally pretending I understand German.
          </p>
          <p>
            If you want to keep up with my work, connect with me on{" "}
            <a
              href="https://www.linkedin.com/in/eduard-hvizdak"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              LinkedIn
            </a>{" "}
            or check out my projects on{" "}
            <a
              href="https://github.com/Rauded"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <div className="about-photo">
          <img src={myPhoto} alt="Eduard Hvižďák" className="profile-photo" />
        </div>
      </section>
    </div>
  );
};

export default About;
