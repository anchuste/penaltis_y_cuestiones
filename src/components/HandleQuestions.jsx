import React, { useEffect, useState, useRef } from "react";
import {getQuestions} from '../services/question-service.js'


export function HandleQuestions() {

    const [started, setStarted] = useState(false);
    const [navBarstate, setNavBarstate] = useState('homeNavBarButton');
    //const questions = useRef(0);
    const [questions, setQuestion] = useState(0);
    const [questionsFound, setQuestionsFound] = useState([]);

    //const [numberPlayers, setNumberPlayersState] = useState(1);
    //const [showButton, setShowButton] = useState(false);

    const handleNavBarState = (newNavBarState) => {
        setNavBarstate(newNavBarState);    
    }

    const handleSubmmit = async (event) => {
        event.preventDefault();
        const fields = Object.fromEntries(new FormData(event.target));

        searchQuestion(fields.pregunta);
        
    }

    const searchQuestion = (wordToFind) => {

        const found = questions.filter((element) => element.question.includes(wordToFind));
        console.log('searchQuestion - found: ', found);
        setQuestionsFound(found);
    }




    useEffect(() => {
        console.log('HandleQuestions -> Se ejecuta useEffect');

        async function fetchQuestionData() {
            const response = await getQuestions();
            setQuestion(response);
            //initialConfig(response);
        }

        fetchQuestionData();
        
    }, []);
      
    return (
        <>
        <div style={{width: '22em'}}>
            <main className='board'>
                <h2 style={{marginTop: "1.6em", marginBottom: "0.8em"}} className="title">Menú de administrador </h2>
                <form action="" onSubmit={handleSubmmit}>
                    <textarea name='pregunta' className='questions_support_form_text_area' rows={4} maxLength={200} placeholder="Pregunta a buscar" />
                    <button className='questions_support_form_button' type="submit">Buscar</button>
                </form>
                
                    <h3 style={{marginTop: "1.6em", marginBottom: "0.8em"}}>Preguntas encontradas</h3>
                    <ul>
                        {questionsFound.map((question, index) => {
                            return <li key={index}>{question.question}</li>
                        })}
                    </ul>
            </main>
        </div>    
        </>
    )
}