/* =========================================================
   TECHHUB GHANA
   GHANA TECH AUTOMATIC NEWS LOADER
   Loads news from news.json
   Works with ghana-tech.html + ghana-tech.js
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const newsGrid =
        document.getElementById("ghanaNewsGrid");

    const message =
        document.getElementById("ghanaSearchMessage");

    const noResults =
        document.getElementById("noGhanaNews");

    const countElement =
        document.getElementById("ghanaNewsCount");

    const loadingElement =
        document.querySelector(".news-loading");


    /* =====================================================
       CONFIGURATION
    ====================================================== */

    const NEWS_FILE =
        "./news.json";


    /* =====================================================
       HELPERS
    ====================================================== */

    function escapeHTML(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function getImage(article) {

        return (
            article.image ||
            article.imageUrl ||
            "images/ghana-tech.jpg"
        );

    }


    function getCategory(article) {

        return (
            article.category ||
            "Ghana Technology"
        );

    }


    function getTitle(article) {

        return (
            article.title ||
            "Latest Ghana Technology News"
        );

    }


    function getDescription(article) {

        return (
            article.description ||
            article.summary ||
            "Latest technology news and digital innovation updates from Ghana."
        );

    }


    function getLink(article) {

        return (
            article.link ||
            article.url ||
            "#"
        );

    }


    function getDate(article) {

        return (
            article.date ||
            article.publishedAt ||
            article.published ||
            "Today"
        );

    }


    function getAuthor(article) {

        return (
            article.author ||
            "TechHub Ghana"
        );

    }


    /* =====================================================
       FORMAT DATE
    ====================================================== */

    function formatDate(value) {

        if (!value) {
            return "Today";
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return value;
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
       CREATE NEWS CARD
    ====================================================== */

    function createNewsCard(article) {

        const category =
            getCategory(article);

        const title =
            getTitle(article);

        const description =
            getDescription(article);

        const image =
            getImage(article);

        const link =
            getLink(article);

        const date =
            formatDate(getDate(article));

        const author =
            getAuthor(article);


        const card =
            document.createElement("article");


        card.className =
            "ghana-news-card";


        card.dataset.category =
            category;


        card.dataset.title =
            title;


        card.innerHTML = `

            <a
                href="${escapeHTML(link)}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="${escapeHTML(title)}"
            >

                <img
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(title)}"
                    loading="lazy"
                    onerror="this.src='images/ghana-tech.jpg';"
                >

            </a>


            <div class="ghana-news-card-content">

                <span class="ghana-news-card-category">
                    🇬🇭 ${escapeHTML(category)}
                </span>


                <h3>
                    ${escapeHTML(title)}
                </h3>


                <p>
                    ${escapeHTML(description)}
                </p>


                <div class="ghana-news-card-meta">

                    <span>
                        ${escapeHTML(date)}
                    </span>


                    <a
                        href="${escapeHTML(link)}"
                        class="read-more"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Read More →
                    </a>

                </div>

            </div>

        `;


        return card;

    }


    /* =====================================================
       SHOW LOADING STATE
    ====================================================== */

    function showLoading() {

        if (message) {

            message.textContent =
                "Loading the latest Ghana Tech stories...";

        }

        if (loadingElement) {

            loadingElement.style.display =
                "flex";

        }

        if (noResults) {

            noResults.style.display =
                "none";

        }

    }


    /* =====================================================
       SHOW ERROR STATE
    ====================================================== */

    function showError() {

        if (loadingElement) {

            loadingElement.style.display =
                "none";

        }


        if (newsGrid) {

            newsGrid.innerHTML = `

                <div class="news-loading">

                    <div
                        style="
                            font-size:3rem;
                            margin-bottom:15px;
                        "
                    >
                        ⚠️
                    </div>


                    <h3>
                        Unable to load Ghana Tech news
                    </h3>


                    <p>
                        Please try again later.
                    </p>

                </div>

            `;

        }


        if (message) {

            message.textContent =
                "Ghana Tech news could not be loaded.";

        }

    }


    /* =====================================================
       SHOW NEWS
    ====================================================== */

    function displayNews(articles) {

        if (!newsGrid) {
            return;
        }


        if (!Array.isArray(articles)) {

            showError();

            return;

        }


        /* Remove old content */

        newsGrid.innerHTML = "";


        /* No articles */

        if (articles.length === 0) {

            if (noResults) {

                noResults.style.display =
                    "block";

            }

            if (message) {

                message.textContent =
                    "No Ghana Tech stories are available right now.";

            }

            return;

        }


        /* Create cards */

        const fragment =
            document.createDocumentFragment();


        articles.forEach(function (article) {

            if (!article || !article.title) {
                return;
            }


            const card =
                createNewsCard(article);


            fragment.appendChild(card);

        });


        newsGrid.appendChild(fragment);


        /* Hide loading */

        if (loadingElement) {

            loadingElement.style.display =
                "none";

        }


        if (noResults) {

            noResults.style.display =
                "none";

        }


        if (countElement) {

            countElement.textContent =
                articles.length;

        }


        if (message) {

            message.textContent =
                "Showing the latest Ghana Tech stories.";

        }

    }


    /* =====================================================
       LOAD NEWS.JSON
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


            /*
             * Supports:
             *
             * {
             *   "articles": []
             * }
             *
             * or
             *
             * []
             */

            const articles =
                Array.isArray(data)
                    ? data
                    : data.articles;


            if (!Array.isArray(articles)) {

                throw new Error(
                    "Invalid news.json format."
                );

            }


            displayNews(articles);


        } catch (error) {

            console.error(
                "TechHub Ghana news error:",
                error
            );


            showError();

        }

    }


    /* =====================================================
       AUTOMATIC REFRESH
       
       Checks for new news every 15 minutes.
    ====================================================== */

    const REFRESH_TIME =
        15 * 60 * 1000;


    setInterval(
        function () {

            loadNews();

        },
        REFRESH_TIME
    );


    /* =====================================================
       INITIAL LOAD
    ====================================================== */

    loadNews();

});
