const apiKey = "816ec83209784a2cb7f35ff024fbe3a5";
const blogcontainter = document.getElementById("blog-container");
async function fetchRanDomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}

function displayBlogs(articles) {
  blogcontainter.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    const truncatedtitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "..."
        : article.title;
    title.textContent = truncatedtitle;

    const description = document.createElement("p");

    const truncatedDes =
      article.description.length > 120
        ? article.description.slice(0, 120) + "..."
        : article.description;
    title.textContent = truncatedDes;

    description.textContent = article.descripition;
    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
    blogcontainter.appendChild(blogCard);
  });
}

(async () => {
  try {
    const articles = await fetchRanDomNews();

    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news", error);
  }
})();
