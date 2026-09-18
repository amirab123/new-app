const API_URL = "https://hacker-news.firebaseio.com/v0";

export async function getNews() {
  const response = await fetch(`${API_URL}/topstories.json`);

  if (!response.ok) {
    throw new Error("Impossible de récupérer les actualités.");
  }

  const ids = await response.json();

  const articles = await Promise.all(
    ids.slice(0, 12).map(async (id) => {
      const articleResponse = await fetch(
        `${API_URL}/item/${id}.json`
      );

      return articleResponse.json();
    })
  );

  return articles.filter((article) => article && article.title);
}

export async function searchNews(query) {
  const response = await fetch(
    `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(
      query
    )}&tags=story`
  );

  if (!response.ok) {
    throw new Error("Erreur lors de la recherche.");
  }

  const data = await response.json();

  return data.hits.map((article) => ({
    title: article.title,
    url: article.url || `https://news.ycombinator.com/item?id=${article.objectID}`,
    description: article.story_text || "Actualité technologique",
    source: {
      name: "Hacker News",
    },
    publishedAt: article.created_at,
    urlToImage: null,
  }));
}