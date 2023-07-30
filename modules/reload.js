import { all } from "axios"
import { getDetails } from "./https.request"

export let img = import.meta.env.VITE_BASE_IMG

export function reloadCards(arr, place) {
    place.innerHTML = ""

    for (let item of arr) {

        let card = document.createElement("div")
        let card_img = document.createElement("div")
        let rate = document.createElement("div")
        let after = document.createElement("div")
        let span = document.createElement("span")
        let title = document.createElement("h3")
        let genres_cont = document.createElement("div")

        card.className = "card"
        card_img.className = "card_img"
        card_img.style.backgroundImage = `url("${img + item.poster_path}")`
        card_img.setAttribute("data-backdrop", `url("${img + item.backdrop_path}")`)

        rate.className = "rate"
        rate.innerHTML = item.vote_average

        after.className = "after"
        span.innerHTML = "Movie card"

        title.className = "title"
        title.innerHTML = item.title

        genres_cont.className = "genres_cont"

        getDetails(`/movie/${item.id}`)
            .then(res => {
                const { data: { genres } } = res

                for (let gen of genres) {
                    gen.className = "genres"
                    genres_cont.innerHTML += `
                    <p class="genres">${gen.name},</p>
                `
                }

                let all_genres = genres_cont.querySelectorAll(".genres")

                all_genres[all_genres.length - 1].innerHTML = all_genres[all_genres.length - 1].innerHTML.replace(",", ".")
            })



        card.append(card_img, title, genres_cont)
        card_img.append(rate, after)
        after.append(span)
        place.append(card)

        span.onclick = () => {
            location.assign('/pages/movies/?id=' + item.id)
        }

    }

}
let trailers_player = document.querySelector(".trailers_player")
let trailers_title = document.querySelector(".trailers_title h2")
let trailers_rate_l = document.querySelector(".like .counter")
let trailers_rate_d = document.querySelector(".dislike .counter")


export function reloadTrailers(arr, place) {
    place.innerHTML = "";

    let trailer_images = [];

    for (let item of arr) {
        let trailer = document.createElement("div");
        let trailer_img = document.createElement("div");
        let trailer_title = document.createElement("p");

        trailer.className = "trailer";
        trailer_img.className = "trailer_img";
        trailer_title.className = "trailer_title";

        trailer_img.style.backgroundImage = `url("${img + item.backdrop_path}")`;
        trailer_title.innerHTML = item.title;

        trailer.append(trailer_img, trailer_title);
        place.append(trailer);

        trailer_images.push(trailer_img);

        trailer_img.onclick = () => {
            trailer_images.forEach(btn => btn.classList.remove("trailer-active"));
            trailer_img.classList.add("trailer-active");

            trailers_title.innerHTML = item.title;
            trailers_rate_l.innerHTML = item.vote_count;
            trailers_rate_d.innerHTML = Math.round(item.vote_count / 4);

            getDetails(`/movie/${item.id}/videos`)
                .then(res => {
                    let videoObj = res.data.results[Math.floor(Math.random() * res.data.results.length - 1)]
                    console.log(videoObj);

                    trailers_player.src = `https://www.youtube.com/embed/${videoObj.key}`

                })
        };
    }
}
