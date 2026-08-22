/**
 * =========================================================
 * TECHHUB GHANA
 * AUTOMATIC GHANA TECH NEWS UPDATER
 * =========================================================
 *
 * This script:
 * 1. Reads Ghana-focused technology RSS feeds
 * 2. Filters for technology-related stories
 * 3. Removes duplicate articles
 * 4. Keeps the newest stories
 * 5. Creates/updates ghana-tech-news.json
 *
 * It is designed to run from GitHub Actions.
 * =========================================================
 */

const fs = require("fs");
const path = require("path");

const OUTPUT_FILE = path.join(
    __dirname,
    "..",
    "ghana-tech-news.json"
);


/* =========================================================
   RSS SOURCES
========================================================= */

const RSS_FEEDS = [
    {
        name: "JBKlutse",
        url: "https://www.jbklutse.com/feed/",
        defaultCategory: "Ghana Tech"
    },

    {
        name: "Mfidie",
        url: "https://mfidie.com/feed/",
        defaultCategory: "Ghana Tech"
    },

    {
        name: "MyJoyOnline",
        url: "https://www.myjoyonline.com/feed/",
        defaultCategory: "Ghana Tech"
    }
];


/* =========================================================
   TECHNOLOGY KEYWORDS
========================================================= */

const TECHNOLOGY_KEYWORDS = [
    "technology",
    "tech",
    "artificial intelligence",
    "ai",
    "machine learning",
    "cybersecurity",
    "cyber security",
    "digital",
    "internet",
    "software",
    "programming",
    "developer",
    "developers",
    "coding",
    "computer",
    "smartphone",
    "mobile",
    "android",
    "iphone",
    "apple",
    "google",
    "microsoft",
    "facebook",
    "instagram",
    "whatsapp",
    "tiktok",
    "fintech",
    "fintech",
    "mobile money",
    "momo",
    "startup",
    "startups",
    "5g",
    "4g",
    "telecom",
    "telecommunications",
    "cloud",
    "data",
    "data protection",
    "blockchain",
    "cryptocurrency",
    "crypto",
    "e-commerce",
    "ecommerce",
    "digital transformation",
    "ict",
    "information technology",
    "app",
    "apps",
    "website",
    "web",
    "cloud computing",
    "robotics",
    "drone",
    "digital services"
];


/* =========================================================
   HELPERS
========================================================= */

function cleanText(value) {

    if (!value) {
        return "";
    }

    return String(value)
        .replace(/<!\[CDATA\[/gi, "")
        .replace(/\]\]>/gi, "")
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/&apos;/gi, "'")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/\s+/g, " ")
        .trim();
}


function escapeHtml(value) {

    return cleanText(value);

}


function getTag(xml, tag) {

    const regex = new RegExp(
        `<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`,
        "i"
    );

    const match = xml.match(regex);

    return match
        ? cleanText(match[1])
        : "";

}


function getAtomLink(xml) {

    const linkMatch = xml.match(
        /<link[^>]+href=["']([^"']+)["'][^>]*>/i
    );

    if (linkMatch) {
        return linkMatch[1];
    }

    return getTag(xml, "link");
}


function getImage(itemXml) {

    const mediaContent =
        itemXml.match(
            /<media:content[^>]+url=["']([^"']+)["']/i
        );

    if (mediaContent) {
        return mediaContent[1];
    }


    const mediaThumbnail =
        itemXml.match(
            /<media:thumbnail[^>]+url=["']([^"']+)["']/i
        );

    if (mediaThumbnail) {
        return mediaThumbnail[1];
    }


    const enclosure =
        itemXml.match(
            /<enclosure[^>]+url=["']([^"']+)["']/i
        );

    if (enclosure) {
        return enclosure[1];
    }


    const image =
        itemXml.match(
            /<img[^>]+src=["']([^"']+)["']/i
        );

    if (image) {
        return image[1];
    }


    return "images/ghana-tech.jpg";
}


/* =========================================================
   CATEGORY DETECTION
========================================================= */

function detectCategory(title, description) {

    const text =
        `${title} ${description}`.toLowerCase();


    if (
        text.includes("artificial intelligence") ||
        /\bai\b/.test(text) ||
        text.includes("machine learning") ||
        text.includes("chatgpt")
    ) {
        return "AI";
    }


    if (
        text.includes("cybersecurity") ||
        text.includes("cyber security") ||
        text.includes("phishing") ||
        text.includes("malware") ||
        text.includes("cybercrime")
    ) {
        return "Cybersecurity";
    }


    if (
        text.includes("fintech") ||
        text.includes("mobile money") ||
        text.includes("momo") ||
        text.includes("digital payment") ||
        text.includes("banking technology")
    ) {
        return "FinTech";
    }


    if (
        text.includes("programming") ||
        text.includes("coding") ||
        text.includes("developer") ||
        text.includes("javascript") ||
        text.includes("python") ||
        text.includes("software development")
    ) {
        return "Programming";
    }


    if (
        text.includes("cloud computing") ||
        text.includes("cloud")
    ) {
        return "Cloud Computing";
    }


    if (
        text.includes("smartphone") ||
        text.includes("android") ||
        text.includes("iphone") ||
        text.includes("mobile phone") ||
        text.includes("samsung")
    ) {
        return "Mobile & Gadgets";
    }


    return "Ghana Tech";
}


/* =========================================================
   TECHNOLOGY FILTER
========================================================= */

function isTechnologyArticle(title, description) {

    const text =
        `${title} ${description}`.toLowerCase();


    return TECHNOLOGY_KEYWORDS.some(
        keyword => text.includes(keyword)
    );
}


/* =========================================================
   FETCH RSS
========================================================= */

async function fetchFeed(feed) {

    console.log(`Fetching: ${feed.name}`);

    try {

        const response = await fetch(feed.url, {
            headers: {
                "User-Agent":
                    "TechHub Ghana News Bot/1.0"
            }
        });


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        return await response.text();

    } catch (error) {

        console.error(
            `Failed to fetch ${feed.name}:`,
            error.message
        );

        return "";

    }
}


/* =========================================================
   PARSE RSS
========================================================= */

function parseRSS(xml, feed) {

    if (!xml) {
        return [];
    }


    const items =
        xml.match(
            /<item[\s\S]*?<\/item>/gi
        ) || [];


    return items.map(item => {

        const title =
            getTag(item, "title");


        const description =
            getTag(item, "description");


        const link =
            getTag(item, "link") ||
            getAtomLink(item);


        const pubDate =
            getTag(item, "pubDate") ||
            getTag(item, "published") ||
            getTag(item, "updated");


        const author =
            getTag(item, "dc:creator") ||
            getTag(item, "author") ||
            feed.name;


        const image =
            getImage(item);


        return {
            title,
            description,
            url: link,
            publishedAt: pubDate,
            author,
            source: feed.name,
            image,
            category:
                detectCategory(
                    title,
                    description
                )
        };

    }).filter(article => {

        return (
            article.title &&
            article.url &&
            isTechnologyArticle(
                article.title,
                article.description
            )
        );

    });

}


/* =========================================================
   NORMALIZE DATE
========================================================= */

function normalizeDate(date) {

    const parsed =
        new Date(date);


    if (
        Number.isNaN(
            parsed.getTime()
        )
    ) {
        return new Date().toISOString();
    }


    return parsed.toISOString();
}


/* =========================================================
   CREATE UNIQUE ID
========================================================= */

function createId(article) {

    return `${article.source}-${article.url}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .substring(0, 180);

}


/* =========================================================
   REMOVE DUPLICATES
========================================================= */

function removeDuplicates(articles) {

    const seen = new Set();

    return articles.filter(article => {

        const key =
            article.url ||
            article.title.toLowerCase();


        if (seen.has(key)) {
            return false;
        }


        seen.add(key);

        return true;

    });

}


/* =========================================================
   MAIN
========================================================= */

async function main() {

    console.log(
        "=========================================="
    );

    console.log(
        "TECHHUB GHANA AUTOMATIC NEWS UPDATER"
    );

    console.log(
        "=========================================="
    );


    let allArticles = [];


    /* Fetch all feeds */

    for (const feed of RSS_FEEDS) {

        const xml =
            await fetchFeed(feed);


        const articles =
            parseRSS(xml, feed);


        console.log(
            `${feed.name}: ${articles.length} technology articles`
        );


        allArticles =
            allArticles.concat(
                articles
            );

    }


    /* Remove duplicates */

    allArticles =
        removeDuplicates(
            allArticles
        );


    /* Normalize dates */

    allArticles =
        allArticles.map(article => ({

            ...article,

            publishedAt:
                normalizeDate(
                    article.publishedAt
                ),

            id:
                createId(article)

        }));


    /* Sort newest first */

    allArticles.sort(
        (a, b) =>
            new Date(b.publishedAt) -
            new Date(a.publishedAt)
    );


    /* Keep latest 30 */

    allArticles =
        allArticles.slice(0, 30);


    /* Create final JSON */

    const output = {

        updatedAt:
            new Date().toISOString(),

        source:
            "TechHub Ghana",

        articles:
            allArticles

    };


    /* Make sure directory exists */

    const directory =
        path.dirname(
            OUTPUT_FILE
        );


    if (!fs.existsSync(directory)) {

        fs.mkdirSync(
            directory,
            {
                recursive: true
            }
        );

    }


    /* Write JSON */

    fs.writeFileSync(
        OUTPUT_FILE,
        JSON.stringify(
            output,
            null,
            2
        ),
        "utf8"
    );


    console.log(
        "=========================================="
    );

    console.log(
        `Saved ${allArticles.length} articles`
    );

    console.log(
        `Updated: ${OUTPUT_FILE}`
    );

    console.log(
        "=========================================="
    );


    if (allArticles.length === 0) {

        console.warn(
            "WARNING: No technology articles were found."
        );

        process.exitCode = 1;

    }

}


main().catch(error => {

    console.error(
        "Updater failed:",
        error
    );

    process.exit(1);

});
