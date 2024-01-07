export const getQuestionsForMultiplayerGame = (data, questionsNumber, playersNumber) => {

    let usedQuestions = [];
    let totalQuestionsToReturn = questionsNumber * playersNumber;
    let questions = data;

    console.log('totalQuestionsToReturn', questions);

    for (let i = 0; i < totalQuestionsToReturn; i++) {

        let randomIndex = Math.floor(Math.random() * questions.length);

        while (usedQuestions.includes(randomIndex)) {
            randomIndex = Math.floor(Math.random() * questions.length);
        }

        usedQuestions.push(randomIndex);

    }

    console.log('usedQuestions', usedQuestions);

    return usedQuestions;

}