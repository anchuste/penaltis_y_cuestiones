import React, { useEffect, useState } from "react";
import {getAllQuestions} from '../services/question-service.js';
import { QuestionModel } from '../model/question-model.js';
import { setUpdateUserQuestion } from '../services/question-service.js'
import { ToastContainer, toast } from 'react-toastify';
import './aacSoftware.css';
import 'react-toastify/dist/ReactToastify.css';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { HandleQuestions } from "./HandleQuestions.jsx";


export function AdministratorMenuLogin() {

    const [error, setError] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    
    const iniciarSesion = async (event) => {

        event.preventDefault();
        const fields = Object.fromEntries(new FormData(event.target));
        const app = initializeApp(firebaseConfig);
        const auth = getAuth();

        try{
            // Sign in with email and password in firebase auth service
            const userCredential = await signInWithEmailAndPassword(
                auth,
                fields.username,
                fields.password
            );

            setUserAuthenticated(true);
        }
        catch(error){

            // Handle Errors here.
            const errorMessage = error.message;
            const errorCode = error.code;
            setError(true);
            console.log(errorCode)

            switch (errorCode) {
                case "auth/invalid-email":
                  setErrorMessage("This email address is invalid.");
                  break;
                case "auth/user-disabled":
                  setErrorMessage(
                    "This email address is disabled by the administrator."
                  );
                  break;
                case "auth/user-not-found":
                  setErrorMessage("This email address is not registered.");
                  break;
                case "auth/wrong-password":
                  setErrorMessage("The password is invalid or the user does not have a password.")
                  break;
                default:
                  setErrorMessage(errorMessage);
                  break;
            }
        }

    }

    

    const firebaseConfig = {
        apiKey: "AIzaSyAwVwQ-9-J5iUfj9rX05HKJ-MRwjOhlbrg",
        authDomain: "trivial-anchus.firebaseapp.com",
        projectId: "trivial-anchus",
        storageBucket: "trivial-anchus.appspot.com",
        messagingSenderId: "869580691118",
        appId: "1:869580691118:web:63d8a3a19f0c001b03ff3f",
        measurementId: "G-4Y686GMGN0"
    };

      
    return (
        <>
        <div style={{width: '22em'}}>
            <main className='board'>
                <>
                {userAuthenticated === false ?
                <>
                <h2 style={{marginTop: "1.6em", marginBottom: "0.8em"}} className="title">Login menú de administrador </h2>
                <form action="" onSubmit={iniciarSesion}>
                    <input name='username' className='questions_support_form_text_area' rows={4} maxLength={200} placeholder="Usuario" type="text" />
                    <input name='password' className='questions_support_form_text_area' type="password" id="pass" minlength="8" required placeholder="Contraseña" />
                    <button className='questions_support_form_button' type="submit">Iniciar sesión</button>    
                </form>
                </>
                :null}
                {error && userAuthenticated === false ? <h2 style={{marginTop: "1.6em", marginBottom: "0.8em", color:'red', fontSize:'14px'}} className="title"> ¡Error! {errorMessage} </h2>:null}
                {userAuthenticated === true ? <HandleQuestions></HandleQuestions>:null}
                </>
            </main>
        </div>    
        </>
    )
}