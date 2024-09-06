 // JavaScript to fetch and display RSS feed
document.addEventListener("DOMContentLoaded", function () {
    // Replace with the URL of the RSS feed generated from RSS.app or a similar service
    const RSS_URL = "https://rss.app/feeds/vMuGVPP0IBPIlFY5.xml"; // Replace with your actual RSS feed URL

    async function fetchRSS() {
        const parser = new RSSParser();
        try {
            const feed = await parser.parseURL(RSS_URL);
            const feedContainer = document.getElementById("rss-feed");

            let html = ""; // Initialize the HTML string to populate the RSS feed
            // Loop through each item in the RSS feed
            feed.items.forEach(item => {
                html += `
                    <article>
                        <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                        <p>${item.contentSnippet}</p>
                    </article>
                `;
            });

            // If no items are found, show a message
            feedContainer.innerHTML = html || "<p>No posts found.</p>";
        } catch (error) {
            console.error("Failed to fetch the RSS feed:", error);
            document.getElementById("rss-feed").innerHTML = "<p>Failed to load feed. Please try again later.</p>";
        }
    }

    fetchRSS();
}); 
//test
