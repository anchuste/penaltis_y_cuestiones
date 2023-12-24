
//const getTop10pointsURL = 'https://3a4s6i7sdlnrbgzsqkpcwsn4he0kunkc.lambda-url.eu-west-1.on.aws/';
const getAllQuestionsURL = 'https://soft-shape-e688.albertoanchuste.workers.dev/api/question/all';
const setUserQuestionURL = 'https://soft-shape-e688.albertoanchuste.workers.dev/api/question/saveUserQuestion';
const getQuestionLastIdURL = 'https://soft-shape-e688.albertoanchuste.workers.dev/api/question/lastId';

export const getQuestions = () => {

    let endPoint = new URL(getAllQuestionsURL);
    
    return new Promise((resolve, reject) => {
        fetch(endPoint)
            .then(result => result.json())
            .then(data => {
                resolve(data);
        })
    });
}

export const getLastIdQuestion = () => {
    
        let endPoint = new URL(getQuestionLastIdURL);
        
        return new Promise((resolve, reject) => {
            fetch(endPoint)
                .then(result => result.json())
                .then(data => {
                    resolve(data);
                })
                .catch(function(error){
                    console.log(error);
                    reject(false);
                })
        });
    }

export const setSaveUserQuestion = (question) => {

        console.log("setSaveUserQuestion", question);
    
        let endPoint = new URL(setUserQuestionURL);

        console.log("question json", question);
    
        return new Promise((resolve, reject) => {
            fetch(endPoint, 
                {
                method: 'POST',
                body: JSON.stringify(question),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS, POST, PUT, DELETE',
                    'Access-Control-Max-Age': '86400',
                    'Content-Type': 'application/json',
                    'Connection': 'keep-alive',
                    'Host': 'soft-shape-e688.albertoanchuste.workers.dev'
                }
            })
            .then(function(response){
                console.log(response);
                resolve(true);
            })
            .catch(function(error){
                console.log(error);
                resolve(false);
            })
        });
    
    }
