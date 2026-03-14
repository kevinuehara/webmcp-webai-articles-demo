import { useEffect } from "react";
import { ArticleCard } from "./components/ArticleCard";
import { FavoritesSidebar } from "./components/FavoritesSidebar";
import { useArticlesStore } from "./store";
import { fetchArticles } from "./services";
import { useWebMcp } from "./hooks/webMcp";
import { SummarizeModal } from "./components/SummarizeModal";

function App() {
  const {
    articles,
    favorites,
    isSidebarOpen,
    authorSearchInput,
    isOpenSummarizeModal,
    articleIdToSummarize,
    setArticles,
    setAuthorSearchInput,
    addFavorite,
    removeFavorite,
    setIsSidebarOpen,
    setArticleIdToSummarize,
    setIsOpenSummarizeModal,
  } = useArticlesStore();

  useEffect(() => {
    useWebMcp();
  }, []);

  useEffect(() => {
    fetchArticles(12).then(setArticles);
  }, []);

  const handleSearchByAuthor = () => {
    fetchArticles(12, authorSearchInput).then(setArticles);
  };

  return (
    <>
      <main className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto mb-6 flex flex-wrap items-center justify-center gap-3">
          <label htmlFor="author-search" className="sr-only">
            Search by author
          </label>
          <input
            id="author-search"
            type="search"
            placeholder="Search by author..."
            value={authorSearchInput}
            onChange={(e) => setAuthorSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchByAuthor()}
            className="w-64 sm:w-80 px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
            aria-label="Search by author"
          />
          <button
            type="button"
            onClick={handleSearchByAuthor}
            className="px-4 py-3 rounded-xl bg-gray-800 text-white font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors cursor-pointer"
          >
            Search
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open favorites"
          className="fixed top-4 right-4 z-30 flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200"
        >
          <span className="text-2xs font-semibold" aria-hidden>
            Favorites
          </span>
          {favorites.length > 0 && (
            <span className="min-w-5 h-5 px-1.5 flex items-center justify-center text-xs font-semibold text-gray-700 bg-amber-100 rounded-full">
              {favorites.length}
            </span>
          )}
        </button>

        <section
          id="articles"
          className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 max-w-7xl mx-auto"
        >
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onAddToFavorites={addFavorite}
              onOpenSummarizeModal={() => {
                setArticleIdToSummarize(article.id);
                setIsOpenSummarizeModal(true);
              }}
            />
          ))}
        </section>
      </main>

      <FavoritesSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        favorites={favorites}
        onRemove={removeFavorite}
      />

      {isOpenSummarizeModal && articleIdToSummarize && (
        <SummarizeModal
          articleId={articleIdToSummarize}
          onClose={() => setIsOpenSummarizeModal(false)}
        />
      )}
    </>
  );
}

export default App;
