$.get("https://rss.app/feeds/vMUgWPOV8IP1FYs.xml", function (data) {
    $(data).find("entry").each(function () {
        var el = $(this);

        console.log("------------------------");
        console.log("title      : " + el.find("title").text());
        console.log("author     : " + el.find("author").text());
        console.log("description: " + el.find("description").text());
    });
});