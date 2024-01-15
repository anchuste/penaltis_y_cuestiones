export const getQuestionsForMultiplayerGame = (data, questionsNumber, playersNumber) => {

    let usedQuestions = [];
    let arrayQuestions = [];
    let totalQuestionsToReturn = questionsNumber * playersNumber;
    let questions = data;


    for (let i = 0; i < totalQuestionsToReturn; i++) {

        let randomIndex = Math.floor(Math.random() * questions.length);

        while (usedQuestions.includes(randomIndex)) {
            randomIndex = Math.floor(Math.random() * questions.length);
        }

        usedQuestions.push(randomIndex);
        arrayQuestions.push(questions[randomIndex]);

    }

    return arrayQuestions;

}