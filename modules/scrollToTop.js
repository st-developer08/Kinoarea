export function scrollToTop(cont) {
    let btn = document.createElement("button");
    btn.classList.add("scrollToTop");
    cont.append(btn);

    
    btn.onclick = () => {
        smoothScrollTo(0, 1200); 
    };

  
    window.addEventListener("scroll", () => {
        let { height, top } = cont.getBoundingClientRect();
        if (Math.abs(top) > height) {
            btn.style.bottom = "30px"; 
        } else {
            btn.style.bottom = "-50px";
        }
    });
}

function smoothScrollTo(targetY = 0, duration = 600) {
    const startY = window.pageYOffset || document.documentElement.scrollTop;
    const change = targetY - startY;
    const startTime = performance.now();

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function animate(currentTime) {
        const elapsed = Math.min(1, (currentTime - startTime) / duration);
        const progress = easeInOutQuad(elapsed);
        const newY = startY + change * progress;

        window.scrollTo(0, newY);

        if (elapsed < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}
