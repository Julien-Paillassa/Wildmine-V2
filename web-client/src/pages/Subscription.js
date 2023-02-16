import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { setUser } from '../graphql/User';
import { NavLink } from 'react-router-dom';
import LoginInput from '../components/LoginInput';

const Subsription = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [sendUserInformations] = useMutation(
        setUser,
        {
          onCompleted: () => window.location.replace('/'),
          onError: (error) => {
            console.log(error.message);
          },
          refetchQueries: ["getUser"],
        }
      );

    const onSubmit = (event) => {
        event.preventDefault();
        sendUserInformations({ variables: {
            firstName,
            lastName,
            email,
            password,
            createdAt: new Date().toJSON()
        }});
    };
    
    return (
        <>
            <div className="flex justify-center ">
                <form onSubmit={onSubmit} className="mt-8">
                    <LoginInput
                        label="Prénom"
                        value={firstName}
                        setValue={setFirstName}
                        placeHolder="Entrez votre prénom"
                    />

                    <LoginInput
                        label="Nom"
                        value={lastName}
                        setValue={setLastName}
                        placeHolder="Entrez votre nom"
                    />

                    <LoginInput
                        label="Email"
                        value={email}
                        setValue={setEmail}
                        placeHolder="Entrez votre email"
                    />
                    
                    <LoginInput
                        label="Mot de passe"
                        value={password}
                        setValue={setPassword}
                        placeHolder="Entrez votre mot de passe"
                        type="password"
                    />

                    <LoginInput
                        label="Confirmation du mot de passe"
                        value={passwordConfirmation}
                        setValue={setPasswordConfirmation}
                        placeHolder="Entrez votre prénom"
                        type="password"
                    />

                    <div className="flex justify-center">
                        <button className="login-button">
                            S'incrire
                        </button>
                    </div>

                    <div className="w-full text-center text-secondary_color mt-4 underline">
                        <NavLink to="/">
                            Déjà inscrit?
                        </NavLink>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Subsription;