
const saveGameURL = 'https://pffhtyq7ld3ybnmmfkvnleamuq0neaij.lambda-url.eu-west-1.on.aws/';

export const saveGame = (game) => {

    let endPoint = saveGameURL;
    let points =  game.points;
    let username = game.user;
    endPoint = endPoint + "?points=" + points + "&username=" + username;
    console.log('endPoint: ', endPoint)
    fetch(endPoint)
    .then(response => response.json())
    .then(data => console.log(data));

    //setNavBarstate(newNavBarState);
}