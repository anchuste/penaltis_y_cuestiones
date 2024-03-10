import React, { useEffect, useState } from "react";
import {getAllQuestions} from '../services/question-service.js';
import { QuestionModel } from '../model/question-model.js';
import { setUpdateUserQuestion } from '../services/question-service.js'
import { ToastContainer, toast } from 'react-toastify';
import './aacSoftware.css';
import 'react-toastify/dist/ReactToastify.css';


export function HandleQuestions() {

    const [questions, setQuestion] = useState(0);
    const [questionsFound, setQuestionsFound] = useState([]);
    const [questionToUpdate, setQuestionToUpdate] = useState([]);
    const [errors, setErrors] = useState('');
    const [clickUpdateQuestion, setClickUpdateQuestion] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [image, setImage] = useState([]);

    const setInitialMenu = () => { 
        setClickUpdateQuestion(false);
        setQuestionsFound([]);
        setAnswers([]);
        setQuestionToUpdate([]);
        setImage([]);
        setErrors('');
    }

    const getQuestionsNotValidated = () => {
        //console.log('getQuestionsNotValidated -> questions', questions);
        const found = questions.filter((element) => element.validated === 0);
        //console.log('getQuestionsNotValidated -> found', found);
        setQuestionsFound(found);
    }
    
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
        setClickUpdateQuestion(true);
        setQuestionToUpdate(question);
        setImage(question.image);

        let answersFormatted = question.answers.split('**');
        setAnswers(answersFormatted);
    }

    const refreshPicture = async (event) => {
        event.preventDefault();
        const fields = Object.fromEntries(new FormData(event.target));
        setImage(fields.url);        
    }

    const updateQuestion = async (event) => {
        event.preventDefault();
        const fields = Object.fromEntries(new FormData(event.target));
        const question = new QuestionModel();

        question.id = questionToUpdate.id_question;
        question.question = fields.pregunta;
        question.image = fields.url;
        question.answer1 = fields.respuesta_1;
        question.answer2 = fields.respuesta_2;
        question.answer3 = fields.respuesta_3;
        question.validated = fields.pregunta_activa;
        question.correctAnswer = fields.respuesta_correcta;

        try {
            let savedUserQuestion = await setUpdateUserQuestion(question);

            if (savedUserQuestion === true){
                setErrors('');
                toast.success(`La pregunta con id ${questionToUpdate.id_question} ha sido actualizada. ¡Muchas gracias!`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    onClose: () => {setInitialMenu()}
                  });
                //console.log('updateQuestion() - Pregunta actualizada');
            }
            else{
                setErrors('No se ha podido actualizar la pregunta');
                //console.log('No se ha podido actualizar la pregunta');
            }
            } catch (error) {
                setErrors('Error al actualizar la pregunta');
                console.error(error);
            } finally {
                console.log('Finalizado el método de actualizar pregunta');
            }
    }

    useEffect(() => {
        //console.log('HandleQuestions -> Se ejecuta useEffect');
        async function fetchQuestionData() {
            const response = await getAllQuestions();
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
                {clickUpdateQuestion === false ?
                <>
                <form action="" onSubmit={handleSubmmit}>
                    <textarea name='pregunta' className='questions_support_form_text_area' rows={4} maxLength={200} placeholder="Pregunta a buscar" />
                    <button className='questions_support_form_button' type="submit">Buscar</button>
                </form>
                    <button className='questions_support_form_button' type="submit" onClick={() => getQuestionsNotValidated()} >Mostrar no validadas</button>
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
                        <form id="myform" action="" onSubmit={updateQuestion}>
                            <label style={{display: "block"}}>Id de pregunta: {questionToUpdate.id_question}</label>
                            <textarea name='pregunta' className='questions_support_form_text_area' rows={4} maxLength={200} placeholder="Pregunta" defaultValue={questionToUpdate.question}/>
                            <textarea name='url' className='questions_support_form_text_area' rows={4} maxLength={400} placeholder="Respuesta" defaultValue={questionToUpdate.image} />
                            {
                                answers.map(
                                    (answer, index) => {
                                        return (
                                            <textarea name={"respuesta_" + (index+1)} className='questions_support_form_text_area' rows={2} maxLength={30} placeholder={"Respuesta " + (index+1)}  defaultValue={answer} key={index}  />
                                        )
                                    })
                            }
                            <label style={{display: "block"}}>Respuesta correcta</label>
                            <textarea name='respuesta_correcta' className='questions_support_form_text_area' rows={1} maxLength={1} placeholder="Pregunta activa" defaultValue={questionToUpdate.correct_answer} />
                            <label style={{display: "block"}}>Pregunta activa</label>
                            <textarea name='pregunta_activa' className='questions_support_form_text_area' rows={1} maxLength={1} placeholder="Pregunta activa" defaultValue={questionToUpdate.validated} />
                            <img src={image} className='question_image' alt='React Logo' />
                            <button className='questions_support_form_button' type="submit">Actualizar</button>
                            {errors != '' && <h3 style={{color: '#e24444'}}> ❌ {errors } </h3>}
                        </form>
                        <ToastContainer/>

                        {/* */}
                        <form id="refreshPictureForm" action="" onSubmit={refreshPicture}>
                            <label style={{display: "block"}}>URL de la foto a probar</label>
                            <textarea name='url' className='questions_support_form_text_area' rows={4} maxLength={400} placeholder="Respuesta"/>
                            <button id="refreshId" value="refresh" className='questions_support_form_button' type="submit">Probar foto</button>
                        </form>

                    </>
                    }
            </main>
        </div>    
        </>
    )
}