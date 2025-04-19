window.addEventListener("click", (event) => {
    const menuButton = document.getElementById("menu-button");
    const menu = document.getElementById("menu");
    const mobileMenu = document.getElementById("mobileMenu");


    if (event.target === menuButton) {
        if (mobileMenu.innerHTML === "") {
            mobileMenu.innerHTML = menu.innerHTML;
            const menuItems = mobileMenu.querySelectorAll("a");
            menuItems.forEach((item, index) => {
                item.classList.add(...mobileMenuStyle.split(" "));
                if (index == 0) {
                    item.classList.add("mt-1.5");
                }
                item.style.animation = `slideDown forwards ${index * 0.2}s`;
            });
        } else {
            mobileMenu.innerHTML = "";
        }
    } else if (event.target.parentNode === mobileMenu) {
        event.preventDefault();

        const targetMenuName = (event.target.innerText).toLowerCase();
        if (event.target.innerText + ".md" === "blog.md") {
            window.location.reload();
        } else {
            renderOtherContents(targetMenuName + ".md");
            mobileMenu.innerHTML = "";
        }
    } else {
        mobileMenu.innerHTML = "";
    }
});
