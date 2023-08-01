import { header } from "./modules/header";
import { getDetails } from "./modules/https.request";
import { img, reloadCards, reloadGenres, reloadOthers, reloadPersons, reloadTrailers } from "./modules/reload";
import { scrollToX, scrollToY } from "./modules/scrollFunction";

let body = document.body

header()

let some_trailers = document.querySelector(".some_trailers")
let popular_films = document.querySelector(".popular_films")
let expected_novelties = document.querySelector(".expected_novelties")
let box_office = document.querySelector(".box_office")
let all_new = document.querySelector(".all_new")
let first_places = document.querySelector(".first_places")
let other_persons = document.querySelector(".other_persons")

getDetails("/movie/now_playing")
    .then(res => {
        reloadCards(res.data.results.slice(0, 8), cards)

        let cards_images = document.querySelectorAll(".card_img")

        bodyBack(cards_images)

        all_new.onclick = () => {

            if (all_new.innerHTML === "All new") {
                reloadCards(res.data.results, cards)
                all_new.innerHTML = "Hide"

                let cards_images = document.querySelectorAll(".card_img")
                bodyBack(cards_images)

            } else {
                window.scrollTo({
                    top: 70,
                    behavior: 'smooth'
                });

                reloadCards(res.data.results.slice(0, 8), cards)
                all_new.innerHTML = "All new"

                let cards_images = document.querySelectorAll(".card_img")
                bodyBack(cards_images)
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
        reloadCards(res.data.results.slice(0, 4), popular_films)
        reloadCards(res.data.results.slice(15, 20), box_office)
        reloadTrailers(res.data.results, some_trailers)
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

        tabs(tabs_genre)
    })
let tabs_time = document.querySelectorAll(".tabs_time li")
let tabs_period = document.querySelectorAll(".tabs_period li")
let tabs_country = document.querySelectorAll(".tabs_country li")


tabs(tabs_time)
tabs(tabs_period)
tabs(tabs_country)

function tabs(tab_cont) {

    tab_cont.forEach(tab => {

        let key = tab.getAttribute("data-time")
        tab.onclick = () => {

            getDetails(`${key}`)
                .then(res => {
                    console.log(res);
                    reloadCards(res.data.results.slice(0, 4), popular_films)
                })

            tab_cont.forEach(tab => tab.classList.remove("active_tab"))

            tab.classList.add("active_tab")
        }

    })
}

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
