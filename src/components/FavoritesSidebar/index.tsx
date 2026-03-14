import type { ArticleType } from "../../types";

interface FavoritesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: ArticleType[];
  onRemove: (article: ArticleType) => void;
}

export function FavoritesSidebar({
  isOpen,
  onClose,
  favorites,
  onRemove,
}: FavoritesSidebarProps) {
  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label="Close menu"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-200 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-2xl" aria-hidden>
              ★
            </span>
            Favorites {favorites.length > 0 && `(${favorites.length})`}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close favorites"
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-4">
          {favorites.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No articles in favorites. Click &quot;Add to favorites&quot; on a
              card.
            </p>
          ) : (
            <ul className="space-y-4">
              {favorites.map((article) => (
                <li
                  key={article.id}
                  className="flex gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100/80 transition-colors"
                >
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-200"
                  >
                    <img
                      src={article.cover_image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {article.user.name} · {article.readable_publish_date}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-blue-600 hover:underline"
                      >
                        Read
                      </a>
                      <button
                        type="button"
                        onClick={() => onRemove(article)}
                        className="text-xs font-medium text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
