import axios from "axios";

/** base url to make requests to the the movie database, like postman */
// axios.create is a method from axios that lets us pass a base url. So if i do instance.get('/korean-actors') it would translate to https://api.themoviedb.org/3/korean-actors
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;
