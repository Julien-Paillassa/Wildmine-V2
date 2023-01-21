import React, { useState, useEffect } from 'react';
import { useMutation } from "@apollo/client";

import Close from '../../../images/icon-close.svg';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import Select from '../../../components/Select';
import priorityOptions from '../../../components/options/priorityOptions';
import { createIssue } from '../../../graphql/Issue';

const CreateIssue = ({ setDisplayCreation, projectName, projectId, userId, refetch }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const [sendIssueInformations] = useMutation(
    createIssue,
    {
      onCompleted: () => {
        refetch();
        setDisplayCreation(false);
      },
      onError: (error) => console.log(error.message),
      refetchQueries: ["getIssuesByProjectId"],
    }
  );

  const onSubmit = event => {
    event.preventDefault();
    
    sendIssueInformations({
      variables: {
        name,
        description,
        status: 'IN_WAIT',
        priority,
        projectName,
        projectId: parseInt(projectId),
        userId,
        createdAt: new Date().toJSON(),
        updatedAt: new Date().toJSON(),
      }
    });
    window.location.href = `http://localhost:3000/detailsProject/${projectId}`;
    
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset"
    }
  }, []);

  return <div className='modal-background'>
    <div className='modal-container'>
        <p className='modal-title'>
          Créez votre ticket
        </p>

        <img
          className='modal-close'
          src={Close}
          alt='Fermer la fenêtre'
          onClick={() => setDisplayCreation(false)}
        />

      <form onSubmit={onSubmit} className='w-2/3 mx-auto'>

        <Input
          label='Titre de votre ticket'
          placeHolder='Entrez le titre de votre ticket'
          labelClassName='text-sm'
          setValue={setName}
          value={name}
          required
        />
        
        <TextArea
          label='Description'
          placeHolder='Entrez une description de votre ticket'
          labelClassName='text-sm'
          setValue={setDescription}
          value={description}
          required
        />

        <Select
          options={priorityOptions}
          setValue={setPriority}
          value={priority}
          label='Priorité du ticket'
        />

        <div className='text-center'>
          <button
            className='submit-button mb-8 mt-4'
          >
            Créer votre ticket
          </button>
        </div>

      </form>
    </div>
  </div>
};

export default CreateIssue;