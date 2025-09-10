import { Chart, registerables } from "chart.js";
import { header } from "../../modules/header";
import { getDetails } from "../../modules/https.request";
import {
  getRandomElements,
  img,
  reloadActors,
  reloadCards,
  reloadEmployee,
  reloadProduction,
} from "../../modules/reload";
import { scrollToTop } from "../../modules/scrollToTop";

Chart.register(...registerables);
header();

let body = document.body;
let social_icons = ["vk", "instagram", "facebook", "twitter"];
scrollToTop(body);

let social = document.querySelector(".movie_text .social");
let more = document.createElement("li");
more.innerHTML = "...";
more.style.cursor = "pointer";
more.style.paddingBottom = "10px";

for (let icon of social_icons) {
  let li_social = document.createElement("li");
  let a_social = document.createElement("a");
  let icon_social = document.createElement("img");

  icon_social.src = `/icons/${icon}.svg`;
  icon_social.alt = icon;
  a_social.href = "#";

  a_social.append(icon_social);
  li_social.append(a_social);
  social.append(li_social, more);
}

const kinoarea_ctx = document.getElementById("kinoareaChart").getContext("2d");
const imdb_ctx = document.getElementById("IMDbChart").getContext("2d");

let path = document.querySelector(".endpoint");
let title = document.querySelector(".title");
let original_title = document.querySelector(".original_title");
let counter_kinoarea = document.querySelector(".rate__counter_kinoarea span");
let counter_kinoarea_cont = document.querySelector(".rate__counter_kinoarea");
let counter_imdb = document.querySelector(".rate__counter_IMDb span");
let counter_imdb_cont = document.querySelector(".rate__counter_IMDb");
let description = document.querySelector(".description");
let movie_img = document.querySelector(".movie_img img");
let watch = document.querySelector(".links_parent button");
let expectation_rating_count = document.querySelector(".expectation_rating span");
let expectation_rating_line = document.querySelector(".expectation_rating .line");
let favorited = document.querySelector(".statistic p");
let trailers_title = document.querySelector(".trailers_title h2");
let like = document.querySelector(".like .counter");
let dislike = document.querySelector(".dislike .counter");

const iframe = document.querySelector(".trailers_player");
let actors_container = document.querySelector(".actors_container");
let similar_films = document.querySelector(".similar_films");
let directors = document.querySelector(".directors");
let production_companies_list = document.querySelector(".production_companies ul");
let special_effects = document.querySelector(".special_effects ul");
let dubbing_studio = document.querySelector(".dubbing_studio span");
let adult_value = document.querySelector(".adult_value");
let collection_value = document.querySelector(".collection_value");
let tagline_value = document.querySelector(".tagline_value");
let budget_value = document.querySelector(".budget_value");
let genres_value = document.querySelector(".genres_value");
let original_language_value = document.querySelector(".original_language_value");
let default_title_value = document.querySelector(".default_title_value");
let original_title_value = document.querySelector(".original_title_value");
let vote_average_value = document.querySelector(".vote_average_value");
let vote_count_value = document.querySelector(".vote_count_value");
let status_value = document.querySelector(".status_value");
let spoken_languages_value = document.querySelector(".spoken_languages_value");
let runtime_value = document.querySelector(".runtime_value");
let release_date_value = document.querySelector(".release_date_value");
let production_company_value = document.querySelector(".production_company_value");
let production_country_value = document.querySelector(".production_country_value");
let homepage = document.querySelector(".homepage_value");
let popularity_value = document.querySelector(".popularity_value");

const movie_id = location.search.split("=").at(-1);

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
    0: "#ff0000",
  };
  return colors[number.toFixed(0)] || "#ffffff";
}

function smoothScrollTo(targetY, duration = 600) {
  const startY = window.scrollY;
  const distanceY = targetY - startY;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    window.scrollTo(0, startY + distanceY * ease);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}

document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute("href").slice(1);
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  const targetY = target.getBoundingClientRect().top + window.pageYOffset;
  smoothScrollTo(targetY, 1000);
});

watch.addEventListener("click", () => {
  const targetY = iframe.getBoundingClientRect().top + window.pageYOffset;
  smoothScrollTo(targetY, 1000);
});

getDetails(`/movie/${movie_id}`).then((res) => {
  const { data } = res;
  const { production_companies, production_countries, genres, belongs_to_collection } = data;

  adult_value.innerHTML = data.adult ? "Yes" : "No";
  collection_value.innerHTML = belongs_to_collection?.name || "No";
  tagline_value.innerHTML = data.tagline || "-";
  budget_value.innerHTML = data.budget + "$";
  genres_value.innerHTML = genres[0]?.name || "-";
  original_language_value.innerHTML = data.original_language.toUpperCase();
  default_title_value.innerHTML = data.title;
  document.title = data.title;
  original_title_value.innerHTML = data.original_title;
  vote_average_value.innerHTML = data.vote_average.toFixed(2);
  vote_count_value.innerHTML = data.vote_count;
  status_value.innerHTML = data.status;
  spoken_languages_value.innerHTML = data.spoken_languages[0]?.name || "-";
  runtime_value.innerHTML = data.runtime + " min.";
  release_date_value.innerHTML = data.release_date;
  production_company_value.innerHTML = production_companies[0]?.name || "-";
  production_country_value.innerHTML = production_countries[0]?.name || "-";
  popularity_value.innerHTML = Math.round(data.popularity);

  path.innerHTML = data.title;
  title.innerHTML = data.title;
  trailers_title.innerHTML = data.title;
  like.innerHTML = data.vote_count;
  dislike.innerHTML = Math.round(data.vote_count / 4);
  original_title.innerHTML = data.original_title;
  description.innerHTML = data.overview;
  movie_img.src = img + data.poster_path;

  counter_kinoarea.innerHTML = Math.min(data.vote_average + 1.32, 10).toFixed(2);
  counter_imdb.innerHTML = data.vote_average.toFixed(2);
  dubbing_studio.innerHTML = "1. " + (belongs_to_collection?.name || "No");

  expectation_rating_count.innerHTML = `Expectation Rating ${(data.vote_average * 10).toFixed(0)}%`;
  expectation_rating_line.style.width = `${data.vote_average * 10}%`;
  favorited.innerHTML = `Favorited by ${Math.round(data.popularity)} people`;

  counter_kinoarea_cont.style.background = getColorByNumber(Math.min(data.vote_average + 1.32, 10)) + "50";
  counter_imdb_cont.style.background = getColorByNumber(data.vote_average) + "50";

  body.style.backgroundImage =
    data.backdrop_path ? `url(${img + data.backdrop_path})` : `url(/images/joker.png)`;

  const firstNum = Math.min((data.vote_average + 1.32) * 10, 100);
  new Chart(kinoarea_ctx, {
    type: "doughnut",
    data: {
      labels: ["Kinoarea", "Kinoarea"],
      datasets: [{ data: [firstNum, 100 - firstNum], backgroundColor: [getColorByNumber(Math.min(data.vote_average + 1.32, 10)), "transparent"], cutout: "70%", borderWidth: 0 }],
    },
    options: { plugins: { legend: { display: false } } },
  });

  new Chart(imdb_ctx, {
    type: "doughnut",
    data: {
      labels: ["IMDb", "IMDb"],
      datasets: [{ data: [data.vote_average * 10, 100 - data.vote_average * 10], backgroundColor: [getColorByNumber(data.vote_average), "transparent"], cutout: "70%", borderWidth: 0 }],
    },
    options: { plugins: { legend: { display: false } } },
  });

  getDetails("/movie/top_rated").then((topRated) => {
    const similar_arr = [];
    const genreIdsSet = new Set(genres.map((genre) => genre.id));
    topRated.data.results.forEach((item) => {
      if (item.genre_ids.some((genreId) => genreIdsSet.has(genreId))) similar_arr.push(item);
    });
    reloadCards(getRandomElements(similar_arr, 4), similar_films);
  });

  reloadProduction(production_companies, production_companies_list);
  reloadProduction(production_countries, special_effects);

  getDetails(`/movie/${movie_id}/videos`).then((resVideos) => {
    const videoObj = getRandomElements(resVideos.data.results, 1);
    iframe.src = videoObj.length
      ? `https://www.youtube.com/embed/${videoObj[0].key}`
      : "https://www.youtube.com/embed/z3GS5oYGq5U";
  });

  // Актеры и режиссеры
  getDetails(`/movie/${movie_id}/credits`).then((resCredits) => {
    reloadActors(resCredits.data.cast.slice(0, 10), actors_container);
    reloadEmployee(getRandomElements(resCredits.data.crew, 2), directors);
  });
});

let social_sub = document.querySelector(".social_sub");
for (let icon of social_icons) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  const imgEl = document.createElement("img");

  imgEl.src = `/icons/${icon}.svg`;
  imgEl.alt = icon;
  a.href = "#";

  a.appendChild(imgEl);
  li.appendChild(a);
  social_sub.appendChild(li, more);
}
