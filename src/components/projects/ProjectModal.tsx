import React, { useEffect, useCallback } from 'react';
import { FaGithub, FaGlobe, FaChrome, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import './ProjectModal.scss';

interface ExternalLink {
    label: string;
    url: string;
    icon: string;
}

interface Project {
    id: string;
    title: string;
    description: string;
    image: string | null;
    featured: boolean;
    category: 'big' | 'small';
    technologies: {
        languages: string[];
        frameworks: string[];
        libraries: string[];
    };
    tags: string[];
    links: {
        github: string | null;
        demo: string | null;
    };
    blogContent: string;
    screenshots: string[];
    externalLinks: ExternalLink[];
}

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

// Import all screenshots dynamically
const screenshotImports: { [key: string]: string } = {};
const importAll = (r: any) => {
    r.keys().forEach((key: string) => {
        const filename = key.replace('./', '');
        screenshotImports[filename] = r(key);
    });
};

try {
    // @ts-ignore
    importAll(require.context('../../assets/projects', false, /\.(png|jpe?g|gif|webp)$/));
} catch (e) {
    // Assets directory may not exist yet
}

const getIcon = (iconName: string) => {
    switch (iconName) {
        case 'github': return <FaGithub />;
        case 'store': return <FaChrome />;
        case 'demo': return <FaGlobe />;
        default: return <FaExternalLinkAlt />;
    }
};

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        if (project) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [project, handleKeyDown]);

    if (!project) return null;

    const paragraphs = project.blogContent.split('\n\n');
    const allTech = [
        ...project.technologies.languages,
        ...project.technologies.frameworks,
        ...project.technologies.libraries,
    ];

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close modal">
                    <FaTimes />
                </button>

                <div className="modal-scroll-area">
                    {/* Header */}
                    <div className="modal-header">
                        <h2 className="modal-title">{project.title}</h2>
                        <div className="modal-tags">
                            {project.tags.map((tag, i) => (
                                <span key={i} className="modal-tag">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Screenshots Gallery */}
                    {project.screenshots.length > 0 && (
                        <div className="modal-screenshots">
                            <div className="screenshots-track">
                                {project.screenshots.map((filename, i) => (
                                    <div key={i} className="screenshot-item">
                                        <img
                                            src={screenshotImports[filename]}
                                            alt={`${project.title} screenshot ${i + 1}`}
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Blog Content */}
                    <div className="modal-body">
                        {paragraphs.map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>

                    {/* Technologies */}
                    <div className="modal-tech-section">
                        <h3>Technologies Used</h3>
                        <div className="modal-tech-items">
                            {allTech.map((tech, i) => (
                                <span key={i} className="modal-tech-item">{tech}</span>
                            ))}
                        </div>
                    </div>

                    {/* External Links */}
                    <div className="modal-links-section">
                        {project.externalLinks.map((link, i) => (
                            <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="modal-link-button"
                            >
                                {getIcon(link.icon)}
                                <span>{link.label}</span>
                            </a>
                        ))}
                        {project.links.demo && (
                            <a
                                href={project.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="modal-link-button demo"
                            >
                                <FaGlobe />
                                <span>Live Demo</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
