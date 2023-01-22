import React from 'react';
import smiley from '../../../images/smiley.png';
import { NavLink } from 'react-router-dom';

const DisplayProject = ({ setDisplayHover, index, displayHover, project, isMobile }) => {
  console.log(project)
  return (
      <div
        onMouseEnter={() => setDisplayHover(index + 1)}
        onMouseLeave={() => setDisplayHover(0)}
        className='organization-project-container'
        style={{ height: '30rem'}}
      >
        <NavLink to={"/detailsProject/" + project.id }>
          {(isMobile || displayHover === index + 1) &&
            <div className={`hover-container ${displayHover === index + 1 ? 'hover-open' : ''}`}>
              <p className='font-bold mb-8'>{project ? project.name : 'Un joli hoover'}</p>
              <p>{
                project ? project.description :
                `C'est l'histoire d'un joli hoover, il était petit et donc pas très grand. Mais un jour il décida de se relevé et devenir un grand hoover!
                C'est pour cela qu'il décida de grandir et donc d'être grand. Merci d'avoir perdu du temps à lire ce hoover, bisous!`
              }</p>
            </div>
          }

          <img
            src={project.images ? `/images/${project.images[project.images.length - 1].name}` : `/images/luffy's flag.jpg`}
            alt="Sélection du projet"
          />
        </NavLink>


      </div>
    );
};

export default DisplayProject;