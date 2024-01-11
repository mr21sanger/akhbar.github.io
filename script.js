const apiKey = "8585f6668f1944deb2545c040f39002e"
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener("load", () => fetchNews("India"))

let fetchNews = async (query) => {
    let response = await fetch(`${url}${query}&apiKey=${apiKey}`)
    let data = await response.json();
    displayCards(data.articles);
}

let displayCards = (articles) => {
    console.log(articles)
    const allCards = document.querySelector("#allCards")
    const newsCards = document.querySelector("#template-news-card")
    allCards.innerHTML = '';

    articles.forEach((article) => {
        if (!article.urlToImage) return
        const news = newsCards.content.cloneNode(true);
        updateInfo(news, article)
        allCards.append(news)
    })

}
let updateInfo = (news, article) => {
    const newsImg = news.querySelector("#news-img")
    const newsHead = news.querySelector(".headline")
    const newsInfo = news.querySelector(".info")
    const card = news.querySelector(".card")
    const source = news.querySelector("#source")
    newsImg.src = `${article.urlToImage}`
    newsHead.innerText = article.title
    newsInfo.innerText = article.description

    let date = new Date(`${article.publishedAt}`)
    date.toDateString()
    source.innerText = `${article.source.name} • ${date}`

    news.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank")
    })
}

let currentElement = null;

let searchAbt = (id) => {
    fetchNews(id);
    let selected = document.getElementById(`${id}`)
    selected.classList.add("active")
    currentElement?.classList.remove("active")
    currentElement = selected;
}

let searchBtn = document.querySelector("#search-button");


searchBtn.addEventListener("click", () => {
    let searchItem = document.querySelector("#searchbox").value;

    if (searchItem == "") {
        alert("please write something to search")
    }
    else {
        fetchNews(searchItem);
        selected.classList.remove("active")
        currentElement = null
    }
})