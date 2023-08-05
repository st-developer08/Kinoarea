import { getDetails } from "./https.request"


let nums = []

for (let i = 20; i < 45; i++) {
    nums.push(i)
}

export let img = import.meta.env.VITE_BASE_IMG

let key = img
export function reloadCards(arr, place, isSwiper) {
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
        rate.innerHTML = item.vote_average.toFixed(2)

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
            window.open('/pages/movies/?id=' + item.id, "_blank")
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

                    trailers_player.src = `https://www.youtube.com/embed/${videoObj.key}`

                })
        };
    }
}

export function reloadActors(arr, place) {
    place.innerHTML = ""
    for (let item of arr) {

        let actor = document.createElement("div")
        let actor_img = document.createElement("div")
        let actor_info = document.createElement("div")
        let actor_name = document.createElement("h3")
        let actor_original_name = document.createElement("p")
        let actor_role = document.createElement("p")

        actor.className = "actor"
        actor_img.className = "actor_img"
        actor_img.style.backgroundImage = `url(${img + item.profile_path})` === `url(https://image.tmdb.org/t/p/originalnull)` ? `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHhZY638DYGWcclgVIYXT-Vre_jGoxzoeoaQ&usqp=CAU` : `url(${img + item.profile_path})`
        actor_info.className = "actor_info"
        actor_name.className = "actor_name"
        actor_name.innerHTML = item.name
        actor_original_name.className = "actor_original_name"
        actor_original_name.innerHTML = item.original_name
        actor_role.className = "actor_role"
        actor_role.classList.add("yellow")
        actor_role.innerHTML = item.character

        actor.append(actor_img, actor_info)
        actor_info.append(actor_name, actor_original_name, actor_role)
        place.append(actor)

        actor_img.onclick = () => {
            window.open('/pages/persons/?id=' + item.id, "_blank")
        }
    }

}

export function getRandomElements(arr, count) {
    if (count >= arr.length) {
        return arr.slice(); // Возвращаем копию исходного массива, если требуемое количество элементов больше или равно длине массива
    }

    const randomIndexes = [];
    const result = [];

    while (randomIndexes.length < count) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
        }
    }

    for (const index of randomIndexes) {
        result.push(arr[index]);
    }
    return result;

}
export function reloadPersons(arr, cont) {

    cont.innerHTML = ""

    for (let item of arr) {
        let person = document.createElement("div")
        let place = document.createElement("span")
        let current_name = document.createElement("span")
        let origin_name = document.createElement("span")
        let age = document.createElement("span")

        person.className = "person"
        place.className = "place"
        current_name.className = "current_name"
        origin_name.className = "origin_name"
        age.className = "age"


        person.style.backgroundImage = `radial-gradient( rgba(245, 246, 252, 0),rgba(0, 0, 0, 0.73)),
        url(${img + item.profile_path})`
        person.style.backgroundPosition = "50% 30%"
        person.style.backgroundSize = "cover"
        person.style.backgroundRepeat = "no-repeat"

        place.innerHTML = arr.indexOf(item) + 1 + " place"
        current_name.innerHTML = item.name
        origin_name.innerHTML = item.name
        age.innerHTML = nums[Math.floor(Math.random() * nums.length)] + " years"

        person.append(place, current_name, origin_name, age)
        cont.append(person)
    }

}
export function reloadOthers(arr, cont) {

    cont.innerHTML = ""

    for (let item of arr) {
        let li = document.createElement("li")
        let left = document.createElement("div")
        let current_name = document.createElement("span")
        let origin_name = document.createElement("span")
        let age = document.createElement("span")
        let right = document.createElement("div")
        let place = document.createElement("span")

        left.className = "left"
        right.className = "right"
        current_name.className = "current_name"
        origin_name.className = "origin_name"
        age.className = "age"
        place.className = "place"

        place.innerHTML = arr.indexOf(item) + 3 + " place"
        current_name.innerHTML = item.name
        origin_name.innerHTML = item.name
        age.innerHTML = nums[Math.floor(Math.random() * nums.length)] + " years"

        li.append(left, right)
        left.append(current_name, origin_name, age)
        right.append(place)
        cont.append(li)
    }
}

export function reloadProduction(arr, place) {
    place.innerHTML = ""

    for (let item of arr) {

        let li = document.createElement("li")
        li.className = "yellow"
        li.innerHTML = (arr.indexOf(item) + 1) + "." + " " + item.name
        place.append(li)
    }

}

export function reloadEmployee(arr, place) {
    place.innerHTML = ""

    for (let item of arr) {
        let director = document.createElement("div")
        let director_img = document.createElement("div")
        let img = document.createElement("img")
        let director_info = document.createElement("div")
        let director_name = document.createElement("h3")
        let director_original_name = document.createElement("p")
        let director_career = document.createElement("p")

        director.className = "director"
        director_img.className = "director_img"
        director_info.className = "director_info"
        director_name.className = "director_name"
        director_original_name.className = "director_original_name"
        director_career.className = "director_career"
        director_career.classList.add("yellow")

        img.src = `${key + item.profile_path}` === "https://image.tmdb.org/t/p/originalnull" ? `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHhZY638DYGWcclgVIYXT-Vre_jGoxzoeoaQ&usqp=CAU` : `${key}${item.profile_path}`;
        director_name.innerHTML = item.name
        director_original_name.innerHTML = item.original_name
        director_career.innerHTML = item.job

        director.append(director_img, director_info)
        director_img.append(img)
        director_info.append(director_name, director_original_name, director_career)
        place.append(director)
    }

}
export function reloadGenres(arr, place) {

    place.innerHTML = ""

    let all = document.createElement("li")
    all.className = "active_tab"
    all.innerHTML = "All"
    all.id = "all"


    for (let item of arr) {

        let li = document.createElement("li")

        li.id = item.id
        li.innerHTML = item.name
        place.prepend(all)
        place.append(li)
    }

}
export function reloadSearch(arr, place, filter) {

    place.innerHTML = ""

    for (let item of arr) {

        let result = document.createElement("div")
        let left = document.createElement("div")
        let result_img = document.createElement("img")
        let result_info = document.createElement("div")
        let result_title = document.createElement("h3")
        let result_original_title = document.createElement("span")
        let result_role = document.createElement("div")

        let right = document.createElement("div")
        let span = document.createElement("span")

        result.classList.add("result")
        left.classList.add("left")
        result_info.classList.add("result_info")
        result_title.classList.add("result_title")
        result_original_title.classList.add("result_original_title")
        result_role.classList.add("result_role")
        right.classList.add("right")

        result_img.src = `${img + item.poster_path}`
        result_title.innerHTML = item.title
        result_original_title.innerHTML = item.original_title
        if (filter === "movie") {
            let { genre_ids } = item
            span.innerHTML = item.vote_average.toFixed(2)
            span.style.display = "block"

            for (let item of genre_ids) {
                let yellow = document.createElement("span")
                yellow.classList.add("yellow")
                yellow.innerHTML = item
                result_role.append(yellow)
            }

        } else {
            result_title.innerHTML = item.name
            result_original_title.innerHTML = item.name
            result_img.src = `${img + item.profile_path}` === `https://image.tmdb.org/t/p/originalnull` ? `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHhZY638DYGWcclgVIYXT-Vre_jGoxzoeoaQ&usqp=CAU` : `${img + item.profile_path}`
            span.style.display = "none"
            span.innerHTML = ""
            result_role.innerHTML = item.known_for_department
            result_role.classList.add("yellow")
        }
        result.append(left, right)
        left.append(result_img, result_info)
        result_info.append(result_title, result_original_title, result_role)
        right.append(span)
        place.append(result)
        result.onclick = () => {
            window.open(`/pages/${filter}s/?id=` + item.id, "_blank")
        }
    }
    console.log(arr);
}
