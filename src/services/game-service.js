
const saveGameURL = 'https://pffhtyq7ld3ybnmmfkvnleamuq0neaij.lambda-url.eu-west-1.on.aws/';

export const saveGame = (game) => {

    let endPoint = saveGameURL;
    let points =  game.points;
    let username = game.user;

    endPoint = endPoint + "?points=" + points + "&username=" + username;

    return new Promise((resolve, reject) => {
        fetch(endPoint)
        .then(response => {
            if (!response.ok) throw Error(response.status);
        })
        .then(data => {
            console.log(data);
            resolve(true);
        })
        .catch(error => {
            console.log(error);
            reject(false);
            }); 
    });

}