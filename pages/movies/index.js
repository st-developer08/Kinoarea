import { header } from "../../modules/header";
import { useHttp } from "../../modules/https.request";

header()

const movie_id = location.search.split('=').at(-1)

const { request } = useHttp()

request(`/movie/${movie_id}`, 'get')
    .then(res => console.log(res.data))

//     import axios from 'axios';

// const options = {
//     method: 'GET',
//     url: `https://api.themoviedb.org/3/movie/${movie_id}`,
//     headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmRhODA1NGUyN2ExZTk1YTJhMTJkZDE5OThjYWZiYiIsInN1YiI6IjY0YmU3MzQzZTlkYTY5MDEwZDQxOTAxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L7H6NDnAI8ToptlYW-nNps0pq-TcMn_e0IwlZDIBjkI'
//     }
// };

// axios
//     .request(options)
//     .then(function (response) {
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         console.error(error);
//     });
