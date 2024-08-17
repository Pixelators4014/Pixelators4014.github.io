document.getElementById("theme-toggle").addEventListener("click", () => {
    console.debug("Theme toggle clicked");
    if (document.body.classList.contains("dark")) {
        document.body.classList.remove('dark');
        localStorage.setItem("pref-theme", 'light');
    } else {
        document.body.classList.add('dark');
        localStorage.setItem("pref-theme", 'dark');
    }
})
