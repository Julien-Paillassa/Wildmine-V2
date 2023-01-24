import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import Close from '../../../images/icon-close.svg';
import { createProject, createFile } from '../../../graphql/Project';

const CreateProject = ({ setDisplayCreation }) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [projectPictureName, setProjectPictureName] = useState([]);
	const [pictures, setPictures] = useState([]);


	const [sendProjectInformations] = useMutation(
		createProject,
		{
			onCompleted: () => setDisplayCreation(false),
			onError: (error) => console.log(error.message),
			refetchQueries: ['getProjects']
		}
	);

	const [sendPicture] = useMutation(createFile);

	const onChange = async ({
    target: { validity, files: [file] }
  }) => {
    if (validity.valid) {
      const uplaoaded = await sendPicture({ variables: { picture: file } });

      uplaoaded.data.createFile && setPictures([...pictures, file.name]);

      if (uplaoaded.data.createFile && projectPictureName.length === 0) {
        setProjectPictureName([0]);
      }
    }
  };

	const onSubmit = (event) => {
		event.preventDefault();

		sendProjectInformations({
			variables: {
				name,
				description,
				createdAt: new Date().toJSON(),
				images: pictures			
			},
		});
		window.setTimeout(function () {
			window.location.href = "http://localhost:3000/projects";
		  }, 200);
	};

	return  <div className='modal-background'>
		<div className="modal-container">
			
      <p className='modal-title'>
        Créez votre projet
      </p>

			<img
				className="modal-close"
				src={Close}
				alt="Fermer la fenêtre"
				onClick={() => setDisplayCreation(false)}
			/>

			<form onSubmit={onSubmit} className="w-2/3 mx-auto">
				<Input
					label="Titre de votre projet"
					placeHolder="Entrez le nom de votre projet"
					labelClassName="text-sm"
					setValue={setName}
					value={name}
					required
				/>

				<TextArea
					label="Description"
					placeHolder="Entrez une description de votre projet"
					labelClassName="text-sm"
					setValue={setDescription}
					value={description}
					required
				/>

				<div className="text-center">

          {projectPictureName.length > 0
            ? <div className='flex flex-col w-2/3 mx-auto'>

              {projectPictureName.map(value => (
                <label key={value} className="button-general cursor-pointer mb-2">

                {pictures[value] || 'Sélectionnez une image'}

                <input
                  type="file"
                  onChange={onChange}
                  accept="image/png, image/jpg, image/gif, image/jpeg"
                  className="hidden"
                />

              </label>
              ))}

            </div>
            : <label className="button-general cursor-pointer">
              Sélectionnez une image

              <input
                type="file"
                onChange={onChange}
                accept="image/png, image/jpg, image/gif, image/jpeg"
                className="hidden"
              />
            </label>
          }

					{pictures.length > 0 &&
						<div className="text-center">

							<button
                type="button"
                className="submit-button mb-8 mt-4"
                onClick={() => {
                  setProjectPictureName([...projectPictureName, projectPictureName.length])
                }}
              >
                Ajouter une image
              </button>

						</div>
					}			
				</div>

				<div className="text-center">
					<button className="submit-button mb-8 mt-4">Créer votre projet</button>
				</div>
			</form>
		</div>
	</div>;
};

export default CreateProject;
