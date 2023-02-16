import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { getIssueById, updateIssueStatus, updateIssuePriority, deleteIssue } from '../graphql/Issue';
import Button from '../components/Button';
import AddUserToIssue from './components/issues/AddUserToIssue';
import priorityOptions from '../components/options/priorityOptions';
import statusOptions from '../components/options/statusOptions';
import modify from '../assets/images/modification-icon.svg';
import Select from '../components/Select';
import UpdateContent from './components/issues/UpdateContent';


const capitalizeFirstLetter = value => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const DetailsIssue = () => {
  const [displayAddUserOnIssue, setDisplayAddUserOnIssue] = useState(false);
  const [displayStatusSelect, setDisplayStatusSelect] = useState(false);
  const [displayPrioritySelect, setDisplayPrioritySelect] = useState(false);
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [displayUpdateContent, setDisplayUpdateContent] = useState(false);

  let { id } = useParams();

  const { loading, data, error, refetch } = useQuery(getIssueById, { variables: { id: parseInt(id) } });

  const [updateStatus] = useMutation(
    updateIssueStatus,
    {
      onCompleted: () => {
        setStatus('');
        refetch();
      },
      onError: (error) => console.log(error.message)
    }
  );

  const [updatePriority] = useMutation(
    updateIssuePriority,
    {
      onCompleted: () => {
        setPriority('');
        refetch();
      },
      onError: (error) => console.log(error.message)
    }
  );

  const [suppression] = useMutation( deleteIssue );

  const onSubmit = (event) => {
		event.preventDefault();

		suppression({
			variables: {
        id: parseInt(id),				
			},        
		});
      window.location.href = "http://localhost:3000/issuesProject";
  }

  if (loading) return <>Chargement</>

  if (error) return `Error! ${error.message}`;

  const issue = data.getIssueById;

  if (status) {
    updateStatus({
      variables: {
        issueId: parseInt(issue.id),
        status
      }
    });
  }
  
  if (priority) {
    updatePriority({
      variables: {
        issueId: parseInt(issue.id),
        priority
      }
    });
  }

  const statusLabel = statusOptions.find(value => value.value === issue.status).label;
  const priorityLabel = priorityOptions.find(value => value.value === issue.priority).label;

  const newDate = new Date(issue.created_at);

  return <div className='px-8 md:px-20'>

    <div className='md:flex md:justify-between'>
      <p className='mb-4 md:mb-0 text-2xl font-extrabold'>ANOMALIE N° #{issue.id}</p>


      <Button
        onClick={setDisplayAddUserOnIssue}
        onClickValue={displayAddUserOnIssue}
        buttonLabel='Assigner le ticket à un collaborateur'
        buttonType='button'
      />
    </div>

    {displayAddUserOnIssue &&
      <AddUserToIssue
        setDisplayAddUserOnIssue={setDisplayAddUserOnIssue}
        issueId={id}
        refetch={() => refetch()}
      />
    }

    <div className='my-8 w-11/12 border border-b border-secondary_color'/>

    <div className='text-black bg-bg_issue rounded-lg w-full p-4'>
    <div className="text-center">
            <Button
              onClick={setDisplayUpdateContent}
              onClickValue={displayUpdateContent}
              buttonLabel='Modifier'
              buttonType='button'
              buttonClassName='my-auto'
            />
            {displayUpdateContent &&
              <UpdateContent setDisplayUpdateContent={setDisplayUpdateContent} issue={issue}/>
            }
          </div>
      <p className='text-xl font-bold my-4'>{issue.name}</p>

      <p className='font-bold mb-2'>Description :</p>

      <p>{issue.description}</p>

      <div className='my-8 w-full border-b border-black'/>

      <p className='font-semibold'>
        Ajouté par :
        <span className='text-secondary_color'>
          {` ${capitalizeFirstLetter(issue.user.first_name)} ${capitalizeFirstLetter(issue.user.last_name)},`}
        </span>
      </p>

      <div className='grid grid-cols-2 md:grid-cols-2 mt-8'>
        <div className='mr-4'>

          <div className='flex'>

            <div className='flex'>
              <p className='font-bold mr-2'>Statut :</p>
              
              {displayStatusSelect
                ? <Select
                    options={statusOptions}
                    setValue={setStatus}
                    value={status}
                    selectClassName='w-full h-[24px]'
                  />
                : statusLabel
              }
            </div>

            {!displayStatusSelect && <img
              className='w-[20px] ml-4 cursor-pointer'
              src={modify}
              alt="Modifier le status"
              title="Modifier le status"
              onClick={() => setDisplayStatusSelect(!displayStatusSelect)}
            />}

          </div>

          <div className='flex'>

            <div className='flex my-6'>
              <p className='font-bold mr-2'>Priorité :</p>
              
              {displayPrioritySelect
                ? <Select
                    options={priorityOptions}
                    setValue={setPriority}
                    value={priority}
                    selectClassName='w-full h-[24px]'
                  />
                : priorityLabel}
            </div>

            {!displayStatusSelect && <img
              className='w-[20px] ml-4 cursor-pointer'
              src={modify}
              alt="Modifier la priorité"
              title="Modifier la priorité"
              onClick={() => setDisplayPrioritySelect(!displayPrioritySelect)}
            />}

          </div>

          <p>
            <span className='font-bold'>
              Assigné à :
            </span>
            {issue.user_assigned
              ? ` ${capitalizeFirstLetter(issue.user_assigned.first_name)} ${capitalizeFirstLetter(issue.user_assigned.last_name)}`
              : 'Non assigné'
            }
          </p>
        </div>

        <div>
          <p className='mb-6'><span className='font-bold'>Début : </span>{newDate.toLocaleDateString("fr")}</p>

          <p><span className='font-bold'>Temps estimé : </span>{issue.estimated || "Pas d'estimation"}</p>
        </div>
      </div>
      <form onSubmit={onSubmit} className="w-2/3 mx-auto">
        <div className="text-center">
          <button className="submit-button mb-8 mt-4">Supprimer le ticket</button>
        </div>
      </form>
    </div>
  </div>;
}

export default DetailsIssue;
