export function scrollToTop(cont) {
    let btn = document.createElement("button")
    btn.classList.add("scrollToTop")
    cont.append(btn)
    window.onscroll = () => {
        let { height, top } = cont.getBoundingClientRect()
        console.log(height, Math.abs(top));
        if (Math.abs(top) > height) {
            btn.style.bottom = "30px"
        } else {
            btn.style.bottom = "-50px"
        }
        btn.onclick = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            btn.style.bottom = "-50px"
        }
    }
}