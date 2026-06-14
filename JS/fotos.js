(function () {
    "use strict";

    const galeria = document.getElementById("galeria");
    const lightbox = document.getElementById("lightbox");
    const lbImg = document.getElementById("lb-img");
    const lbCaption = document.getElementById("lb-caption");
    const lbClose = document.getElementById("lb-close");
    const lbPrev = document.getElementById("lb-prev");
    const lbNext = document.getElementById("lb-next");

    const items = Array.from(galeria.querySelectorAll(".item"));
    let currentIndex = 0;

    // ── Animación de entrada con IntersectionObserver ──
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    const delay = parseInt(item.dataset.index, 10) % 6 * 80;
                    setTimeout(() => item.classList.add("visible"), delay);
                    observer.unobserve(item);
                }
            });
        },
        { threshold: 0.1 }
    );

    items.forEach((item) => observer.observe(item));

    // ── Abrir lightbox ──
    function abrirLightbox(index) {
        currentIndex = index;
        const item = items[index];
        const img = item.querySelector("img");
        const caption = item.querySelector("p");

        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lbCaption.textContent = caption ? caption.textContent : "";

        lightbox.classList.add("abierto");
        document.body.style.overflow = "hidden";
        lbClose.focus();
    }

    function cerrarLightbox() {
        lightbox.classList.remove("abierto");
        document.body.style.overflow = "";
    }

    function navegar(direccion) {
        currentIndex = (currentIndex + direccion + items.length) % items.length;
        const item = items[currentIndex];
        const img = item.querySelector("img");
        const caption = item.querySelector("p");

        lbImg.style.opacity = "0";
        lbImg.style.transform = "scale(0.92)";

        setTimeout(() => {
            lbImg.src = img.src;
            lbImg.alt = img.alt;
            lbCaption.textContent = caption ? caption.textContent : "";
            lbImg.style.opacity = "1";
            lbImg.style.transform = "scale(1)";
        }, 200);
    }

    lbImg.style.transition = "opacity 0.2s ease, transform 0.2s ease";

    // ── Eventos ──
    items.forEach((item, index) => {
        item.addEventListener("click", () => abrirLightbox(index));
        item.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                abrirLightbox(index);
            }
        });
        item.setAttribute("tabindex", "0");
        item.setAttribute("role", "button");
        item.setAttribute("aria-label", `Ver foto ${index + 1}`);
    });

    lbClose.addEventListener("click", cerrarLightbox);
    lbPrev.addEventListener("click", () => navegar(-1));
    lbNext.addEventListener("click", () => navegar(1));

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) cerrarLightbox();
    });

    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("abierto")) return;
        if (e.key === "Escape") cerrarLightbox();
        if (e.key === "ArrowLeft") navegar(-1);
        if (e.key === "ArrowRight") navegar(1);
    });
})();