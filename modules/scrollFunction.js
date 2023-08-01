export function scrollToX(cont) {

    let isMouseDown = false;
    let startX;
    let scrollLeft;

    cont.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.pageX - cont.offsetLeft;
        scrollLeft = cont.scrollLeft;
    });

    cont.addEventListener('mouseleave', () => {
        isMouseDown = false;
        cont.style.background = "none"
        cont.style.opacity = "1"
    });

    cont.addEventListener('mouseup', () => {
        isMouseDown = false;
        cont.style.background = "none"
        cont.style.opacity = "1"
    });

    cont.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - cont.offsetLeft;
        const walk = (x - startX);
        cont.scrollLeft = scrollLeft - walk*3;
        cont.style.background = "#0000007f"
    });
}
export function scrollToY(cont) {

    let isMouseDown = false;
    let startY;
    let scrollTop;

    cont.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startY = e.pageY - cont.offsetTop;
        scrollTop = cont.scrollTop;
    });

    cont.addEventListener('mouseleave', () => {
        isMouseDown = false;
    });

    cont.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    cont.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const y = e.pageY - cont.offsetTop;
        const walk = (y - startY) * 2;
        cont.scrollTop = scrollTop - walk;
    });
}