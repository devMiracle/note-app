const API = {};

API.baseUrl = "http://localhost:3000/api";
API.userUrl = API.baseUrl+'/users';
API.notesUrl = API.baseUrl+'/notes';

module.exports = API;