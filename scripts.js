document.addEventListener("DOMContentLoaded", function () {
     const RSS_URL = "https://api.allorigins.win/get?url=https://provamsch.wordpress.com/feed/"; 
    //const RSS_URL = "https://provamsch.wordpress.com/feed/"; // CORS proxy
    //const RSS_URL = "https://cors-anywhere.herokuapp.com/https://provamsch.wordpress.com/feed/"; // CORS proxy
    const parser = new RSSParser();
    const feedContainer = document.getElementById("rss-feed");
    const categoryFilter = document.getElementById("category-filter");

    // Fetch
    async function fetchRSS() {
        try {
            const feed = await parser.parseURL(RSS_URL);
            displayFeed(feed.items);
        } catch (error) {
            console.error("Failed to fetch the RSS feed", error);
            feedContainer.innerHTML = "<p>Failed to load feed. Please try again later.</p>";
        }
    }

    // Display
    function displayFeed(items) {
        let html = "";

        items.forEach(item => {
            let category = categorizePost(item.title);
            html += `
                <article class="${category}">
                    <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                    <p>${item.contentSnippet}</p>
                    <p><em>Published on: ${new Date(item.pubDate).toLocaleDateString()}</em></p>
                </article>
            `;
        });

        feedContainer.innerHTML = html || "<p>No posts available.</p>";
    }

    // Categorie 
    function categorizePost(title) {
        if (title.includes("#1")) return "category-1"; // Turismo
        if (title.includes("#2")) return "category-2"; // Servizi
        if (title.includes("#3")) return "category-3"; // Eventi
        if (title.includes("#4")) return "category-4"; // Tempo Libero
        return "category-1"; // Ritorno a 1 se non presente, da togliere o aggiungere quinto?
    }

    // Event Listener per categoria
    categoryFilter.addEventListener("change", function () {
        const selectedCategory = this.value;
        const articles = document.querySelectorAll("#rss-feed article");

        articles.forEach(article => {
            if (selectedCategory === "all" || article.classList.contains(selectedCategory)) {
                article.style.display = "block";
            } else {
                article.style.display = "none";
            }
        });
    });

    // Call per RSS
    fetchRSS();
});
