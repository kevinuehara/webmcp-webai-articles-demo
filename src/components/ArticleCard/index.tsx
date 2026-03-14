import type { ArticleType } from "../../types";

interface ArticleCardProps {
  article: ArticleType;
  onAddToFavorites?: (article: ArticleType) => void;
  onOpenSummarizeModal?: (id: string | number) => void;
}

export function ArticleCard({
  article,
  onAddToFavorites,
  onOpenSummarizeModal,
}: ArticleCardProps) {
  const tags = article.tag_list;

  return (
    <article
      className="flex flex-col bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-200 ease-out hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5"
      data-article-id={article.id}
    >
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block leading-0"
      >
        <img
          className="w-full h-[200px] object-cover block"
          src={article.cover_image}
          alt={article.title}
        />
      </a>
      <div className="flex flex-col flex-1 p-4 px-5">
        <div className="flex items-center flex-wrap gap-2 mb-2 text-[0.8rem] text-gray-500">
          <span
            className="inline-flex items-center text-[0.7rem] font-semibold font-mono text-gray-500 bg-gray-200 px-2 py-0.5 rounded-md tracking-wide"
            title="Article ID"
          >
            ID: {article.id}
          </span>
          <img
            className="w-6 h-6 rounded-full object-cover"
            src={article.user.profile_image_90 ?? article.user.profile_image}
            alt={article.user.name}
          />
          <span className="font-semibold text-gray-900">
            {article.user.name}
          </span>
          <span className="text-gray-500">{article.readable_publish_date}</span>
          <span className="text-gray-500">
            {article.reading_time_minutes} min read
          </span>
        </div>
        <h2 className="text-[1.1rem] font-semibold m-0 mb-2 text-gray-900 leading-tight line-clamp-2">
          {article.title}
        </h2>
        <p className="text-sm text-gray-600 m-0 mb-3 leading-snug line-clamp-3">
          {article.description}
        </p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-[0.35rem]">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-4 mt-2 text-[0.85rem] text-gray-500">
          <span className="inline-flex items-center gap-1">
            ❤️ {article.positive_reactions_count}
          </span>
          <span className="inline-flex items-center gap-1">
            💬 {article.comments_count}
          </span>
        </div>
        <div className="mt-auto pt-4 flex flex-col gap-2">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full py-2.5 px-4 text-sm font-semibold text-center text-gray-900 bg-white border border-gray-300 rounded-lg no-underline transition-all duration-200 ease-out hover:bg-gray-100 hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] active:translate-y-0 active:scale-[0.98] active:shadow-[0_2px_6px_rgba(0,0,0,0.1)]"
          >
            Read article
          </a>
          <button
            type="button"
            onClick={() => onAddToFavorites?.(article)}
            className="w-full py-2.5 px-4 text-sm font-semibold text-gray-900 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer transition-all duration-200 ease-out hover:bg-gray-200 hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] active:translate-y-0 active:scale-[0.98] active:shadow-[0_2px_6px_rgba(0,0,0,0.1)]"
          >
            Add to favorites
          </button>
          <button
            type="button"
            onClick={() => onOpenSummarizeModal?.(article.id)}
            className="w-full py-2.5 px-4 text-sm font-semibold text-gray-900 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer transition-all duration-200 ease-out hover:bg-gray-200 hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] active:translate-y-0 active:scale-[0.98] active:shadow-[0_2px_6px_rgba(0,0,0,0.1)]"
          >
            Summarize with AI
          </button>
        </div>
      </div>
    </article>
  );
}
