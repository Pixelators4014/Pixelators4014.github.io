if (document.getElementById('menu')) {
    document.getElementById('menu').scrollLeft = localStorage.getItem("menu-scroll-position");
    document.getElementById('menu').onscroll = function () {
        localStorage.setItem("menu-scroll-position", document.getElementById('menu').scrollLeft);
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        var id = this.getAttribute("href").substr(1);
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.querySelector(`[id='${decodeURIComponent(id)}']`).scrollIntoView({
                behavior: "smooth"
            });
        } else {
            document.querySelector(`[id='${decodeURIComponent(id)}']`).scrollIntoView();
        }
        if (id === "top") {
            history.replaceState(null, null, " ");
        } else {
            history.pushState(null, null, `#${id}`);
        }
    });
});

window.addEventListener("scroll", function(evt) {
    let navDiv = document.getElementById('nav-div');
    let topClasses = ["bg-background-0-light", "dark:bg-background-0-dark"];
    let scrollClasses = ["bg-background-0-light/10", "dark:bg-slate-background-0-dark/10", "border-b"]
    if (window.scrollY < 150) {
        for (let i = 0; i < topClasses.length; i++) {
            if (!navDiv.classList.contains(topClasses[i])) {
                navDiv.classList.add(topClasses[i]);
            }
        }
        for (let i = 0; i < scrollClasses.length; i++) {
            if (navDiv.classList.contains(scrollClasses[i])) {
                navDiv.classList.remove(scrollClasses[i]);
            }
        }
    } else {
        for (let i = 0; i < topClasses.length; i++) {
            if (navDiv.classList.contains(topClasses[i])) {
                navDiv.classList.remove(topClasses[i]);
            }
        }
        for (let i = 0; i < scrollClasses.length; i++) {
            if (!navDiv.classList.contains(scrollClasses[i])) {
                navDiv.classList.add(scrollClasses[i]);
            }
        }
    }
});
