function NewsCard({ article }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <div className="h-48 bg-slate-200">
        {article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">
            📰
          </div>
        )}
      </div>

      <div className="p-5">
        <p className="mb-2 text-sm font-medium text-green-600">
          {article.source?.name || "News"}
        </p>

        <h2 className="line-clamp-2 text-xl font-bold text-slate-800">
          {article.title}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm text-slate-500">
          {article.description || "Aucune description disponible."}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {article.publishedAt
              ? new Date(article.publishedAt).toLocaleDateString("fr-CA")
              : ""}
          </span>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
          >
            Lire →
          </a>
        </div>
      </div>
    </article>
  );
}

export default NewsCard;