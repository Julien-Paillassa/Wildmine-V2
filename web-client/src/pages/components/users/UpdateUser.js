import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import Input from '../../../components/Input';
import Close from '../../../images/icon-close.svg';
import { updateUser } from '../../../graphql/User';

const UpdateUser = ({ setDisplayUpdateUser, user}) => {
	const [lastName, setLastName] = useState(user.last_name);
	const [firstName, setFirstName] = useState(user.first_name);
	const [email, setEmail] = useState(user.email);

	const [sendUserNewsInformations] = useMutation(
		updateUser, 
		{
			onCompleted: () => setDisplayUpdateUser(false),
			onError: (error) => console.log(error.message),	
		}
	);

	const onSubmit = (event) => {
		event.preventDefault();

		sendUserNewsInformations({
			variables: {
                id: parseInt(user.id),
			    firstName,
			    lastName,
			    email,					
			},
            
		});

	};

	return (
		<div className="bg-wildmine_black border-4 border-secondary_color text-text_color rounded-2xl fixed z-30 w-1/2 left-1/4">
			<img
				className="cursor-pointer absolute right-8 top-6"
				src={Close}
				alt="Fermer la fenêtre"
				onClick={() => setDisplayUpdateUser(false)}
			/>

			<form onSubmit={onSubmit} className="w-2/3 mx-auto">

                <Input
					label="Nom"
					placeHolder="Entrez votre nom"
					labelClassName="text-sm"
					setValue={setLastName}
					value={lastName}
					required
				/>

                <Input
					label="Prénom"
					placeHolder="Entrez votre prénom"
					labelClassName="text-sm"
					setValue={setFirstName}
					value={firstName}
					required
				/>

                <Input
					label="Email"
					placeHolder="Entrez votre email"
					labelClassName="text-sm"
					setValue={setEmail}
					value={email}
					required
				/>

				<div className="text-center">
					<button className="submit-button mb-8 mt-4">Mettre à jour</button>
				</div>
			</form>
		</div>
	);
};

export default UpdateUser;
