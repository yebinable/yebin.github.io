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

        if (event.target.innerText + ".md" === "blog.md") {
            if (blogList.length === 0) {
                // 블로그 리스트 로딩
                initDataBlogList().then(() => {
                    renderBlogList();
                });
            } else {
                renderBlogList();
            }
            // console.log(origin)
            const url = new URL(origin);
            url.searchParams.set("menu", event.target.innerText.toLowercase() + ".md");
            window.history.pushState({}, "", url);
            mobileMenu.innerHTML = "";
        } else {
            renderOtherContents(event.target.innerText.toLowercase() + ".md");
            mobileMenu.innerHTML = "";
        }
    } else {
        mobileMenu.innerHTML = "";
    }
});
