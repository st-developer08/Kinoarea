import { header } from "../../modules/header";
import { getDetails } from "../../modules/https.request";
import { img } from "../../modules/reload";

header()

let name = document.querySelector(".name")
let genresDiv = document.querySelector(".genres")
let image = document.querySelector(".img")
let link = document.querySelector(".see")
let container = document.querySelector('.cards')

const movie_id = location.search.split('=').at(-1)

getDetails(`/movie/${movie_id}`)
    .then(res => {
        const { data: { genres } } = res
        name.innerHTML = res.data.original_title
        console.log(res.data);

        for (let gen of genres) {
            genresDiv.innerHTML += `
                <p class="genres">${gen.name}</p>
            `
        }

        image.src = `${img + res.data.backdrop_path}`
        link.href = `${res.data.homepage}`
    })

getDetails(`/movie/${movie_id}/credits`)
    .then(res => {
        console.log(res.data);
        for (let item of res.data.cast.slice(0, 10)) {
            container.innerHTML += `
                <img src="${img + item.profile_path}" alt="" />
            `
        }
    })

getDetails(`/movie/${movie_id}/videos`)
    .then(res => {
        const iframe = document.querySelector('embed')
        let videoObj = res.data.results[Math.floor(Math.random() * res.data.results.length - 1)]

        iframe.src = `https://www.youtube.com/embed/${videoObj.key}`

        console.log(videoObj);
    })


