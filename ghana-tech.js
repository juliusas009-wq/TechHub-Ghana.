/* =========================================================
   TECHHUB GHANA
   GHANA TECH NEWS LOADER
   Loads automatic news from ghana-tech-news.json
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /* =====================================================
       CONFIGURATION
    ====================================================== */

    const NEWS_FILE = "./ghana-tech-news.json";

    const newsGrid =
        document.getElementById("ghanaNewsGrid");

    const featured =
        document.getElementById("ghanaFeatured");

    const featuredCategory =
        document.getElementById("featuredCategory");

    const featuredTitle =
        document.getElementById("featuredTitle");

    const featuredDescription =
        document.getElementById("featuredDescription");

    const featuredDate =
        document.getElementById("featuredDate");

    const featuredAuthor =
        document.getElementById("featuredAuthor");

    const featuredImage =
        document.getElementById("featuredImage");

    const featuredLink =
        document.getElementById("featuredLink");

    const message =
        document.getElementById("ghanaSearchMessage");

    const noResults =
        document.getElementById("noGhanaNews");

    const countElement =
        document.getElementById("ghanaNewsCount");


    /* =====================================================
       DEFAULT IMAGE
    ====================================================== */

    const DEFAULT_IMAGE =
        "./images/ghana-tech.jpg";


    /* =====================================================
       SAFE TEXT
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
       FORMAT DATE
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
       CLEAN DESCRIPTION
    ====================================================== */

    function cleanDescription(value) {

        if (!value) {
            return "Read the latest Ghana technology news and digital innovation stories.";
        }

        const temporary =
            document.createElement("div");

        temporary.innerHTML =
            String(value);

        let text =
            temporary.textContent ||
            temporary.innerText ||
            "";

        text =
            text
                .replace(/\s+/g, " ")
                .trim();

        if (text.length > 220) {

            text =
                text.substring(0, 217) +
                "...";

        }

        return text;

    }


    /* =====================================================
       NORMALIZE CATEGORY
    ====================================================== */

    function normalizeCategory(article) {

        const category =
            String(
                article.category || ""
            ).toLowerCase();

        if (
            category.includes("artificial") ||
            category.includes("ai")
        ) {
            return "Artificial Intelligence";
        }

        if (
            category.includes("cyber")
        ) {
            return "Cybersecurity";
        }

        if (
            category.includes("program") ||
            category.includes("coding") ||
            category.includes("software")
        ) {
            return "Programming";
        }

        if (
            category.includes("cloud")
        ) {
            return "Cloud Computing";
        }

        if (
            category.includes("fintech") ||
            category.includes("mobile money") ||
            category.includes("finance")
        ) {
            return "Ghana Technology";
        }

        return "Ghana Technology";

    }


    /* =====================================================
       GET IMAGE
    ====================================================== */

    function getImage(article) {

        if (
            article.image &&
            String(article.image).trim() !== ""
        ) {

            return article.image;

        }

        if (
            article.thumbnail &&
            String(article.thumbnail).trim() !== ""
        ) {

            return article.thumbnail;

        }

        return DEFAULT_IMAGE;

    }


    /* =====================================================
       CREATE NEWS CARD
    ====================================================== */

    function createNewsCard(article, index) {

        const title =
            String(
                article.title ||
                "Ghana Technology News"
            ).trim();

        const description =
            cleanDescription(
                article.description
            );

        const category =
            normalizeCategory(article);

        const date =
            formatDate(
                article.publishedAt ||
                article.pubDate ||
                article.date
            );

        const source =
            String(
                article.source ||
                "TechHub Ghana"
            ).trim();

        const image =
            getImage(article);

        const url =
            String(
                article.url ||
                article.link ||
                "#"
            ).trim();


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
                href="${escapeHTML(url)}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read ${escapeHTML(title)}"
            >

                <img
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(title)}"
                    loading="${index < 3 ? "eager" : "lazy"}"
                    onerror="this.onerror=null;this.src='${DEFAULT_IMAGE}'"
                >

            </a>

            <div class="ghana-news-card-content">

                <span class="ghana-news-card-category">
                    ${escapeHTML(category)}
                </span>

                <h3>
                    <a
                        href="${escapeHTML(url)}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ${escapeHTML(title)}
                    </a>
                </h3>

                <p>
                    ${escapeHTML(description)}
                </p>

                <div class="ghana-news-card-meta">

                    <span>
                        ${escapeHTML(date)}
                    </span>

                    <a
                        class="read-more"
                        href="${escapeHTML(url)}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Read More
                        <i class="fas fa-arrow-right"></i>
                    </a>

                </div>

            </div>
        `;


        return card;

    }


    /* =====================================================
       SHOW LOADING
    ====================================================== */

    function showLoading() {

        if (!newsGrid) {
            return;
        }

        newsGrid.innerHTML = `

            <div class="news-loading">

                <div class="loading-spinner"></div>

                <p>
                    Loading the latest Ghana Tech news...
                </p>

            </div>

        `;

        if (message) {

            message.textContent =
                "Ghana Tech stories are loading...";

        }

    }


    /* =====================================================
       SHOW ERROR
    ====================================================== */

    function showError() {

        if (!newsGrid) {
            return;
        }

        newsGrid.innerHTML = `

            <div class="news-loading">

                <div style="font-size:2.5rem;margin-bottom:15px;">
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

        if (message) {

            message.textContent =
                "Unable to load Ghana Tech stories.";

        }

        if (countElement) {

            countElement.textContent = "0";

        }

    }


    /* =====================================================
       SHOW NO NEWS
    ====================================================== */

    function showNoNews() {

        if (!newsGrid) {
            return;
        }

        newsGrid.innerHTML = `

            <div class="news-loading">

                <div style="font-size:2.5rem;margin-bottom:15px;">
                    📰
                </div>

                <h3>
                    No Ghana Tech stories available
                </h3>

                <p>
                    New stories will appear automatically
                    when the news feed is updated.
                </p>

            </div>

        `;

        if (message) {

            message.textContent =
                "No Ghana Tech stories are currently available.";

        }

        if (countElement) {

            countElement.textContent =
                "0";

        }

    }


    /* =====================================================
       UPDATE FEATURED STORY
    ====================================================== */

    function updateFeatured(article) {

        if (!featured || !article) {
            return;
        }

        const title =
            String(
                article.title ||
                "Ghana's Digital Technology Ecosystem"
            );

        const description =
            cleanDescription(
                article.description
            );

        const category =
            normalizeCategory(article);

        const date =
            formatDate(
                article.publishedAt ||
                article.pubDate ||
                article.date
            );

        const source =
            String(
                article.source ||
                "TechHub Ghana"
            );

        const image =
            getImage(article);

        const url =
            String(
                article.url ||
                article.link ||
                "#"
            );


        if (featuredCategory) {

            featuredCategory.textContent =
                category;

        }


        if (featuredTitle) {

            featuredTitle.textContent =
                title;

        }


        if (featuredDescription) {

            featuredDescription.textContent =
                description;

        }


        if (featuredDate) {

            featuredDate.textContent =
                date;

        }


        if (featuredAuthor) {

            featuredAuthor.textContent =
                source;

        }


        if (featuredImage) {

            featuredImage.src =
                image;

            featuredImage.alt =
                title;

            featuredImage.onerror =
                function () {

                    this.onerror = null;

                    this.src =
                        DEFAULT_IMAGE;

                };

        }


        if (featuredLink) {

            featuredLink.href =
                url;

            featuredLink.target =
                "_blank";

            featuredLink.rel =
                "noopener noreferrer";

        }

    }


    /* =====================================================
       RENDER NEWS
    ====================================================== */

    function renderNews(data) {

        if (!newsGrid) {

            console.error(
                "TechHub Ghana: #ghanaNewsGrid was not found."
            );

            return;

        }


        if (
            !data ||
            !Array.isArray(data.articles)
        ) {

            showNoNews();

            return;

        }


        const articles =
            data.articles
                .filter(function (article) {

                    return (
                        article &&
                        (
                            article.title ||
                            article.link ||
                            article.url
                        )
                    );

                });


        if (articles.length === 0) {

            showNoNews();

            return;

        }


        /* =================================================
           FEATURED ARTICLE
        ================================================== */

        updateFeatured(
            articles[0]
        );


        /* =================================================
           NEWS GRID
        ================================================== */

        newsGrid.innerHTML = "";


        articles.forEach(
            function (article, index) {

                const card =
                    createNewsCard(
                        article,
                        index
                    );

                newsGrid.appendChild(card);

            }
        );


        /* =================================================
           UPDATE COUNT
        ================================================== */

        if (countElement) {

            countElement.textContent =
                articles.length;

        }


        /* =================================================
           UPDATE STATUS
        ================================================== */

        if (message) {

            message.textContent =
                "Showing " +
                articles.length +
                " latest Ghana Tech stories.";

        }


        /* =================================================
           HIDE NO RESULTS
        ================================================= */

        if (noResults) {

            noResults.style.display =
                "none";

        }


        /* =================================================
           UPDATE LAST UPDATED
        ================================================= */

        if (data.updatedAt) {

            const updated =
                formatDate(
                    data.updatedAt
                );

            const status =
                document.querySelector(
                    ".live-news-status"
                );

            if (status) {

                status.setAttribute(
                    "title",
                    "Last updated: " + updated
                );

            }

        }


        /* =================================================
           RE-TRIGGER SEARCH/FILTER
        ================================================= */

        document.dispatchEvent(
            new CustomEvent(
                "ghanaNewsLoaded"
            )
        );

    }


    /* =====================================================
       LOAD NEWS
    ====================================================== */

    async function loadNews() {

        showLoading();

        try {

            const cacheBuster =
                "?t=" +
                Date.now();

            const response =
                await fetch(
                    NEWS_FILE +
                    cacheBuster,
                    {
                        method: "GET",
                        cache: "no-store"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "News file returned HTTP " +
                    response.status
                );

            }


            const data =
                await response.json();


            renderNews(data);

        }

        catch (error) {

            console.error(
                "TechHub Ghana news error:",
                error
            );

            showError();

        }

    }


    /* =====================================================
       INITIAL LOAD
    ====================================================== */

    loadNews();


    /* =====================================================
       AUTOMATIC PAGE REFRESH
       
       Checks the JSON every 10 minutes.
       This allows new stories to appear without
       manually refreshing the page.
    ====================================================== */

    setInterval(
        loadNews,
        10 * 60 * 1000
    );


    /* =====================================================
       MANUAL REFRESH EVENT
    ====================================================== */

    document.addEventListener(
        "refreshGhanaNews",
        loadNews
    );


});
