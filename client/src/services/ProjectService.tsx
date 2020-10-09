const SERVER_URL = 'http://localhost:3000';

const fetchRequest = (path: string, options?: RequestInit) => {
  return fetch(`${SERVER_URL}${path}`, options)
    .then(res => (res.status < 400 ? res : Promise.reject(res)))
    .then(res => (res.status === 204 ? res : res.json()))
    .catch(error => console.log('---> Error fetching data from Server', error));
};

const getBugs = async () => {
  return fetchRequest(`/project`);
};

export default getBugs;

export {
  getBugs
}
