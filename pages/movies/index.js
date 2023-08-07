import { Chart, registerables } from "chart.js";
import { header } from "../../modules/header";
import { getDetails } from "../../modules/https.request";
import { getRandomElements, img, reloadActors, reloadCards, reloadEmployee, reloadProduction } from "../../modules/reload";
import { scrollToTop } from "../../modules/scrollToTop";

Chart.register(...registerables)
header()

let body = document.body
let social_icons = [
    "vk",
    "instagram",
    "facebook",
    "twitter"
]
scrollToTop(body)
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
let counter_kinoarea_cont = document.querySelector(".rate__counter_kinoarea")
let counter_imdb = document.querySelector(".rate__counter_IMDb span")
let counter_imdb_cont = document.querySelector(".rate__counter_IMDb")
let description = document.querySelector(".description")
let movie_img = document.querySelector(".movie_img img")
let watch = document.querySelector(".links_parent button")
let expectation_rating_count = document.querySelector(".expectation_rating span")
let expectation_rating_line = document.querySelector(".expectation_rating .line")
let favorited = document.querySelector(".statistic p")
let trailers_title = document.querySelector(".trailers_title h2")
let posters_title = document.querySelectorAll(".posters_title")
let like = document.querySelector(".like .counter")
let dislike = document.querySelector(".dislike .counter")

const iframe = document.querySelector('.trailers_player')
let actors_container = document.querySelector('.actors_container')
let posters_container = document.querySelector('.posters_container')
let stills_container = document.querySelector('.stills_container')
let similar_films = document.querySelector('.similar_films')
let directors = document.querySelector('.directors')
let production_companies_list = document.querySelector('.production_companies ul')
let special_effects = document.querySelector('.special_effects ul')
let dubbing_studio = document.querySelector(".dubbing_studio span")
let adult_value = document.querySelector(".adult_value")
let collection_value = document.querySelector(".collection_value")
let tagline_value = document.querySelector(".tagline_value")
let budget_value = document.querySelector(".budget_value")
let genres_value = document.querySelector(".genres_value")
let original_language_value = document.querySelector(".original_language_value")
let default_title_value = document.querySelector(".default_title_value")
let original_title_value = document.querySelector(".original_title_value")
let vote_average_value = document.querySelector(".vote_average_value")
let vote_count_value = document.querySelector(".vote_count_value")
let status_value = document.querySelector(".status_value")
let spoken_languages_value = document.querySelector(".spoken_languages_value")
let runtime_value = document.querySelector(".runtime_value")
let release_date_value = document.querySelector(".release_date_value")
let production_company_value = document.querySelector(".production_company_value")
let production_country_value = document.querySelector(".production_country_value")
let homepage = document.querySelector(".homepage_value")
let popularity_value = document.querySelector(".popularity_value")

const movie_id = location.search.split('=').at(-1)

getDetails(`/movie/${movie_id}`)
    .then(res => {
        let { data: { production_companies, production_countries, genres, belongs_to_collection } } = res

        adult_value.innerHTML = res.data.adult === false ? "No" : "Yes"
        collection_value.innerHTML = res.data.belongs_to_collection?.name || "No"
        tagline_value.innerHTML = res.data.tagline
        budget_value.innerHTML = res.data.budget + "$"
        genres_value.innerHTML = genres[0].name
        original_language_value.innerHTML = res.data.original_language.toUpperCase()
        default_title_value.innerHTML = res.data.title
        document.title = res.data.title
        original_title_value.innerHTML = res.data.original_title
        vote_average_value.innerHTML = res.data.vote_average.toFixed(2)
        vote_count_value.innerHTML = res.data.vote_count
        status_value.innerHTML = res.data.status
        spoken_languages_value.innerHTML = res.data.spoken_languages[0].name
        runtime_value.innerHTML = res.data.runtime + " min."
        release_date_value.innerHTML = res.data.release_date
        production_company_value.innerHTML = res.data.production_companies[0].name
        production_country_value.innerHTML = res.data.production_countries[0].name
        popularity_value.innerHTML = Math.round(res.data.popularity)

        let all_value = document.querySelectorAll(".bottom_info .yellow")
        all_value.forEach(value => {
            value.innerHTML = value.innerHTML.slice(0, 35)
        })
        homepage.innerHTML = `<a class="yellow" target="_blank" href="${res.data.homepage}">${res.data.homepage.slice(0, 30)}...</a>`
        path.innerHTML = res.data.title
        title.innerHTML = res.data.title
        trailers_title.innerHTML = res.data.title
        like.innerHTML = res.data.vote_count
        dislike.innerHTML = Math.round(res.data.vote_count / 4)
        original_title.innerHTML = res.data.original_title
        description.innerHTML = res.data.overview
        counter_kinoarea.innerHTML = (res.data.vote_average + 1.32).toFixed(2) > 10 ? '10.00' : (res.data.vote_average + 1.32).toFixed(2)
        counter_imdb.innerHTML = res.data.vote_average.toFixed(2)
        dubbing_studio.innerHTML = "1. " + (res.data.belongs_to_collection?.name || "No")

        posters_title.forEach(title => {
            title.innerHTML = res.data.title
        })

        movie_img.src = `${img + res.data.poster_path}`



        watch.onclick = () => {
            window.scrollTo({
                top: 1880,
                behavior: 'smooth'
            });
        }

        expectation_rating_count.innerHTML = ` Expectation Rating ${(res.data.vote_average * 10).toFixed(0)}%`
        expectation_rating_line.style.width = `${res.data.vote_average * 10}%`
        favorited.innerHTML = ` Favorited by ${Math.round(res.data.popularity)} people`

        reloadProduction(production_companies, production_companies_list)
        reloadProduction(production_countries, special_effects)
        counter_kinoarea_cont.style.background = getColorByNumber(res.data.vote_average + 1.32 > 10 ? 10 : res.data.vote_average + 1.32) + "50"
        counter_imdb_cont.style.background = getColorByNumber(res.data.vote_average) + "50"
        body.style.backgroundImage = `url(${img + res.data.backdrop_path})` === "url(https://image.tmdb.org/t/p/originalnull)" ? `url(/images/joker.png)` : `url(${img + res.data.backdrop_path})`

        let firstNum = (res.data.vote_average + 1.32) * 10 >= 100 ? 100 : (res.data.vote_average + 1.32) * 10

        new Chart(kinoarea_ctx, {
            type: 'doughnut',
            data: {
                labels: ['Kinoarea', 'Kinoarea',],
                datasets: [{
                    data: [firstNum, 100 - firstNum],
                    backgroundColor: [getColorByNumber(res.data.vote_average + 1.32 > 10 ? 10 : res.data.vote_average + 1.32),
                        'transparent'],
                    cutout: '70%',
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
                labels: ['IMDb', 'IMDb',],
                datasets: [{
                    data: [res.data.vote_average * 10, 100 - res.data.vote_average * 10],
                    backgroundColor: [getColorByNumber(res.data.vote_average), "transparent"],
                    cutout: '70%',
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

        if (videoObj.length) {
            iframe.src = `https://www.youtube.com/embed/${videoObj[0].key}`
        } else {
            iframe.src = "https://www.youtube.com/embed/z3GS5oYGq5U"
        }
    })
getDetails(`/movie/${movie_id}/images`)
    .then(res => {
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

function getColorByNumber(number) {
    const colors = {
        10: "#28FF04",
        9: "#34EA16",
        8: "#4BCB36",
        7: "#78CB36",
        6: "#89CB36",
        5: "#CB6C36",
        4: "#CB3F36",
        3: "#DA3434",
        2: "#F13030",
        1: "#ff0000",
        0: "#ff0000"
    };

    return colors[number.toFixed(0)] || "Недопустимая цифра";
}
