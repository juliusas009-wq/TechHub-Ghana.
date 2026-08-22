/* =========================================================
   TECHHUB GHANA
   GHANA TECH AUTOMATIC NEWS SYSTEM
   SEARCH + FILTER + LIVE JSON NEWS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. ELEMENTS
    ====================================================== */

    const searchInput =
        document.getElementById("ghanaSearch");

    const topSearch =
        document.getElementById("siteSearch");

    const searchButton =
        document.querySelector("#searchForm button");

    const localSearchButton =
        document.getElementById("ghanaSearchBtn");

    const filters =
        document.querySelectorAll(".ghana-filter");

    const newsGrid =
        document.getElementById("ghanaNewsGrid");

    const featured =
        document.getElementById("ghanaFeatured");

    const message =
        document.getElementById("ghanaSearchMessage");

    const noResults =
        document.getElementById("noGhanaNews");

    const newsSection =
        document.getElementById("ghanaNews");

    const countElement =
        document.getElementById("ghanaNewsCount");

    const trendingLinks =
        document.querySelectorAll(
            ".ghana-trending-grid a[data-trending]"
        );


    /* =====================================================
       2. SETTINGS
    ====================================================== */

    const NEWS_FILE =
        "data/ghana-tech-news.json";

    let currentCategory = "All";

    let allArticles = [];

    let isLoading = false;


    /* =====================================================
       3. NORMALIZE TEXT
    ====================================================== */

    function normalize(value) {

        return String(value || "")
            .toLowerCase()
            .trim();

    }


    /* =====================================================
       4. ESCAPE HTML
       
       Protects the page when news content comes
       from an external RSS source.
    ====================================================== */

    function escapeHTML(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       5. REMOVE HTML FROM DESCRIPTIONS
    ====================================================== */

    function cleanText(value) {

        const temporary =
            document.createElement("div");

        temporary.innerHTML =
            String(value || "");

        return temporary.textContent
            .replace(/\s+/g, " ")
            .trim();

    }


    /* =====================================================
       6. SHORTEN DESCRIPTION
    ====================================================== */

    function shortenText(
        text,
        maximumLength = 150
    ) {

        const clean =
            cleanText(text);

        if (clean.length <= maximumLength) {

            return clean;

        }

        return (
            clean.substring(
                0,
                maximumLength
            ).trim() + "..."
        );

    }


    /* =====================================================
       7. FORMAT DATE
    ====================================================== */

    function formatDate(value) {

        if (!value) {

            return "Today";

        }

        const date =
            new Date(value);

        if (Number.isNaN(date.getTime())) {

            return "Today";

        }

        const now =
            new Date();

        const difference =
            now.getTime() -
            date.getTime();

        const minutes =
            Math.floor(
                difference / 60000
            );

        const hours =
            Math.floor(
                difference / 3600000
            );

        const days =
            Math.floor(
                difference / 86400000
            );


        if (minutes < 1) {

            return "Just now";

        }

        if (minutes < 60) {

            return (
                minutes +
                " min" +
                (minutes === 1 ? "" : "s") +
                " ago"
            );

        }

        if (hours < 24) {

            return (
                hours +
                " hour" +
                (hours === 1 ? "" : "s") +
                " ago"
            );

        }

        if (days === 1) {

            return "Yesterday";

        }

        if (days < 7) {

            return (
                days +
                " days ago"
            );

        }

        return date.toLocaleDateString(
            "en-GH",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

    }


    /* =====================================================
       8. CATEGORY ICON
    ====================================================== */

    function getCategoryIcon(category) {

        const value =
            normalize(category);


        if (
            value.includes("artificial") ||
            value === "ai"
        ) {

            return "🤖";

        }

        if (
            value.includes("cyber")
        ) {

            return "🔐";

        }

        if (
            value.includes("fintech") ||
            value.includes("finance") ||
            value.includes("mobile money")
        ) {

            return "💳";

        }

        if (
            value.includes("startup")
        ) {

            return "🚀";

        }

        if (
            value.includes("innovation")
        ) {

            return "💡";

        }

        return "🇬🇭";

    }


    /* =====================================================
       9. CATEGORY NAME
    ====================================================== */

    function getCategoryName(category) {

        const value =
            String(category || "").trim();

        if (!value) {

            return "Ghana Technology";

        }

        return value;

    }


    /* =====================================================
       10. CREATE NEWS CARD
    ====================================================== */

    function createNewsCard(article) {

        const title =
            article.title ||
            "Ghana Technology News";

        const description =
            shortenText(
                article.description ||
                "Latest technology news and digital innovation stories from Ghana."
            );

        const category =
            getCategoryName(
                article.category
            );

        const date =
            formatDate(
                article.published
            );

        const url =
            article.url ||
            "#";

        const icon =
            getCategoryIcon(
                category
            );


        const card =
            document.createElement("article");

        card.className =
            "ghana-news-card";


        card.dataset.category =
            category;

        card.dataset.title =
            title;


        card.innerHTML = `

            <div
                class="ghana-news-card-image"
                style="
                    aspect-ratio:16/9;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    background:linear-gradient(
                        135deg,
                        #071a3d,
                        #0b5cff
                    );
                    color:#ffffff;
                    font-size:3rem;
                "
                aria-hidden="true"
            >
                ${icon}
            </div>

            <div class="ghana-news-card-content">

                <span class="ghana-news-card-category">
                    ${escapeHTML(category)}
                </span>

                <h3>
                    ${escapeHTML(title)}
                </h3>

                <p>
                    ${escapeHTML(description)}
                </p>

                <div class="ghana-news-card-meta">

                    <span>
                        <i class="fa-regular fa-clock"></i>
                        ${escapeHTML(date)}
                    </span>

                    <a
                        class="read-more"
                        href="${escapeHTML(url)}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Read More
                        <i class="fa-solid fa-arrow-right"></i>
                    </a>

                </div>

            </div>
        `;


        return card;

    }


    /* =====================================================
       11. DISPLAY NEWS ARTICLES
    ====================================================== */

    function displayArticles() {

        if (!newsGrid) {

            return;

        }


        newsGrid.innerHTML = "";


        if (!allArticles.length) {

            showNoNews();

            return;

        }


        allArticles.forEach(
            function (article) {

                const card =
                    createNewsCard(article);

                newsGrid.appendChild(card);

            }
        );


        if (noResults) {

            noResults.style.display =
                "none";

        }

    }


    /* =====================================================
       12. UPDATE FEATURED STORY
    ====================================================== */

    function updateFeaturedStory() {

        if (!featured || !allArticles.length) {

            return;

        }


        const article =
            allArticles[0];


        const category =
            getCategoryName(
                article.category
            );

        const title =
            article.title ||
            "Latest Ghana Technology News";

        const description =
            shortenText(
                article.description ||
                "Discover the latest technology and digital innovation stories from Ghana.",
                240
            );

        const url =
            article.url ||
            "#";


        const categoryElement =
            document.getElementById(
                "featuredCategory"
            );

        const titleElement =
            document.getElementById(
                "featuredTitle"
            );

        const descriptionElement =
            document.getElementById(
                "featuredDescription"
            );


        if (categoryElement) {

            categoryElement.textContent =
                getCategoryIcon(category) +
                " " +
                category;

        }


        if (titleElement) {

            titleElement.textContent =
                title;

        }


        if (descriptionElement) {

            descriptionElement.textContent =
                description;

        }


        /* =================================================
           FIND FEATURED READ BUTTON
        ================================================== */

        const featuredButton =
            featured.querySelector(
                ".read-btn"
            );


        if (featuredButton) {

            featuredButton.href =
                url;

            featuredButton.target =
                "_blank";

            featuredButton.rel =
                "noopener noreferrer";

        }


        /* =================================================
           UPDATE FEATURED DATE / SOURCE
        ================================================== */

        const infoItems =
            featured.querySelectorAll(
                ".article-info span"
            );


        if (infoItems.length > 0) {

            infoItems[0].innerHTML =
                `<i class="fa-regular fa-calendar"></i>
                 ${escapeHTML(
                     formatDate(
                         article.published
                     )
                 )}`;

        }


        if (infoItems.length > 1) {

            infoItems[1].innerHTML =
                `<i class="fa-regular fa-user"></i>
                 ${escapeHTML(
                     article.source ||
                     "TechHub Ghana"
                 )}`;

        }

    }


    /* =====================================================
       13. SHOW LOADING
    ====================================================== */

    function showLoading() {

        if (!newsGrid) {

            return;

        }


        isLoading = true;


        newsGrid.innerHTML = `

            <div class="news-loading">

                <div
                    class="loading-spinner"
                    aria-hidden="true"
                ></div>

                <p>
                    Loading the latest Ghana Tech stories...
                </p>

            </div>

        `;


        if (message) {

            message.textContent =
                "Ghana Tech stories are loading...";

        }


        if (noResults) {

            noResults.style.display =
                "none";

        }

    }


    /* =====================================================
       14. SHOW NO NEWS
    ====================================================== */

    function showNoNews() {

        isLoading = false;


        if (newsGrid) {

            newsGrid.innerHTML = "";

        }


        if (noResults) {

            noResults.style.display =
                "block";

        }


        if (message) {

            message.textContent =
                "No Ghana Tech stories are available right now.";

        }


        if (countElement) {

            countElement.textContent =
                "0";

        }

    }


    /* =====================================================
       15. SHOW ERROR
    ====================================================== */

    function showError() {

        isLoading = false;


        if (newsGrid) {

            newsGrid.innerHTML = `

                <div class="news-loading">

                    <div
                        style="
                            font-size:2rem;
                            margin-bottom:12px;
                        "
                        aria-hidden="true"
                    >
                        ⚠️
                    </div>

                    <h3>
                        Unable to load Ghana Tech news
                    </h3>

                    <p>
                        Please check your internet connection
                        and try again.
                    </p>

                </div>

            `;

        }


        if (message) {

            message.textContent =
                "Unable to load the latest Ghana Tech stories.";

        }

    }


    /* =====================================================
       16. FILTER ARTICLES
    ====================================================== */

    function filterArticles() {

        if (!newsGrid) {

            return;

        }


        const cards =
            newsGrid.querySelectorAll(
                ".ghana-news-card"
            );


        const searchTerm =
            normalize(
                searchInput
                    ? searchInput.value
                    : ""
            );


        let visibleArticles = 0;


        cards.forEach(
            function (article) {

                const category =
                    normalize(
                        article.dataset.category
                    );

                const title =
                    normalize(
                        article.dataset.title
                    );

                const content =
                    normalize(
                        article.textContent
                    );


                const categoryMatch =
                    currentCategory === "All" ||
                    category.includes(
                        normalize(
                            currentCategory
                        )
                    );


                const searchMatch =
                    searchTerm === "" ||
                    title.includes(
                        searchTerm
                    ) ||
                    content.includes(
                        searchTerm
                    ) ||
                    category.includes(
                        searchTerm
                    );


                if (
                    categoryMatch &&
                    searchMatch
                ) {

                    article.style.display =
                        "";

                    visibleArticles++;

                } else {

                    article.style.display =
                        "none";

                }

            }
        );


        /* =================================================
           NO RESULTS
        ================================================== */

        if (noResults) {

            if (
                !isLoading &&
                cards.length > 0 &&
                visibleArticles === 0
            ) {

                noResults.style.display =
                    "block";

            } else {

                noResults.style.display =
                    "none";

            }

        }


        /* =================================================
           STATUS MESSAGE
        ================================================== */

        if (message) {

            if (isLoading) {

                message.textContent =
                    "Ghana Tech stories are loading...";

            } else if (
                cards.length === 0
            ) {

                message.textContent =
                    "No Ghana Tech stories are available.";

            } else if (
                visibleArticles === 0
            ) {

                message.textContent =
                    "No Ghana Tech stories match your search.";

            } else if (
                searchTerm !== ""
            ) {

                message.textContent =
                    visibleArticles +
                    " result" +
                    (
                        visibleArticles === 1
                            ? ""
                            : "s"
                    ) +
                    ' found for "' +
                    searchInput.value.trim() +
                    '".';

            } else if (
                currentCategory !== "All"
            ) {

                const activeButton =
                    document.querySelector(
                        ".ghana-filter.active"
                    );


                const categoryName =
                    activeButton
                        ? activeButton.textContent.trim()
                        : currentCategory;


                message.textContent =
                    visibleArticles +
                    " stor" +
                    (
                        visibleArticles === 1
                            ? "y"
                            : "ies"
                    ) +
                    " in " +
                    categoryName +
                    ".";

            } else {

                message.textContent =
                    "Showing the latest Ghana Tech stories.";

            }

        }


        /* =================================================
           STORY COUNT
        ================================================== */

        if (countElement) {

            countElement.textContent =
                visibleArticles;

        }

    }


    /* =====================================================
       17. LOAD NEWS JSON
    ====================================================== */

    async function loadNews() {

        showLoading();


        try {

            const response =
                await fetch(
                    NEWS_FILE +
                    "?v=" +
                    Date.now(),
                    {
                        cache: "no-store"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "News file could not be loaded."
                );

            }


            const data =
                await response.json();


            if (
                !data ||
                !Array.isArray(
                    data.articles
                )
            ) {

                throw new Error(
                    "Invalid news data."
                );

            }


            allArticles =
                data.articles
                    .filter(
                        function (article) {

                            return (
                                article &&
                                article.title &&
                                article.url
                            );

                        }
                    );


            /* =================================================
               SORT NEWEST FIRST
            ================================================== */

            allArticles.sort(
                function (a, b) {

                    const dateA =
                        new Date(
                            a.published || 0
                        ).getTime();

                    const dateB =
                        new Date(
                            b.published || 0
                        ).getTime();

                    return dateB - dateA;

                }
            );


            /* =================================================
               DISPLAY
            ================================================== */

            displayArticles();

            updateFeaturedStory();


            isLoading = false;


            filterArticles();


            console.log(
                "TechHub Ghana:",
                allArticles.length,
                "news stories loaded."
            );


            if (data.updatedAt) {

                console.log(
                    "News last updated:",
                    data.updatedAt
                );

            }

        } catch (error) {

            console.error(
                "TechHub Ghana news error:",
                error
            );

            showError();

        }

    }


    /* =====================================================
       18. CATEGORY BUTTONS
    ====================================================== */

    filters.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    filters.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    currentCategory =
                        button.dataset.category ||
                        "All";


                    filterArticles();

                }
            );

        }
    );


    /* =====================================================
       19. LIVE SEARCH
    ====================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                filterArticles();

            }
        );

    }


    /* =====================================================
       20. LOCAL SEARCH BUTTON
    ====================================================== */

    if (localSearchButton) {

        localSearchButton.addEventListener(
            "click",
            function () {

                filterArticles();


                if (newsSection) {

                    newsSection.scrollIntoView(
                        {
                            behavior: "smooth",
                            block: "start"
                        }
                    );

                }

            }
        );

    }


    /* =====================================================
       21. HEADER SEARCH
    ====================================================== */

    function performHeaderSearch() {

        if (
            !topSearch ||
            !searchInput
        ) {

            return;

        }


        const value =
            topSearch.value.trim();


        if (value === "") {

            return;

        }


        searchInput.value =
            value;


        currentCategory =
            "All";


        filters.forEach(
            function (button) {

                button.classList.remove(
                    "active"
                );


                if (
                    normalize(
                        button.dataset.category
                    ) === "all"
                ) {

                    button.classList.add(
                        "active"
                    );

                }

            }
        );


        filterArticles();


        if (newsSection) {

            newsSection.scrollIntoView(
                {
                    behavior: "smooth",
                    block: "start"
                }
            );

        }

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                performHeaderSearch();

            }
        );

    }


    if (topSearch) {

        topSearch.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    performHeaderSearch();

                }

            }
        );

    }


    /* =====================================================
       22. TRENDING LINKS
    ====================================================== */

    trendingLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const trendingCategory =
                        link.dataset.trending;


                    if (!trendingCategory) {

                        return;

                    }


                    currentCategory =
                        trendingCategory;


                    filters.forEach(
                        function (button) {

                            button.classList.remove(
                                "active"
                            );


                            if (
                                normalize(
                                    button.dataset.category
                                ) ===
                                normalize(
                                    trendingCategory
                                )
                            ) {

                                button.classList.add(
                                    "active"
                                );

                            }

                        }
                    );


                    if (searchInput) {

                        searchInput.value =
                            "";

                    }


                    filterArticles();

                }
            );

        }
    );


    /* =====================================================
       23. AUTO REFRESH
       
       Check the JSON every 10 minutes.
       
       GitHub Actions updates the JSON separately.
    ====================================================== */

    setInterval(
        async function () {

            try {

                const response =
                    await fetch(
                        NEWS_FILE +
                        "?v=" +
                        Date.now(),
                        {
                            cache: "no-store"
                        }
                    );


                if (!response.ok) {

                    return;

                }


                const data =
                    await response.json();


                if (
                    !data ||
                    !Array.isArray(
                        data.articles
                    )
                ) {

                    return;

                }


                const newArticles =
                    data.articles.filter(
                        function (article) {

                            return (
                                article &&
                                article.title &&
                                article.url
                            );

                        }
                    );


                const oldFirstArticle =
                    allArticles.length
                        ? allArticles[0].url
                        : "";


                const newFirstArticle =
                    newArticles.length
                        ? newArticles[0].url
                        : "";


                /* =================================================
                   ONLY REBUILD PAGE IF NEW NEWS EXISTS
                ================================================== */

                if (
                    newFirstArticle &&
                    newFirstArticle !==
                    oldFirstArticle
                ) {

                    allArticles =
                        newArticles.sort(
                            function (a, b) {

                                return (
                                    new Date(
                                        b.published || 0
                                    ).getTime() -
                                    new Date(
                                        a.published || 0
                                    ).getTime()
                                );

                            }
                        );


                    displayArticles();

                    updateFeaturedStory();

                    filterArticles();


                    console.log(
                        "TechHub Ghana: New stories detected."
                    );

                }

            } catch (error) {

                console.warn(
                    "Automatic news refresh failed:",
                    error
                );

            }

        },
        10 * 60 * 1000
    );


    /* =====================================================
       24. INITIAL LOAD
    ====================================================== */

    loadNews();

});
