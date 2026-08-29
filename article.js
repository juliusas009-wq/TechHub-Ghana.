/* =========================================================
   TECHHUB GHANA
   ARTICLE SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ARTICLE DATABASE
    ====================================================== */

    const articles = {

        "ai-future": {

            category: "AI",

            title:
                "The Rise of Artificial Intelligence and What It Means for the Future",

            excerpt:
                "Artificial intelligence is transforming the way people work, learn, communicate and use digital technology.",

            author:
                "TechHub Ghana",

            date:
                "August 29, 2026",

            readTime:
                "5 min read",

            image:
                "images/ai-news.jpg",

            keywords:
                "AI, artificial intelligence, machine learning, technology, Ghana, TechHub Ghana",

            content: `

                <p>
                    Artificial intelligence is becoming one of the
                    most influential technologies in the modern
                    digital world. AI-powered systems are being used
                    across businesses, education, healthcare,
                    entertainment, software development and many
                    other industries.
                </p>

                <p>
                    What was once considered advanced technology is
                    increasingly becoming available to ordinary
                    users through smartphones, websites and everyday
                    applications.
                </p>


                <h2>
                    How AI is changing everyday life
                </h2>

                <p>
                    Artificial intelligence can help users complete
                    tasks faster, analyse information, generate
                    content and make decisions. Many digital
                    services now use AI behind the scenes to provide
                    personalised recommendations and automated
                    assistance.
                </p>


                <div class="ad-container">
                    <span>
                        ADVERTISEMENT
                    </span>
                </div>


                <h2>
                    AI and businesses
                </h2>

                <p>
                    Businesses are increasingly using AI to automate
                    repetitive tasks, analyse large amounts of data
                    and improve customer experiences.
                </p>

                <p>
                    Small businesses can also benefit from AI tools
                    for marketing, customer support, content
                    creation and productivity.
                </p>


                <h2>
                    The importance of responsible AI
                </h2>

                <p>
                    Although AI provides many opportunities, users
                    should understand its limitations. AI-generated
                    information can sometimes be inaccurate, and
                    sensitive information should not be shared with
                    unknown services.
                </p>


                <blockquote>
                    AI is a powerful tool, but the value it creates
                    depends on how responsibly people use it.
                </blockquote>


                <h2>
                    The future of AI
                </h2>

                <p>
                    AI technology is expected to continue developing
                    rapidly. Individuals and organisations that learn
                    how to use these tools responsibly may gain
                    significant advantages in the digital economy.
                </p>

            `
        },


        "cybersecurity": {

            category:
                "Cybersecurity",

            title:
                "Simple Cybersecurity Habits Everyone Should Know",

            excerpt:
                "Learn practical cybersecurity habits that can help protect your accounts, devices and personal information.",

            author:
                "TechHub Ghana",

            date:
                "August 29, 2026",

            readTime:
                "4 min read",

            image:
                "images/cyber-news.jpg",

            keywords:
                "cybersecurity, online security, passwords, hacking, internet safety, Ghana",

            content: `

                <p>
                    Cybersecurity is no longer something that only
                    large companies and technology professionals
                    need to worry about. Anyone who uses a phone,
                    computer or the internet can become a target.
                </p>


                <h2>
                    Use strong passwords
                </h2>

                <p>
                    Avoid using simple passwords such as your name,
                    birthday or phone number. Use a unique password
                    for important accounts.
                </p>


                <h2>
                    Enable two-factor authentication
                </h2>

                <p>
                    Two-factor authentication adds an additional
                    security layer to your account. Even if someone
                    obtains your password, they may still need the
                    second authentication method.
                </p>


                <div class="ad-container">
                    <span>
                        ADVERTISEMENT
                    </span>
                </div>


                <h2>
                    Be careful with links
                </h2>

                <p>
                    Do not automatically trust links sent through
                    email, SMS or social media. Check the destination
                    before entering passwords or financial
                    information.
                </p>


                <h2>
                    Keep your devices updated
                </h2>

                <p>
                    Software updates frequently contain security
                    improvements. Keeping your operating system and
                    applications updated can reduce exposure to
                    known vulnerabilities.
                </p>


                <h2>
                    Protect your personal information
                </h2>

                <p>
                    Avoid sharing sensitive information with
                    unknown websites, applications or individuals.
                    Always check whether a service is legitimate
                    before providing important information.
                </p>

            `
        },


        "web-development": {

            category:
                "Software",

            title:
                "Modern Web Development Tools Developers Should Know",

            excerpt:
                "Discover some of the technologies and tools shaping modern website and web application development.",

            author:
                "TechHub Ghana",

            date:
                "August 29, 2026",

            readTime:
                "6 min read",

            image:
                "images/web-news.jpg",

            keywords:
                "web development, HTML, CSS, JavaScript, programming, websites, developers",

            content: `

                <p>
                    Web development continues to evolve as
                    developers build faster, more interactive and
                    more accessible websites.
                </p>


                <h2>
                    HTML
                </h2>

                <p>
                    HTML provides the structure of a website.
                    Developers use HTML elements to organise
                    headings, paragraphs, images, forms,
                    navigation and other content.
                </p>


                <h2>
                    CSS
                </h2>

                <p>
                    CSS controls the visual appearance of a
                    website. It can be used for layouts, colours,
                    typography, animations and responsive design.
                </p>


                <div class="ad-container">
                    <span>
                        ADVERTISEMENT
                    </span>
                </div>


                <h2>
                    JavaScript
                </h2>

                <p>
                    JavaScript allows developers to create
                    interactive websites and web applications.
                    It can control forms, menus, dynamic content,
                    APIs and many other features.
                </p>


                <h2>
                    Developer tools
                </h2>

                <p>
                    Modern developers can use tools such as Git,
                    GitHub, code editors, browser developer tools
                    and cloud platforms to build and publish
                    websites efficiently.
                </p>


                <h2>
                    Learning web development
                </h2>

                <p>
                    Beginners can start with HTML and CSS before
                    progressing to JavaScript and more advanced
                    technologies.
                </p>

            `
        },


        "cloud-computing": {

            category:
                "Cloud",

            title:
                "Understanding Cloud Computing for Beginners",

            excerpt:
                "A beginner-friendly explanation of cloud computing, how it works and why businesses use it.",

            author:
                "TechHub Ghana",

            date:
                "August 29, 2026",

            readTime:
                "5 min read",

            image:
                "images/cloud-news.jpg",

            keywords:
                "cloud computing, cloud technology, AWS, Azure, Google Cloud, technology",

            content: `

                <p>
                    Cloud computing allows individuals and
                    organisations to access computing resources
                    through the internet rather than relying
                    entirely on local hardware.
                </p>


                <h2>
                    What is cloud computing?
                </h2>

                <p>
                    Cloud services can provide storage,
                    databases, computing power, software and
                    other digital resources through online
                    infrastructure.
                </p>


                <h2>
                    Why businesses use the cloud
                </h2>

                <p>
                    Businesses can use cloud services to scale
                    their infrastructure, store data and deploy
                    applications without having to build all
                    computing infrastructure themselves.
                </p>


                <div class="ad-container">
                    <span>
                        ADVERTISEMENT
                    </span>
                </div>


                <h2>
                    Examples of cloud services
                </h2>

                <ul>

                    <li>
                        Online file storage
                    </li>

                    <li>
                        Cloud databases
                    </li>

                    <li>
                        Website hosting
                    </li>

                    <li>
                        Online software applications
                    </li>

                    <li>
                        Cloud computing infrastructure
                    </li>

                </ul>


                <h2>
                    The future of cloud computing
                </h2>

                <p>
                    Cloud computing is expected to remain an
                    important part of digital infrastructure as
                    organisations continue moving services and
                    applications online.
                </p>

            `
        }

    };


    /* =====================================================
       GET ARTICLE ID
    ====================================================== */

    const params =
        new URLSearchParams(
            window.location.search
        );


    const articleId =
        params.get("id") || "ai-future";


    const article =
        articles[articleId];


    /* =====================================================
       DOM ELEMENTS
    ====================================================== */

    const title =
        document.getElementById(
            "articleTitle"
        );


    const category =
        document.getElementById(
            "articleCategory"
        );


    const excerpt =
        document.getElementById(
            "articleExcerpt"
        );


    const author =
        document.getElementById(
            "articleAuthor"
        );


    const date =
        document.getElementById(
            "articleDate"
        );


    const readTime =
        document.getElementById(
            "articleReadTime"
        );


    const image =
        document.getElementById(
            "articleImage"
        );


    const content =
        document.getElementById(
            "articleContent"
        );


    const breadcrumb =
        document.getElementById(
            "breadcrumbTitle"
        );


    /* =====================================================
       ARTICLE NOT FOUND
    ====================================================== */

    if (!article) {

        if (title) {

            title.textContent =
                "Article Not Found";

        }


        if (category) {

            category.textContent =
                "TechHub Ghana";

        }


        if (excerpt) {

            excerpt.textContent =
                "Sorry, the article you are looking for could not be found.";

        }


        if (content) {

            content.innerHTML = `

                <div style="
                    padding:30px;
                    background:#f8f9fb;
                    border-radius:14px;
                    text-align:center;
                ">

                    <h2>
                        Article Not Found
                    </h2>

                    <p>
                        The article may have been removed,
                        moved or the link may be incorrect.
                    </p>

                    <p>

                        <a href="news.html">
                            ← Return to Tech News
                        </a>

                    </p>

                </div>

            `;

        }

        return;

    }


    /* =====================================================
       LOAD ARTICLE
    ====================================================== */

    title.textContent =
        article.title;


    category.textContent =
        article.category;


    excerpt.textContent =
        article.excerpt;


    author.textContent =
        article.author;


    date.textContent =
        article.date;


    readTime.textContent =
        article.readTime;


    image.src =
        article.image;


    image.alt =
        article.title;


    content.innerHTML =
        article.content;


    breadcrumb.textContent =
        article.title;


    /* =====================================================
       PAGE TITLE
    ====================================================== */

    document.title =
        `${article.title} | TechHub Ghana`;


    /* =====================================================
       SEO DESCRIPTION
    ====================================================== */

    const metaDescription =
        document.getElementById(
            "metaDescription"
        );


    if (metaDescription) {

        metaDescription.setAttribute(
            "content",
            article.excerpt
        );

    }


    /* =====================================================
       SEO KEYWORDS
    ====================================================== */

    const metaKeywords =
        document.getElementById(
            "metaKeywords"
        );


    if (metaKeywords) {

        metaKeywords.setAttribute(
            "content",
            article.keywords
        );

    }


    /* =====================================================
       OPEN GRAPH
    ====================================================== */

    const ogTitle =
        document.getElementById(
            "ogTitle"
        );


    const ogDescription =
        document.getElementById(
            "ogDescription"
        );


    const ogImage =
        document.getElementById(
            "ogImage"
        );


    if (ogTitle) {

        ogTitle.setAttribute(
            "content",
            article.title
        );

    }


    if (ogDescription) {

        ogDescription.setAttribute(
            "content",
            article.excerpt
        );

    }


    if (ogImage) {

        ogImage.setAttribute(
            "content",
            article.image
        );

    }


    /* =====================================================
       TWITTER
    ====================================================== */

    const twitterTitle =
        document.getElementById(
            "twitterTitle"
        );


    const twitterDescription =
        document.getElementById(
            "twitterDescription"
        );


    const twitterImage =
        document.getElementById(
            "twitterImage"
        );


    if (twitterTitle) {

        twitterTitle.setAttribute(
            "content",
            article.title
        );

    }


    if (twitterDescription) {

        twitterDescription.setAttribute(
            "content",
            article.excerpt
        );

    }


    if (twitterImage) {

        twitterImage.setAttribute(
            "content",
            article.image
        );

    }


    /* =====================================================
       SHARE
    ====================================================== */

    const shareBtn =
        document.getElementById(
            "shareBtn"
        );


    if (shareBtn) {

        shareBtn.addEventListener(
            "click",
            async () => {

                const shareData = {

                    title:
                        article.title,

                    text:
                        article.excerpt,

                    url:
                        window.location.href

                };


                try {

                    if (
                        navigator.share
                    ) {

                        await navigator.share(
                            shareData
                        );

                    } else {

                        await copyArticleLink();

                        alert(
                            "Article link copied. You can now share it."
                        );

                    }

                } catch (error) {

                    /*
                     * User may simply have cancelled
                     * the share dialog.
                     */

                    console.log(
                        "Share cancelled."
                    );

                }

            }
        );

    }


    /* =====================================================
       COPY LINK
    ====================================================== */

    const copyLinkBtn =
        document.getElementById(
            "copyLinkBtn"
        );


    if (copyLinkBtn) {

        copyLinkBtn.addEventListener(
            "click",
            async () => {

                const copied =
                    await copyArticleLink();


                if (copied) {

                    const originalText =
                        copyLinkBtn.innerHTML;


                    copyLinkBtn.innerHTML =
                        '<i class="fa-solid fa-check"></i> Copied';


                    setTimeout(
                        () => {

                            copyLinkBtn.innerHTML =
                                originalText;

                        },
                        2000
                    );

                }

            }
        );

    }


    /* =====================================================
       COPY ARTICLE LINK FUNCTION
    ====================================================== */

    async function copyArticleLink() {

        try {

            await navigator.clipboard.writeText(
                window.location.href
            );

            return true;

        } catch (error) {

            /*
             * Older-browser fallback
             */

            const temporaryInput =
                document.createElement(
                    "input"
                );


            temporaryInput.value =
                window.location.href;


            document.body.appendChild(
                temporaryInput
            );


            temporaryInput.select();


            try {

                document.execCommand(
                    "copy"
                );

                temporaryInput.remove();

                return true;

            } catch (copyError) {

                temporaryInput.remove();

                return false;

            }

        }

    }


    /* =====================================================
       NEWSLETTER
    ====================================================== */

    const newsletterForm =
        document.getElementById(
            "newsletterForm"
        );


    const newsletterEmail =
        document.getElementById(
            "newsletterEmail"
        );


    if (
        newsletterForm &&
        newsletterEmail
    ) {

        newsletterForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const email =
                    newsletterEmail.value.trim();


                if (!email) {

                    return;

                }


                alert(
                    "Thank you for subscribing to TechHub Ghana! 🎉"
                );


                newsletterForm.reset();

            }
        );

    }


    /* =====================================================
       SEARCH
    ====================================================== */

    const searchForm =
        document.getElementById(
            "siteSearchForm"
        );


    const searchInput =
        document.getElementById(
            "siteSearch"
        );


    if (
        searchForm &&
        searchInput
    ) {

        searchForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const query =
                    searchInput.value.trim();


                if (!query) {

                    return;

                }


                window.location.href =
                    "search.html?q=" +
                    encodeURIComponent(
                        query
                    );

            }
        );

    }


    /* =====================================================
       RELATED ARTICLES
    ====================================================== */

    const relatedContainer =
        document.getElementById(
            "relatedArticles"
        );


    if (relatedContainer) {

        const relatedArticles =
            Object.entries(articles)
            .filter(
                ([id]) =>
                    id !== articleId
            )
            .slice(0, 3);


        if (relatedArticles.length) {

            relatedContainer.innerHTML =
                relatedArticles
                .map(
                    ([id, item]) => `

                        <article
                            class="related-card"
                        >

                            <img
                                src="${item.image}"
                                alt="${item.title}"
                                loading="lazy"
                            >

                            <div
                                class="related-card-content"
                            >

                                <span
                                    class="related-category"
                                >
                                    ${item.category}
                                </span>


                                <h3>

                                    <a
                                        href="article.html?id=${id}"
                                    >
                                        ${item.title}
                                    </a>

                                </h3>

                            </div>

                        </article>

                    `
                )
                .join("");

        }

    }


    /* =====================================================
       SCROLL TO TOP WHEN ARTICLE LOADS
    ====================================================== */

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });


});
