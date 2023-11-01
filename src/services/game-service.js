
//const saveGameURL = 'https://pffhtyq7ld3ybnmmfkvnleamuq0neaij.lambda-url.eu-west-1.on.aws/';

const saveGameURL = 'https://soft-shape-e688.albertoanchuste.workers.dev/api/game/save';

export const saveGame = (game) => {

    let endPoint = new URL(saveGameURL);

    endPoint.searchParams.append('points', game.points);
    endPoint.searchParams.append('username', game.user);

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