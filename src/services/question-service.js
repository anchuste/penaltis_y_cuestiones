
//const getTop10pointsURL = 'https://3a4s6i7sdlnrbgzsqkpcwsn4he0kunkc.lambda-url.eu-west-1.on.aws/';
const getAllQuestionsURL = 'https://soft-shape-e688.albertoanchuste.workers.dev/api/question/all';

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