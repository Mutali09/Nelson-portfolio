import React from 'react';
import './Projects.css';

function Projects() {
  const projectList = [
        {
            title: 'Gym website',
            description: 'Truth Gym website using React js.',
            link: '#'
        },
        {
            title: 'Gym Website',
            description: 'Truth Gym website using React js.',
            link: '#'
        },
        {
            title: 'Gym Website',
            description: 'Truth Gym website using React js.',
            link: '#'
        }
    ];
    
    return (
        <section className='projects' id='projects'>
            <h2>projects</h2>
            <div className='project-cards'>
                {projectList.map((project, index) => (
                    <div className='card' key={index}>
                        <h3>{project.title}</h3>
                        <p>project.description</p>
                        <a href={project.link} target='_blank' rel='noreferrer'>View project</a>

                    </div>
                )
            )}

            </div>

        </section>
    );

}

export default Projects;