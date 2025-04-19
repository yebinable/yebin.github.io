window.addEventListener("click", (event) => {
    if (event.target === menuButton) {
        // 기존 코드 유지
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

        // 수정된 부분: 파일명을 소문자로 변환
        const filename = (event.target.innerText + ".md").toLowerCase();

        if (filename === "blog.md") {
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
            url.searchParams.set("menu", filename);
            window.history.pushState({}, "", url);
            mobileMenu.innerHTML = "";
        } else {
            renderOtherContents(filename);
            mobileMenu.innerHTML = "";
        }
    } else {
        mobileMenu.innerHTML = "";
    }
});