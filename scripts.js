document.addEventListener("DOMContentLoaded", function () {
    const RSS_URL = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://rss.app/feeds/vMUgWPOV8IP1FYs.xml");
    const categoryFilter = document.getElementById("category-filter");
    const dateFilter = document.getElementById("date-filter");

    async function fetchRSS() {
        try {
            const response = await fetch(RSS_URL);
            const data = await response.json();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, "text/xml");
            const items = xmlDoc.querySelectorAll("item");
            displayPosts(items);
        } catch (error) {
            console.error("Failed to fetch the RSS feed:", error);
            document.getElementById("rss-feed").innerHTML = "<p>Failed to load feed. Please try again later.</p>";
        }
    }

    function displayPosts(items) {
        let html = "";

        items.forEach(item => {
            const title = item.querySelector("title").textContent;
            const link = item.querySelector("link").textContent;
            const description = item.querySelector("description").textContent;
            const pubDate = new Date(item.querySelector("pubDate").textContent);
            const category = item.textContent.match(/#(\d+)/); // Match tags like #1, #2, #3, #4
            const categoryClass = category ? `category-${category[1]}` : "category-1"; // Default to category-1

            html += `
                <article class="${categoryClass}" data-date="${pubDate.toISOString()}">
                    <h3><a href="${link}" target="_blank">${title}</a></h3>
                    <p>${description}</p>
                    <span class="post-category">${category ? `Category ${category[1]}` : "Category 1"}</span>
                    <span class="post-date">${pubDate.toLocaleDateString()}</span>
                </article>
            `;
        });

        document.getElementById("rss-feed").innerHTML = html || "<p>No posts found.</p>";
        applyFilters(); // Apply filters initially
    }

    function applyFilters() {
        const selectedCategory = categoryFilter.value;
        const selectedDate = new Date(dateFilter.value);

        document.querySelectorAll("#rss-feed article").forEach(article => {
            const articleCategory = article.classList.contains(selectedCategory) || selectedCategory === "all";
            const articleDate = new Date(article.getAttribute("data-date"));

            if ((articleCategory) && (!isNaN(selectedDate.getTime()) ? articleDate >= selectedDate : true)) {
                article.style.display = "block";
            } else {
                article.style.display = "none";
            }
        });
    }

    categoryFilter.addEventListener("change", applyFilters);
    dateFilter.addEventListener("change", applyFilters);

    fetchRSS();
});
