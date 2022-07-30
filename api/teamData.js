import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getTeams = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createTeam = (teamObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/teams.json`, teamObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/teams/${response.data.name}.json`, payload).then(() => {
        getTeams().then(resolve);
      });
    }).catch(reject);
});

const getSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteSingleTeam = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/teams/${firebaseKey}.json`)
    .then(() => {
      getTeams(uid).then((teamsArray) => resolve(teamsArray));
    })
    .catch((error) => reject(error));
});

const updateTeam = (teamObj, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/teams/${teamObj.firebaseKey}.json`, teamObj)
    .then(() => getTeams(uid).then(resolve))
    .catch((error) => reject(error));
});

const getTeamPlayers = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players.json?orderBy="team_id"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getTeams,
  createTeam,
  getSingleTeam,
  deleteSingleTeam,
  updateTeam,
  getTeamPlayers,
};
