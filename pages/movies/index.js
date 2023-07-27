import { header } from "../../modules/header";
import { useHttp } from "../../modules/https.request";
import { img } from "../../modules/reload";
import { movie } from "../../modules/requests";


header()

let name = document.querySelector(".name")
let genres = document.querySelector(".genres")
let image = document.querySelector(".img")
let genr_arr = []
const movie_id = location.search.split('=').at(-1)


const { request } = useHttp()

request(`/movie/${movie_id}`, 'get')
    .then(res => {
        setTimeout(() => {
            if (res.status !== 200 && res.status !== 201) {
                location.assign('/pages/movies/?id=' + movie_id)
            }
        }, 500);
        console.log(res.data);
        name.innerHTML = res.data.original_title

        genres.innerHTML = res.data.genres[0].name || "genre" + ', ' + res.data.genres[1].name || "genre" + ', ' + res.data.genres[2].name || "genre"

        image.src = `${img + res.data.backdrop_path}`
    })

movie(movie_id)