export function tabs(tab_cont) {

    tab_cont.forEach(tab => {

        tab.onclick = () => {

            tab_cont.forEach(tab => tab.classList.remove("active_tab"))

            tab.classList.add("active_tab")
        }

    })
}