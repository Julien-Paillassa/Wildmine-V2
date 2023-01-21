import React, { useState } from 'react';
import Carousel, { CarouselItem } from '../components/Carousel';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client";
import { deleteProject, getProjectById } from "../graphql/Project.js";
import smiley from '../images/smiley.png';
import Button from '../components/Button';
import CreateIssue from './components/issues/CreateIssue';
import { getIssuesByProjectId } from '../graphql/Issue';
import Issues from './Issues';
import AddUserToProject from './components/projects/AddUserToProject';
import UpdateContent from './components/projects/UpdateContent';

const imagesProject = [
	{ id: 1, url: 'https://www.consoglobe.com/wp-content/uploads/2015/12/concours-animaux-sauvages-drole-1.jpg.webp' },
	{
		id: 2,
		url: 'https://www.consoglobe.com/wp-content/uploads/2015/12/concours-photo-animaux-sauavge-drole-6.jpg.webp',
	},
	{
		id: 3,
		url: 'https://www.consoglobe.com/wp-content/uploads/2015/12/concours-photo-animaux-sauvages-drole-8.jpg.webp',
	},
	{ id: 4, url: 'https://www.buzzwebzine.fr/wp-content/uploads/2017/02/animaux-selfie-01.jpg' },
	{
		id: 5,
		url: 'https://i-mom.unimedias.fr/2020/09/16/les-photos-d-animaux-les-plus-droles-de-l-annee.jpg?auto=format%2Ccompress&crop=faces&cs=tinysrgb&fit=crop&h=675&w=1200',
	},
];

const collaboratorsProject = [
	{
		id: 1,
		img: 'https://cdn.futura-sciences.com/buildsv6/images/largeoriginal/d/9/a/d9a1058910_50163142_elon-musk1.jpg',
	},
	{
		id: 2,
		img: 'https://img-0.journaldunet.com/PujDkZ9YAmFXrZxdCBLKNgiEnRg=/1500x/smart/45776488e7eb4b8080d4ad6e0da4bd74/ccmcms-jdn/11517282.jpg',
	},
	{
		id: 3,
		img: 'https://img-0.journaldunet.com/qFp6OxCIE6wbPymheqNsAcTShUo=/1500x/smart/7cfa455788b7461ea1782b0b72e31c8f/ccmcms-jdn/2383369.jpg',
	},
	{ id: 4, img: 'https://planete.lesechos.fr/wp-content/uploads/2021/02/Mav-1-itv-gates-scaled.jpg' },
	{
		id: 5,
		img: 'https://resize-elle.ladmedia.fr/rcrop/796,1024/img/var/plain_site/storage/images/loisirs/livres/news/la-biographie-de-steve-jobs-paraitra-plus-tot-que-prevu-1755076/19393192-1-fre-FR/La-biographie-de-Steve-Jobs-paraitra-plus-tot-que-prevu.jpg',
	},
];


const DetailsProject = ({ actualUser }) => {
  const [displayCreation, setDisplayCreation] = useState(false);
  const [displayAddUserOnProject, setDisplayAddUserOnProject] = useState(false);
  const [showFiveTickets, setShowFiveTickets] = useState(false);
  const [displayUpdateContent, setDisplayUpdateContent] = useState(false);

  let { id } = useParams();

  const { loading, error, data, refetch } = useQuery(getProjectById, { variables: { id: parseInt(id) } });

  const issuesQuery = useQuery(getIssuesByProjectId, { variables: { projectId: parseInt(id) } });

  const [suppression] = useMutation( deleteProject );

  const onSubmit = (event) => {
		event.preventDefault();
    console.log(parseInt(id))

		suppression({
			variables: {
        id: parseInt(id),				
			},        
		});
    window.setTimeout(function () {
      window.location.href = "http://localhost:3000/projects";
    }, 500);
  }

	if (error) return `Error! ${error.message}`;

	if (loading) return <div className='mx-auto'>Charngement ...</div>

	if (issuesQuery.loading) return <div className='mx-auto'>Charngement ...</div>
  
  const images = data.getProjectById.images;
  console.log(images);
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
              {collaboratorsProject && collaboratorsProject.map(collaborator =>
                <img key={collaborator.id} className="rounded-full h-8 w-8 mx-2" src={collaborator.img} alt="collabo 1"/>
              )}
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
              src={`/images/luffy's flag.jpg`}
              alt="Projet"
            />
          </CarouselItem>
      </Carousel>
      
      {!issuesQuery.loading && issuesQuery.data.getIssuesByProjectId[0] && !issuesQuery.error
      ? <div>
        <p className='font-black text-2xl pt-20'>Tickets en cours</p>
        
        <Issues issues={issuesQuery.data.getIssuesByProjectId}/>
      </div>
      : <p className='mx-auto text-xl font-bold tracking-wide py-20'>Aucun ticket associé à ce projet pour le moment</p>
      }
      <div>
        {!showFiveTickets
            ? <button
              className="bg-blue_green_flash text-black rounded-full flex items-center justify-center"
              onClick={() => { setShowFiveTickets(true) }}
            >
              <svg
                className="w-14 h-14 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"/>
              </svg>
            </button>
            : <button
              className="bg-blue_green_flash text-black rounded-full"
              onClick={() => { setShowFiveTickets(false) }}
            >
              <svg
                className="h-14 w-14 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
                />
              </svg>
            </button>
        }
      </div>
      
      <div className="rounded-full place-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-36 w-36" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <form onSubmit={onSubmit} className="w-2/3 mx-auto">
        <div className="text-center">
          <button className="submit-button mb-8 mt-4">Supprimer le projet</button>
        </div>
      </form>
    </div>
  );
}

export default DetailsProject;
