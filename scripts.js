document.addEventListener("DOMContentLoaded", function () {
    const RSS_URL = "https://provamsch.wordpress.com/feed/";  

    async function fetchRSS() {
        let parser = new RSSParser();
        try {
            // Fetcher
            const feed = await parser.parseURL(RSS_URL);
            const feedContainer = document.getElementById("rss-feed");
            let html = "";

            // Looper
            feed.items.forEach(item => {
                html += `
                    <article>
                        <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                        <p>${item.contentSnippet}</p>
                        <p><em>Published on: ${new Date(item.pubDate).toLocaleDateString()}</em></p>
                    </article>
                `;
            });

            // Insert the HTML into the rss-feed div or show "No posts available" message
            feedContainer.innerHTML = html || "<p>No posts available.</p>";
        } catch (error) {
            console.error("Failed to fetch the RSS feed", error);
            document.getElementById("rss-feed").innerHTML = "<p>Failed to load feed. Please try again later.</p>";
        }
    }

    fetchRSS();
});
