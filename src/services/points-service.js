
//const getTop10pointsURL = 'https://3a4s6i7sdlnrbgzsqkpcwsn4he0kunkc.lambda-url.eu-west-1.on.aws/';
const getPlayersByPointsURL = 'https://soft-shape-e688.albertoanchuste.workers.dev/api/players/points';

export const getTopPoints = (numPlayers) => {

    let endPoint = new URL(getPlayersByPointsURL);
    endPoint.searchParams.append('numPlayers', numPlayers);

    return new Promise((resolve, reject) => {
        fetch(endPoint)
            .then(result => result.json())
            .then(data => {
                resolve(data);
        })
    });
}