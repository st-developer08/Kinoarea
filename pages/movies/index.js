import { Chart, registerables } from "chart.js";
import { header } from "../../modules/header";
import { getDetails } from "../../modules/https.request";
import { getRandomElements, img, reloadActors, reloadCards, reloadEmployee, reloadProduction } from "../../modules/reload";

Chart.register(...registerables)

header()

let body = document.body
let social_icons = [
    "vk",
    "instagram",
    "facebook",
    "twitter"
]

let social = document.querySelector(".movie_text .social")

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

const kinoarea_ctx = document.getElementById('kinoareaChart').getContext('2d');

let path = document.querySelector(".endpoint")
let title = document.querySelector(".title")
let original_title = document.querySelector(".original_title")
let counter_kinoarea = document.querySelector(".rate__counter_kinoarea span")
let counter_imdb = document.querySelector(".rate__counter_IMDb span")
let description = document.querySelector(".description")
let movie_img = document.querySelector(".movie_img img")
let watch = document.querySelector(".links_parent a")
let expectation_rating_count = document.querySelector(".expectation_rating span")
let expectation_rating_line = document.querySelector(".expectation_rating .line")
let favorited = document.querySelector(".statistic p")
let trailers_title = document.querySelector(".trailers_title h2")
let posters_title = document.querySelectorAll(".posters_title")
let like = document.querySelector(".like .counter")
let dislike = document.querySelector(".dislike .counter")

let bottom_info = document.querySelector('.bottom_info')
const iframe = document.querySelector('.trailers_player')
let actors_container = document.querySelector('.actors_container')
let posters_container = document.querySelector('.posters_container')
let stills_container = document.querySelector('.stills_container')
let similar_films = document.querySelector('.similar_films')
let directors = document.querySelector('.directors')
let production_companies_list = document.querySelector('.production_companies ul')
let special_effects = document.querySelector('.special_effects ul')

const movie_id = location.search.split('=').at(-1)

function trimObjectTo20Keys(obj) {
    const trimmedObject = {};
    let count = 0;

    for (const key in obj) {
        if (count === 18) break;
        trimmedObject[key] = obj[key];
        count++;
    }

    return trimmedObject;
}

getDetails(`/movie/${movie_id}`)
    .then(res => {
        const trimmedObject = trimObjectTo20Keys(res.data);
        bottom_info.innerHTML = ""
        for (let item in trimmedObject) {
            bottom_info.innerHTML += `
            <li> <span class="regular">${item}:</span> <span class="yellow">${typeof res.data[item]}</span></li>
            `
        }
        path.innerHTML = res.data.title
        title.innerHTML = res.data.title
        trailers_title.innerHTML = res.data.title
        like.innerHTML = res.data.vote_count
        dislike.innerHTML = Math.round(res.data.vote_count / 4)
        original_title.innerHTML = res.data.original_title
        description.innerHTML = res.data.overview
        counter_kinoarea.innerHTML = (res.data.vote_average + 2).toFixed(2) > 10 ? 10 : (res.data.vote_average + 2).toFixed(2)
        counter_imdb.innerHTML = res.data.vote_average.toFixed(2)
        posters_title.forEach(title => {
            title.innerHTML = res.data.title
        })
        movie_img.src = `${img + res.data.poster_path}`
        watch.href = `${res.data.homepage}`
        expectation_rating_count.innerHTML = ` Expectation Rating ${(res.data.vote_average * 10).toFixed(0)}%`
        expectation_rating_line.style.width = `${res.data.vote_average * 10}%`
        favorited.innerHTML = ` Favorited by ${Math.round(res.data.popularity)} people`

        let { data: { production_companies, production_countries } } = res
        console.log(res);
        reloadProduction(production_companies, production_companies_list)
        reloadProduction(production_countries, special_effects)

        body.style.backgroundImage = `url(${img + res.data.backdrop_path})`

        let firstNum = (res.data.vote_average + 2) * 10 >= 100 ? 100 : (res.data.vote_average + 2) * 10
        new Chart(kinoarea_ctx, {
            type: 'doughnut',
            data: {
                labels: ['Blue', 'Green',],
                datasets: [{
                    data: [firstNum, 100 - firstNum],
                    backgroundColor: ['#4acb36', '#4bcb364d'],
                    borderWidth: 0
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false, // Убрать надписи сбоку (легенда)
                    }
                }
            }
        });

        const imdb_ctx = document.getElementById('IMDbChart').getContext('2d');

        new Chart(imdb_ctx, {
            type: 'doughnut',
            data: {
                labels: ['Blue', 'Green',],
                datasets: [{
                    data: [res.data.vote_average * 10, 100 - res.data.vote_average * 10],
                    backgroundColor: ['#88cb36', '#88cb3653'],
                    borderWidth: 0
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false, // Убрать надписи сбоку (легенда)
                    }
                }
            }
        });
        let { data: { genres } } = res

        getDetails("/movie/top_rated")
            .then(second_res => {
                let similar_arr = []
                let { data: { results } } = second_res

                const genreIdsSet = new Set(genres.map(genre => genre.id));

                results.forEach(item => {
                    if (item.genre_ids.some(genreId => genreIdsSet.has(genreId))) {
                        similar_arr.push(item);
                    }
                    reloadCards(getRandomElements(similar_arr, 4), similar_films);
                });

                similar_arr.length = 0;

            });

    })

getDetails(`/movie/${movie_id}/credits`)
    .then(res => {
        reloadActors(res.data.cast.slice(0, 10), actors_container)
        reloadEmployee(getRandomElements(res.data.crew, 2), directors)
    })

getDetails(`/movie/${movie_id}/videos`)
    .then(res => {
        let videoObj = getRandomElements(res.data.results, 1)

        iframe.src = `https://www.youtube.com/embed/${videoObj[0].key}`
    })
getDetails(`/movie/${movie_id}/images`)
    .then(res => {
        // console.log(res.data);
        for (let item of getRandomElements(res.data.posters, 4)) {
            posters_container.innerHTML += `
                <img src="${img + item.file_path}" alt="" />
            `
        }
        stills_container.innerHTML = ""

        for (let item of getRandomElements(res.data.backdrops, 6)) {
            let stills_item = document.createElement("div")
            stills_item.className = "stills_item"
            stills_item.style.backgroundImage = `url(${img + item.file_path})`
            stills_container.append(stills_item)
        }
    })

let social_sub = document.querySelector(".social_sub")

for (let icon of social_icons) {
    let li_social = document.createElement("li")
    let a_social = document.createElement("a")
    let icon_social = document.createElement("img")

    icon_social.src = `/icons/${icon}.svg`
    icon_social.alt = `${icon}`
    a_social.href = "#"

    a_social.append(icon_social)
    li_social.append(a_social)
    social_sub.append(li_social, more)
}
