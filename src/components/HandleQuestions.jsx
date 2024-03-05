import React, { useEffect, useState, useRef } from "react";
import {getQuestions} from '../services/question-service.js';
import './aacSoftware.css';


export function HandleQuestions() {

    const [questions, setQuestion] = useState(0);
    const [questionsFound, setQuestionsFound] = useState([]);
    const [questionToUpdate, setQuestionToUpdate] = useState([]);
    const [updateQuestion, setUpdateQuestion] = useState(false);
    const [answers, setAnswers] = useState([]);
    
    const handleSubmmit = async (event) => {
        event.preventDefault();
        const fields = Object.fromEntries(new FormData(event.target));
        searchQuestion(fields.pregunta);
        
    }

    const searchQuestion = (wordToFind) => {
        const found = questions.filter((element) => element.question.includes(wordToFind));
        setQuestionsFound(found);
    }

    const editQuestion = (question) => {
        setUpdateQuestion(true);
        setQuestionToUpdate(question);
        let answersFormatted = question.answers.split('**');
        setAnswers(answersFormatted);
        console.log('questionToUpdate', question);
        const fields = Object.fromEntries(new FormData());
    }

    const setNewQuestion = () => {

        
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
                {updateQuestion === false ?
                <>
                <form action="" onSubmit={handleSubmmit}>
                    <textarea name='pregunta' className='questions_support_form_text_area' rows={4} maxLength={200} placeholder="Pregunta a buscar" />
                    <button className='questions_support_form_button' type="submit">Buscar</button>
                </form>
                    <h3 style={{marginTop: "1.6em", marginBottom: "0.8em"}}>Preguntas encontradas</h3>
                    <ul>
                        {questionsFound.map((question, index) => {
                            return (
                                <li className="questionFound" onClick={() => editQuestion(question)} key={index}>{question.question}</li>
                            )
                        })}
                    </ul>
                    </>
                    : 
                    <>
                    <h3 style={{marginTop: "1.6em", marginBottom: "0.8em"}}>Pregunta a actualizar</h3>
                        <form id="myform" action="">
                            <label style={{display: "block"}}>Id de pregunta: {questionToUpdate.id_question}</label>
                            <textarea name='pregunta' className='questions_support_form_text_area' rows={4} maxLength={200} placeholder="Pregunta a buscar" defaultValue={questionToUpdate.question} />
                            <textarea name='url' className='questions_support_form_text_area' rows={4} maxLength={200} placeholder="Respuesta" defaultValue={questionToUpdate.image} />
                            {
                                answers.map(
                                    (answer, index) => {
                                        return (
                                            <textarea name={"respuesta_" + (index+1)} className='questions_support_form_text_area' rows={2} maxLength={30} placeholder={"Respuesta " + (index+1)}  defaultValue={answer} key={index}  />
                                        )
                                    })
                            }
                            <label style={{display: "block"}}>Pregunta activa</label>
                            <textarea name='pregunta' className='questions_support_form_text_area' rows={1} maxLength={1} placeholder="Pregunta activa" defaultValue={questionToUpdate.validated} />
                            <img src={questionToUpdate.image} className='question_image' alt='React Logo' />
                            <button className='questions_support_form_button' onClick={() => setNewQuestion()} type="submit">Actualizar</button>
                        </form>
                    </>
                    }
            </main>
        </div>    
        </>
    )
}