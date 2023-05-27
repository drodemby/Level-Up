import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/games`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createGame = (game) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/games`, {
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/gametypes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});
// eslint-disable-next-line import/prefer-default-export
export { getGames, createGame, getGameTypes };
