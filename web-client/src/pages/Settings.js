import React, { useState } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { Redirect } from 'react-router-dom';
import Issues from './Issues';
import DisplayProject from './components/projects/DisplayProject';
import { userWithRelations, deleteSession } from '../graphql/UserSession';
import Button from '../components/Button';
import UpdateUser from './components/users/UpdateUser';

const Settings = () => {

  const [displayHover, setDisplayHover] = useState(false);

  const { loading, error, data } = useQuery(userWithRelations);

  const [displayUpdateUser, setDisplayUpdateUser] = useState(false);

  const [deconnexion] = useMutation(
		deleteSession, 
		{
			onCompleted: () => <Redirect to="/"/>,
			onError: (error) => console.log(error.message),	
		}
	);

  const onSubmit = (event) => {
		event.preventDefault();

		deconnexion({
			variables: {
        user: parseInt(actualUser.id),				
			},        
		});

    window.setTimeout(function () {
      window.location.href = "http://localhost:3000/";
  }, 500);

	};

	if (loading) return 'Loading...';

	if (error) return `Error! ${error.message}`;

  const actualUser = data.userWithRelations;

  

  console.log(data.userWithRelations)


  return (
    <div className="settings-container">
      <div className="grid grid-cols-10">
        <div className="infos-user-container col-start-1 col-end-4">
          <h3 className="infos-title">Vos Informations</h3>
          <div className="text-center">
            <Button
              onClick={setDisplayUpdateUser}
              onClickValue={displayUpdateUser}
              buttonLabel='Modifier'
              buttonType='button'
              buttonClassName='my-auto'
            />
            {displayUpdateUser &&
              <UpdateUser setDisplayUpdateUser={setDisplayUpdateUser} user={actualUser}/>
            }
          </div>
          <ul className="infos-content">
            <li className="infos-liste"><b>Nom : </b>{actualUser.last_name}</li>
            <li className="infos-liste"><b>Prénom : </b>{actualUser.first_name}</li>
            <li className="infos-liste"><b>Email : </b>{actualUser.email}</li>
            <li className="infos-liste"><b>Statut : </b>{actualUser.roles}</li>
          </ul>
          <form onSubmit={onSubmit} className="w-2/3 mx-auto">
            <div className="text-center">
              <button className="submit-button mb-8 mt-4">Deconnexion</button>
            </div>
          </form>
        </div>
        <div className="projects-user-container col-start-5 col-end-11">
            <h3 className="projects-user-title">Vos Projets</h3>     
          <div className="projects-user-content">
            {actualUser.project_assigned 
              ? actualUser.project_assigned.map((projectObject, index) => {
                return <DisplayProject
                    key={index}
                    setDisplayHover={setDisplayHover}
                    index={index}
                    projectObject={projectObject}
                    displayHover={displayHover}
                    project={actualUser.project_assigned[index]}
                    to="/issue"
                    //isMobile={isMobile}
                  />;
                })
              : <p>Aucun projet pour le moment</p>
            }
          </div>
        </div> 
      </div>
      <div className="grid">
        <div className="issues-user-container">
          <div className="col-span-10">
            <h3 className="issues-user-title">Vos Tickets</h3>
          </div>
        </div>
        {actualUser.issues_assigned 
          ? <div>
              <Issues issues={actualUser.issues_assigned }/>
            </div>
          : <p className='mx-auto text-xl font-bold tracking-wide py-20'>Aucun ticket ne vous est assigné</p>
        }
      </div>
    </div>
  );
  
}

export default Settings;