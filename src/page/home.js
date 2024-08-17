const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let completed = sessionStorage.getItem("index_typewriter") === "true";
if (!prefersReducedMotion && !completed) {
    const typewriter = document.getElementById("titleHeading");
    const fullText = typewriter.textContent;
    typewriter.textContent = " ";
    setTimeout(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < fullText.length) {
                typewriter.textContent += fullText.charAt(i);
                i++;
            } else {
                sessionStorage.setItem("index_typewriter", "true");
                clearInterval(interval);
            }
        }, 150);
    }, 1750)
}
