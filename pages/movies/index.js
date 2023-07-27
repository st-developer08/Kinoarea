import { header } from "../../modules/header";
import { getDetails, useHttp } from "../../modules/https.request";
import { img } from "../../modules/reload";
import { movie } from "../../modules/requests";


header()

let name = document.querySelector(".name")
let genresDiv = document.querySelector(".genres")
let image = document.querySelector(".img")
let link = document.querySelector(".see")
let container = document.querySelector('.cards')

let genr_arr = []
const movie_id = location.search.split('=').at(-1)


// const { request } = useHttp()

// request(`/movie/${movie_id}`, 'get')
//     .then(res => {
//         setTimeout(() => {
//             if (res.status !== 200 && res.status !== 201) {
//                 location.assign('/pages/movies/?id=' + movie_id)
//             }
//         }, 500);
//         name.innerHTML = res.data.original_title

//         genres.innerHTML = res.data.genres[0].name || "genre" + ', ' + res.data.genres[1].name || "genre" + ', ' + res.data.genres[2].name || "genre"

//         image.src = `${img + res.data.backdrop_path}`
//         link.href = `${res.data.homepage}`
//     })

getDetails(`/movie/${movie_id}`)
    .then(res => {
        const {data: {genres}} = res 
        name.innerHTML = res.data.original_title
        console.log(res.data);

        for(let gen of genres) {
            genresDiv.innerHTML += `
                <p class="genres">${gen.name}</p>
            `
        }

        image.src = `${img + res.data.backdrop_path}`
        link.href = `${res.data.homepage}`
    })

// getDetails(`/movie/${movie_id}/images`)
//     .then(res => {
//         // for(let item of res.data.backdrops.slice(0,10)) {
//         //     container.innerHTML += `
//         //         <img src="${img + item.file_path}" alt="" />
//         //     `
//         // }
//     })
getDetails(`/movie/${movie_id}/credits`)
    .then(res => {
        console.log(res.data);
        for(let item of res.data.cast.slice(0,10)) {
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


// movie(movie_id)