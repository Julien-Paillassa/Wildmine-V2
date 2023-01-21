import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import Input from '../../../components/Input';
import Close from '../../../images/icon-close.svg';
import { updateProjectContent } from '../../../graphql/Project';

const UpdateContent = ({ setDisplayUpdateContent, project}) => {
	const [name, setName] = useState(project.name);
	const [description, setDescription] = useState(project.description);

	const [sendProjectNewsContents] = useMutation(
		updateProjectContent, 
		{
			onCompleted: () => setDisplayUpdateContent(false),
			onError: (error) => console.log(error.message),	
		}
	);

	const onSubmit = (event) => {
		event.preventDefault();

		sendProjectNewsContents({
			variables: {
                id: parseInt(project.id),
                name,
                description			
			},
            
		});

	};

	return (
		<div className="bg-wildmine_black border-4 border-secondary_color text-text_color rounded-2xl fixed z-30 w-1/2 left-1/4">
			<img
				className="cursor-pointer absolute right-8 top-6"
				src={Close}
				alt="Fermer la fenêtre"
				onClick={() => setDisplayUpdateContent(false)}
			/>

			<form onSubmit={onSubmit} className="w-2/3 mx-auto">

                <Input
					label="Nom"
					placeHolder="Entrez votre nom"
					labelClassName="text-sm"
					setValue={setName}
					value={name}
					required
				/>

                <Input
					label="Description"
					placeHolder="Entrez votre prénom"
					labelClassName="text-sm"
					setValue={setDescription}
					value={description}
					required
				/>

				<div className="text-center">
					<button className="submit-button mb-8 mt-4">Mettre à jour</button>
				</div>
			</form>
		</div>
	);
};

export default UpdateContent;
