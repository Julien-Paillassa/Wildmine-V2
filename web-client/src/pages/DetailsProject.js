import React, { useState } from 'react';
import Carousel, { CarouselItem } from '../components/Carousel';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client";
import { deleteProject, getProjectById } from "../graphql/Project.js";
import smiley from '../images/smiley.png';
import Button from '../components/Button';
import CreateIssue from './components/issues/CreateIssue';
import { deleteIssue, getIssuesByProjectId } from '../graphql/Issue';
import Issues from './Issues';
import AddUserToProject from './components/projects/AddUserToProject';
import UpdateContent from './components/projects/UpdateContent';
import DisplayIssuesTitle from './components/issues/DisplayIssuesTitle';
import DisplayIssuesValues from './components/issues/DisplayIssuesValues';

const DetailsProject = ({ actualUser }) => {
  let { id } = useParams();

  const { loading, error, data, refetch } = useQuery(getProjectById, { variables: { id: parseInt(id) } });

  const issuesQuery = useQuery(getIssuesByProjectId, { variables: { projectId: parseInt(id) } });
  const [displayCreation, setDisplayCreation] = useState(false);
  const [displayAddUserOnProject, setDisplayAddUserOnProject] = useState(false);
  const [displayUpdateContent, setDisplayUpdateContent] = useState(false);
  const { loading: loading1, error: error1, data: data1 } = useQuery(getIssuesByProjectId, { variables: { projectId: parseInt(id) } });

  const [suppressionProject] = useMutation( deleteProject );
  const [suppressionIssue] = useMutation( deleteIssue );

  const onSubmit = (event) => {
		event.preventDefault();

		suppressionProject({
			variables: {
        id: parseInt(id),				
			},        
		});

    data1.getIssuesByProjectId.forEach(issue => {     
      suppressionIssue({
        variables: {
          id: parseInt(issue.id),				
        },        
      });
    });

    window.setTimeout(function () {
      window.location.href = "http://localhost:3000/projects";
    }, 500);
  }

	if (loading) return 'Loading...';

  if (error) return `Error! ${error.message}`;

	if (issuesQuery.loading) return 'Loading...'

  const images = data.getProjectById.images;
  
  return (
    <div className="detail-project-container">
      <div className='flex justify-between mb-4'>
        <div>
          <div className='detail-project-rollback'>
            <NavLink to="/projects">
              Projets
            </NavLink> {'>'} {data.getProjectById.name}
          </div>

          <div className='project-name'>
            <h1>{data.getProjectById.name}</h1>
          </div>

          <div className='project-description'>
            <h2>{ data.getProjectById.description }</h2>
          </div>

          <div className='project-collaborators flex flex-col items-start justify-start'>

            <h3 className="mb-4 mr-4">
              Collaborateurs du projet :
            </h3>
            
            <div className='flex'>
              <ul>
              {data.getProjectById.user_assigned && data.getProjectById.user_assigned.map(collaborator =>
              
                <li>- {collaborator.first_name} {collaborator.last_name}</li>
              
                // <img key={collaborator.id} className="rounded-full h-8 w-8 mx-2" src={collaborator.img} alt="collabo 1"/>
              )}
              </ul>
            </div>

          </div>
        </div>

        <div className='flex flex-col justify-around'>
        
          <Button
            onClick={setDisplayCreation}
            onClickValue={displayCreation}
            buttonLabel='Créer un ticket'
            buttonType='button'
          />

          <Button
            onClick={setDisplayAddUserOnProject}
            onClickValue={displayAddUserOnProject}
            buttonLabel='Ajouter un collaborateur'
            buttonType='button'
          />

        </div>

        <div className="text-center">
            <Button
              onClick={setDisplayUpdateContent}
              onClickValue={displayUpdateContent}
              buttonLabel='Modifier'
              buttonType='button'
              buttonClassName='my-auto'
            />
            {displayUpdateContent &&
              <UpdateContent setDisplayUpdateContent={setDisplayUpdateContent} project={data.getProjectById}/>
            }
      </div>

        {displayCreation &&
          <CreateIssue
            setDisplayCreation={setDisplayCreation}
            projectName={data.getProjectById.name}
            projectId={data.getProjectById.id}
            userId={actualUser.id}
            refetch={() => refetch()}
          />
        }

        {displayAddUserOnProject &&
          <AddUserToProject
            setDisplayAddUserOnProject={setDisplayAddUserOnProject}
            projectId={data.getProjectById.id}
            refetch={() => refetch()}
          />
        }

      </div>

      <Carousel>

          <CarouselItem>
            <img
              key="image"
              className="object-none object-center"
              src={`/images/${images[0].name}`}
              alt="Projet"
            />
          </CarouselItem>
      </Carousel>
      
      {!loading1 && data1.getIssuesByProjectId[0] && !error
        ? <div>
            <p className='font-black text-2xl pt-20'>Tickets en cours</p>
            <DisplayIssuesTitle/>
            <div>
              {data1.getIssuesByProjectId
                ? data1.getIssuesByProjectId.map((issue) => (
                  <NavLink to={`/issue/${issue.id}`}>
                    <DisplayIssuesValues  issue={issue} issues={data1.getIssuesByProjectId}/>
                  </NavLink>
                ))
                : <p className='text-xl font-bold'>Aucun ticket ne vous est assigné pour le moment</p>
              }
            </div>
        </div>
        : <p className='mx-auto text-xl font-bold tracking-wide py-20'>Aucun ticket associé à ce projet pour le moment</p>
      }
      <form onSubmit={onSubmit} className="w-2/3 mx-auto">
        <div className="text-center">
          <button className="submit-button mb-8 mt-4">Supprimer le projet</button>
        </div>
      </form>
    </div>
  );
}

export default DetailsProject;
