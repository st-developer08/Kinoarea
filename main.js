import { header } from "./modules/header";
import { useHttp } from "./modules/https.request";
import { reloadCards, reloadTrailers } from "./modules/reload";
import { popular } from "./modules/requests";

let body = document.body

header()

const { request } = useHttp()

let some_trailers = document.querySelector(".some_trailers")
let trailers_player_btn = document.querySelector(".trailers_player_btn")
let popular_films = document.querySelector(".popular_films")
let expected_novelties = document.querySelector(".expected_novelties")
let box_office = document.querySelector(".box_office")


request(`/movie/popular`, 'get')
    .then(res => {

        reloadCards(res.data.results.slice(0, 8), cards)
        reloadCards(res.data.results.slice(9, 13), popular_films)
        reloadCards(res.data.results.slice(14, 18), expected_novelties)
        reloadCards(res.data.results.slice(15, 20), box_office)

        let cards_images = document.querySelectorAll(".card_img")

        cards_images.forEach(card_img => {

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

        reloadTrailers(res.data.results, some_trailers)
    })

popular()

let tabs_genre = document.querySelectorAll(".tabs li")
let tabs_time = document.querySelectorAll(".tabs_time li")
let tabs_period = document.querySelectorAll(".tabs_period li")
let tabs_country = document.querySelectorAll(".tabs_country li")

tabs(tabs_genre)
tabs(tabs_time)
tabs(tabs_period)
tabs(tabs_country)

function tabs(tab_cont) {

    tab_cont.forEach(tab => {

        tab.onclick = () => {
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