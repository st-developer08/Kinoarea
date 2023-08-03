import { formatDateToCustomFormat } from "../../modules/customFormatDate";
import { header } from "../../modules/header";
import { getDetails } from "../../modules/https.request";
import { img } from "../../modules/reload";
import { scrollToTop } from "../../modules/scrollToTop";

header()
let body = document.body
scrollToTop(body)
let person_id = location.search.split("=").at(-1)

let actor_img = document.querySelector(".movie_img img")
let path = document.querySelector(".endpoint")
let title = document.querySelector(".title")
let original_title = document.querySelector(".original_title")
let career = document.querySelector(".career")
let birthday = document.querySelector(".birthday")
let place_of_birth = document.querySelector(".place_of_birth")
let cont = document.querySelector(".cont")
let favorited = document.querySelector(".statistic p")
let popularity = document.querySelector(".popularity")
let gender = document.querySelector(".gender")
let actor_tabs = document.querySelectorAll(".actor_tabs span")
let actor_bio_text = document.querySelector(".actor_bio p")

getDetails(`/person/${person_id}`)
    .then(res => {

        let tabs = {
            actor_bio: document.querySelector(".actor_bio"),
            actor_info: document.querySelector(".actor_info")
        }

        actor_tabs.forEach(tab => {
            let key = tab.getAttribute("data-tab");
            tab.onclick = () => {

                let activeTab = document.querySelector(".active_tab");
                if (activeTab) {
                    let activeKey = activeTab.getAttribute("data-tab");
                    tabs[activeKey].style.display = "none";
                    activeTab.classList.remove("active_tab");
                }


                tabs[key].style.display = "flex";
                tab.classList.add("active_tab");
            };
        });
        let { data: { also_known_as } } = res
        actor_img.src = `${img + res.data.profile_path}` === `https://image.tmdb.org/t/p/originalnull` ? `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHhZY638DYGWcclgVIYXT-Vre_jGoxzoeoaQ&usqp=CAU` : `${img + res.data.profile_path}`
        document.title = res.data.name
        path.innerHTML = res.data.name
        title.innerHTML = res.data.name
        original_title.innerHTML = res.data.name
        career.innerHTML = res.data.known_for_department
        gender.innerHTML = res.data.gender === 1 ? "Female" : "Male"
        birthday.innerHTML = formatDateToCustomFormat(res.data.birthday)
        place_of_birth.innerHTML = res.data.place_of_birth + "."
        cont.innerHTML = ``
        actor_bio_text.innerHTML = res.data.biography
        console.log(res.data);

        const maxIterations = Math.min(also_known_as.length, 4);

        for (let i = 0; i < maxIterations; i++) {
            const name = also_known_as[i];
            const isLastElement = i === maxIterations - 1;
            const separator = isLastElement ? '.' : ',';

            cont.innerHTML += `<span class="yellow also_known_as">${name}${separator} </span>`;
        }


        popularity.innerHTML = res.data.popularity
        favorited.innerHTML = `Favorited by ${res.data.id} people`

    })