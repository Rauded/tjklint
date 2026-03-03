import { ResumeData } from './resumetypes';
import resumeData from '../../data/resume.json';
import './resume.scss';
import VisualAid from './visualaid';
import cvPdf from '../../assets/resume/EduardHvizdakCV.pdf';

const Resume: React.FC = () => {
  const data: ResumeData = resumeData;

  return (
    <div className="resume-container" id="resume">
      <div className="content-wrapper">
        <div className="left-column">
          {data.sections
            .filter((section) => section.title !== 'Education')
            .map((section) => (
              <VisualAid key={section.title} section={section} />
            ))}
          {/* Education section commented out
          {data.sections
            .filter((section) => section.title === 'Education')
            .map((section) => (
              <VisualAid key={section.title} section={section} />
            ))}
          */}
        </div>
        <div className="right-column">
          <iframe
            title="Eduard Hvižďák Resume"
            src={cvPdf}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Resume;
