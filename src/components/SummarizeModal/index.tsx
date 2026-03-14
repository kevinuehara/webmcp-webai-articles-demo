import { useEffect, useState } from "react";
import { fetchArticleById } from "../../services";
import { summarizeArticle } from "../../hooks/webAI";
import type { ArticleByIdType } from "../../types";

interface SummarizeModalProps {
  articleId: string | number | null;
  onClose: () => void;
}

export function SummarizeModal({ articleId, onClose }: SummarizeModalProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [article, setArticle] = useState<ArticleByIdType | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArticleAndSummarize = async () => {
    if (!articleId) return;
    const articleResponse = await fetchArticleById(String(articleId));
    setArticle(articleResponse);
    setIsLoading(false);
    const summaryResponse = await summarizeArticle(articleResponse);
    setSummary(
      summaryResponse ?? "It was not possible to summarize the article.",
    );
    setIsLoadingSummary(false);
  };

  useEffect(() => {
    fetchArticleAndSummarize();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal
      aria-labelledby="summarize-modal-title"
    >
      <div
        className="absolute inset-0 z-0 bg-black/60 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between shrink-0 px-6 py-4 border-b border-gray-200">
          <h2
            id="summarize-modal-title"
            className="text-lg font-semibold text-gray-900"
          >
            Article details
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {!isLoading && article && (
            <article className="space-y-4">
              {article.cover_image && (
                <img
                  src={article.cover_image}
                  alt=""
                  className="w-full h-48 object-cover rounded-xl"
                />
              )}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {article.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={
                      article.user.profile_image_90 ??
                      article.user.profile_image
                    }
                    alt=""
                  />
                  <span className="font-medium text-gray-700">
                    {article.user.name}
                  </span>
                  <span>·</span>
                  <span>{article.readable_publish_date}</span>
                  <span>·</span>
                  <span>{article.reading_time_minutes} min read</span>
                </div>
              </div>
              {article.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {isLoadingSummary && (
                <div className="flex items-center justify-center py-12">
                  <span className="text-gray-500">Summarizing...</span>
                </div>
              )}
              {summary && !isLoadingSummary && (
                <div className="border-t border-gray-200 pt-4 mt-4 text-gray-700 text-sm leading-relaxed [&_a]:text-blue-600 [&_a]:underline [&_p]:mb-2">
                  <span className="font-bold">Summary:</span> {summary}
                </div>
              )}
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
              >
                Open article on Dev.to →
              </a>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
