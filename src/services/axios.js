import axios from 'axios';

export default axios.create({
  baseURL: 'https://apieasydesk.plimsoftware.pt',
  // baseURL: 'http://localhost:3001',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  },
});
