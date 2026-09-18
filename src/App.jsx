import { useEffect, useState } from "react";
import CategoryBar from "./components/CategoryBar";
import NewsCard from "./components/NewsCard";
import SearchBar from "./components/SearchBar";
import { getNews, searchNews } from "./services/newsApi";

function App() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("technology");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNews = async (selectedCategory) => {
    try {
      setLoading(true);
      setError("");

      const data = await getNews(selectedCategory);
      setArticles(data);
    } catch (err) {
      setError(err.message);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews(category);
  }, [category]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      loadNews(category);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await searchNews(search);
      setArticles(data);
    } catch (err) {
      setError(err.message);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategory = (newCategory) => {
    setCategory(newCategory);
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-slate-900 px-4 py-8 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-4xl font-bold">📰 News App</h1>

          <p className="mt-2 text-slate-300">
            Découvrez les dernières actualités
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <SearchBar
          value={search}
          onChange={setSearch}
          onSearch={handleSearch}
        />

        <CategoryBar
          selectedCategory={category}
          onSelect={handleCategory}
        />

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-xl bg-red-100 p-4 text-center text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="py-16 text-center">
            <div className="text-5xl">⏳</div>
            <p className="mt-3 text-slate-500">
              Chargement des actualités...
            </p>
          </div>
        )}

        {/* News */}
        {!loading && articles.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <NewsCard
                key={`${article.url}-${index}`}
                article={article}
              />
            ))}
          </div>
        )}

        {/* No results */}
        {!loading && articles.length === 0 && !error && (
          <div className="py-16 text-center">
            <div className="text-5xl">🔎</div>

            <h2 className="mt-4 text-2xl font-bold text-slate-700">
              Aucun résultat
            </h2>

            <p className="mt-2 text-slate-500">
              Essayez une autre recherche.
            </p>
          </div>
        )}
      </main>

      <footer className="mt-10 bg-slate-900 py-6 text-center text-sm text-slate-400">
        React + Tailwind CSS + NewsAPI
      </footer>
    </div>
  );
}

export default App;