
const getTop10pointsURL = 'https://3a4s6i7sdlnrbgzsqkpcwsn4he0kunkc.lambda-url.eu-west-1.on.aws/';

export const getTopPoints = (numPlayers) => {

    let endPoint = getTop10pointsURL;

    // Posibles parámetros para configurar la llamada a la lambda.
    //let points =  game.points;
    //let username = game.user;
    endPoint = endPoint + "?numPlayers=" + numPlayers;

    return new Promise((resolve, reject) => {


        fetch(endPoint)
            .then(result => result.json())
            .then(data => {
                resolve(data);
        })

    //console.log(fetchedData);
    //resolve(fetchedData.response);

        /*
        .then(response => {
            console.log(response);
            if (!response.ok) throw Error(response.status);
        })
        .then(response => {
            console.log(response);
            resolve(data);
        })
        .catch(error => {
            console.log(error);
            reject(false);
        }); */
    });
}