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
        let genres = document.createElement("p")

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

        genres.className = "genres"
        genres.innerHTML = item.genre_ids

        card.append(card_img, title, genres)
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

        trailer_img.style.backgroundImage = `url("${img + item.poster_path}")`;
        trailer_title.innerHTML = item.title;

        trailer.append(trailer_img, trailer_title);
        place.append(trailer);

        trailer_images.push(trailer_img);

        trailer_img.onclick = () => {
            trailer_images.forEach(btn => btn.classList.remove("trailer-active"));
            trailer_img.classList.add("trailer-active");

            setTimeout(() => {
                trailers_player.style.backgroundImage = `url("${img + item.backdrop_path}")`;
            }, 500);

            trailers_title.innerHTML = item.title;
            trailers_rate_l.innerHTML = item.vote_count;
            trailers_rate_d.innerHTML = Math.round(item.vote_count / 4);
        };
    }
}
