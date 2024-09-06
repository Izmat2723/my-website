// JavaScript to fetch and display RSS feed
document.addEventListener("DOMContentLoaded", function () {
    // Updated URL with a CORS proxy to handle potential CORS issues
    const RSS_URL = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://rss.app/feeds/vMUgWPOV8IP1FYs.xml");

    // Updated fetchRSS function to handle RSS feed fetching and display
    async function fetchRSS() {
        // Create an instance of the RSS Parser
        const parser = new RSSParser();

        try {
            // Fetch the RSS feed data using a CORS proxy
            const response = await fetch(RSS_URL);
            const data = await response.json();
            // Parse the RSS feed contents from the response
            const feed = await parser.parseString(data.contents);
            // Select the container where the feed will be displayed
            const feedContainer = document.getElementById("rss-feed");

            // Initialize an empty string to build the HTML
            let html = "";

            // Loop through each item in the feed
            feed.items.forEach(item => {
                // Append each item to the HTML string
                html += `
                    <article>
                        <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                        <p>${item.contentSnippet}</p>
                    </article>
                `;
            });

            // Display the RSS feed or show a message if no items are found
            feedContainer.innerHTML = html || "<p>No posts found.</p>";
        } catch (error) {
            // Log the error and display a user-friendly message
            console.error("Failed to fetch the RSS feed:", error);
            document.getElementById("rss-feed").innerHTML = "<p>Failed to load feed. Please try again later.</p>";
        }
    }

    // Call the function to fetch the RSS feed
    fetchRSS();
});
