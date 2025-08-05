
const getPlayersByPointsURL = 'https://soft-shape-e688.project-utils.workers.dev/api/players/points';

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