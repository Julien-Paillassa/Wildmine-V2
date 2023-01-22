import React, { useState, useEffect } from 'react';
import { useMutation } from "@apollo/client";

import Close from '../../../images/icon-close.svg';
import Input from '../../../components/Input';
import { assignUserToIssue } from '../../../graphql/Issue';

const AddUserToIssue = ({ setDisplayAddUserOnIssue, refetch, issueId }) => {
  const [email, setEmail] = useState('');

  const [addUserToIssue] = useMutation(
    assignUserToIssue,
    {
      onCompleted: () => {
        refetch();
        setDisplayAddUserOnIssue(false);
      },
      onError: (error) => console.log(error.message),

    }
  );

  const onSubmit = event => {
    event.preventDefault();
    
    addUserToIssue({
      variables: {
        email,
        issueId: parseInt(issueId),
      }
    });
    window.setTimeout(function () {
      window.location.href = "http://localhost:3000/issuesProject";
    }, 200);
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset"
    }
  }, []);

  return <div className='modal-background'>
    <div className='modal-container'>
      <p className='modal-title'>Assigner ce ticket à un collaborateur</p>

      <img
        className='cursor-pointer fixed right-[27%] top-[22%]'
        src={Close}
        alt='Fermer la fenêtre'
        onClick={() => setDisplayAddUserOnIssue(false)}
      />

    <form onSubmit={onSubmit} className='w-2/3 mx-auto'>

      <Input
        label='Adresse email du collaborateur'
        placeHolder="Entrez l'email de votre collaborateur"
        labelClassName='text-sm'
        setValue={setEmail}
        value={email}
        required
      />

      <div className='text-center'>
        <button
          className='submit-button mb-8 mt-4'
        >
          Assigner ce collaborateur
        </button>
      </div>

    </form>
    </div>
  </div>;
};

export default AddUserToIssue;