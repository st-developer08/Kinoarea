import { header } from "./modules/header";
import { tabs } from "./modules/helpers";
import { getDetails } from "./modules/https.request";
import { img, reloadCards, reloadGenres, reloadOthers, reloadPersons, reloadTrailers } from "./modules/reload";
import { scrollToX, scrollToY } from "./modules/scrollFunction";
import { scrollToTop } from "./modules/scrollToTop";

let body = document.body
scrollToTop(body)
header()

let search_result = document.querySelector(".search_result")
let some_trailers = document.querySelector(".some_trailers")
let popular_films = document.querySelector(".popular_films")
let expected_novelties = document.querySelector(".expected_novelties")
let box_office = document.querySelector(".box_office")
let all_new = document.querySelector(".all_new")
let first_places = document.querySelector(".first_places")
let other_persons = document.querySelector(".other_persons")
    
scrollToY(search_result)



getDetails("/movie/now_playing")
    .then(res => {

        reloadCards(res.data.results.slice(0, 8), cards)
        reloadTrailers(res.data.results, some_trailers)

        let cards_images = document.querySelectorAll(".card_img")

        bodyBack(cards_images)


        all_new.onclick = () => {
            if (all_new.innerHTML === "All new") {
                reloadCards(res.data.results, cards)
                all_new.innerHTML = "Hide"

                let cards_images = document.querySelectorAll(".card_img")
                bodyBack(cards_images)
                window.scrollTo({
                    top: 1830,
                    behavior: 'smooth'
                });

            } else {
                window.scrollTo({
                    top: 510,
                    behavior: 'smooth'
                });

                setTimeout(() => {
                    reloadCards(res.data.results.slice(0, 8), cards)
                    all_new.innerHTML = "All new"

                    let cards_images = document.querySelectorAll(".card_img")
                    bodyBack(cards_images)
                }, 500);
            }

        }
    })

function bodyBack(arr) {

    arr.forEach(card_img => {

        let key = card_img.getAttribute("data-backdrop")

        card_img.onmouseenter = () => {
            setTimeout(() => {
                body.style.backgroundImage = key
            }, 500);
        }

        card_img.onmouseleave = () => {
            body.style.backgroundImage = `url("/images/joker.png")`
        }
    })

}
getDetails("/movie/upcoming")
    .then(res => reloadCards(res.data.results.slice(14, 18), expected_novelties))

getDetails(`/movie/popular`)
    .then(res => {
        reloadCards(res.data.results.slice(0, 4), popular_films, true)
        reloadCards(res.data.results.slice(15, 20), box_office)
        scrollToX(some_trailers)
    })

getDetails("/person/popular")
    .then(res => {
        reloadPersons(res.data.results.slice(0, 2), first_places)
        reloadOthers(res.data.results.slice(2), other_persons)

        scrollToY(other_persons)
    })


let tabs_cont = document.querySelector(".tabs")

getDetails("/genre/movie/list")
    .then(res => {

        reloadGenres(res.data.genres, tabs_cont)

        scrollToX(tabs_cont)

        let tabs_genre = document.querySelectorAll(".tabs li")

        tabs_genre.forEach(tab => {

            tab.onclick = () => {

                if (tab.id === "all") {
                    getDetails("/movie/now_playing")
                        .then(res => reloadCards(res.data.results.slice(0, 8), cards))
                    cards.style.display = "grid"
                    cards.classList.remove("cards_empty")
                } else {

                    getDetails("/movie/now_playing")
                        .then(res => {
                            let similar_arr = []
                            let { data: { results } } = res

                            results.forEach(item => {
                                if (item.genre_ids.some(genreId => genreId == tab.id)) {
                                    similar_arr.push(item);
                                }
                                if (similar_arr.length !== 0) {
                                    reloadCards(similar_arr.slice(0, 8), cards);
                                    cards.classList.remove("cards_empty")
                                    cards.style.display = "grid"
                                } else {
                                    cards.innerHTML = `<h4>There is no mowies with ${tab.innerHTML} genre.</h4>`
                                    cards.classList.add("cards_empty")
                                    cards.style.display = "block"
                                }
                            });

                            similar_arr.length = 0;

                        });

                }
                tabs_genre.forEach(tab => tab.classList.remove("active_tab"))
                tab.classList.add("active_tab")
            }

        })


    })

let tabs_time = document.querySelectorAll(".tabs_time li")
let tabs_period = document.querySelectorAll(".tabs_period li")
let tabs_country = document.querySelectorAll(".tabs_country li")


tabs(tabs_time)
tabs(tabs_period)
tabs(tabs_country)

let cards = document.querySelector(".cards")

let social_icons = [
    "vk",
    "instagram",
    "facebook",
    "twitter"
]

let social = document.querySelector(".social_sub")

let more = document.createElement("li")

more.innerHTML = "..."
more.style.cursor = "pointer"
more.style.paddingBottom = "10px"

for (let icon of social_icons) {
    let li_social = document.createElement("li")
    let a_social = document.createElement("a")
    let icon_social = document.createElement("img")

    icon_social.src = `/icons/${icon}.svg`
    icon_social.alt = `${icon}`
    a_social.href = "#"

    a_social.append(icon_social)
    li_social.append(a_social)
    social.append(li_social, more)
}


let sub_social_icons = [
    "vk",
    "instagram",
    "facebook",
    "twitter",
    "youtube"
]

let sub_social = document.querySelector(".sub_social")

for (let icon of sub_social_icons) {
    let li_social = document.createElement("li")
    let a_social = document.createElement("a")
    let icon_social = document.createElement("img")

    icon_social.src = `/icons/${icon}.svg`
    icon_social.alt = `${icon}`
    a_social.href = "#"

    a_social.append(icon_social)
    li_social.append(a_social)
    sub_social.append(li_social)
}
