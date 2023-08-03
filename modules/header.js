import {
    getDetails
} from "./https.request"

export function header() {
    let body = document.body
    let header = document.createElement("header")
    let container = document.createElement("div")
    let inner_header = document.createElement("div")
    let left = document.createElement("div")
    let logo = document.createElement("div")
    let logo_img = document.createElement("img")
    let ul_social = document.createElement("ul")

    let social_icons = [
        "vk",
        "instagram",
        "facebook",
        "twitter"
    ]
    let links_text = [
        "Poster",
        "Media",
        "Filters",
        "Actors",
        "News",
        "Collections",
        "Categories"
    ]

    for (let icon of social_icons) {
        let li_social = document.createElement("li")
        let a_social = document.createElement("a")
        let icon_social = document.createElement("img")

        icon_social.src = `/icons/${icon}.svg`
        icon_social.alt = `${icon}`
        a_social.href = "#"

        a_social.append(icon_social)
        li_social.append(a_social)
        ul_social.append(li_social)
    }

    let center = document.createElement("nav")
    let links = document.createElement("ul")

    for (let text of links_text) {

        let li = document.createElement("li")
        let a = document.createElement("a")

        a.innerHTML = `${text}`
        a.href = `#`

        li.append(a)
        links.append(li)

    }

    let right = document.createElement("div")
    let search = document.createElement("input")
    let sign_in = document.createElement("button")

    container.className = "container"
    inner_header.className = "header"
    left.className = "left"
    logo.className = "logo"

    logo_img.src = "/icons/logo.svg"
    logo_img.alt = "logo"

    ul_social.className = "social"

    center.className = "center"
    links.className = "links"

    right.className = "right"
    search.type = "text"
    search.name = "search"

    sign_in.className = "sign_in"
    sign_in.innerHTML = "Sign in"

    header.append(container)
    container.append(inner_header)
    inner_header.append(left, center, right)
    left.append(logo, ul_social)
    logo.append(logo_img)

    center.append(links)

    right.append(search, sign_in)

    body.prepend(header)

    search.onfocus = () => {
        search.className = "inp_opened"
    }

    search.onblur = () => {
        search.classList.remove("inp_opened")
    }

    logo.onclick = () => {
        location.assign("/")
    }
    // /3/search/movie
    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    }

    function getData() {
        let val = search.value.toLowerCase().trim()

        if (!val) return

        getDetails(`/search/movie?query=${val}`)
            .then(res => console.log(res))
    }
    search.onkeyup = debounce(() => getData())
}