import { fetchArticleById, fetchArticles } from "../services";
import { useArticlesStore } from "../store";

export const useWebMcp = () => {
  if (typeof navigator !== "undefined" && "modelContext" in navigator) {
    (navigator as any).modelContext.provideContext({
      tools: [
        {
          name: "handle_search_by_author",
          description: "Search for articles by author.",
          inputSchema: {
            type: "object",
            properties: {
              username: {
                type: "string",
                default: "kevin-uehara",
                description: "The username of the author to search for.",
              },
            },
          },
          execute: async ({ username }: { username?: string }) => {
            const author = username ?? "kevin-uehara";
            const results = await fetchArticles(12, author);
            useArticlesStore.getState().setArticles(results);
            return {
              content: [
                {
                  type: "text",
                  text:
                    results.length > 0
                      ? `Found ${results.length} listings: ${JSON.stringify(results)}`
                      : "No listings found matching your criteria.",
                },
              ],
            };
          },
        },
        {
          name: "add_favorite",
          description: "Add an article to the favorites list.",
          inputSchema: {
            type: "object",
            properties: {
              id: {
                type: "array",
                items: { type: "string" },
                description:
                  "The id(s) of the article(s) to add to the favorites list.",
              },
            },
          },
          execute: async ({ id }: { id: string[] }) => {
            const articleId = Array.isArray(id) ? id[0] : id;
            if (!articleId)
              return {
                content: [
                  { type: "text" as const, text: "No article id provided." },
                ],
              };
            const article = await fetchArticleById(articleId);
            if (article) useArticlesStore.getState().addFavorite(article);
            return {
              content: [
                {
                  type: "text",
                  text: article
                    ? `Article added to favorites: ${JSON.stringify(article)}`
                    : "Article not found.",
                },
              ],
            };
          },
        },
        {
          name: "remove_article_from_favorites",
          description: "Remove an article from the favorites list.",
          inputSchema: {
            type: "object",
            properties: {
              id: {
                type: "array",
                items: { type: "number" },
                description:
                  "The id(s) of the article(s) to remove from the favorites list.",
              },
              title: {
                type: "array",
                items: { type: "string" },
                description:
                  "The title(s) of the article(s) to remove from the favorites list.",
              },
            },
          },
          execute: async ({
            id,
            title,
          }: {
            id?: number[];
            title?: string[];
          }) => {
            const firstId = Array.isArray(id) ? id[0] : undefined;
            const firstTitle = Array.isArray(title) ? title[0] : undefined;
            const article = useArticlesStore
              .getState()
              .favorites.find(
                (a) => a.id === firstId || a.title === firstTitle,
              );
            if (article) {
              useArticlesStore.getState().removeFavorite(article);
              return {
                content: [
                  { type: "text", text: "Article removed from favorites." },
                ],
              };
            }
            return {
              content: [{ type: "text", text: "Article not found." }],
            };
          },
        },
        {
          name: "get_favorites",
          description: "Get the favorites list.",
          inputSchema: { type: "object", properties: {} },
          execute: async () => {
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(useArticlesStore.getState().favorites),
                },
              ],
            };
          },
        },
        {
          name: "open_summarize_modal",
          description: "Open the summarize modal.",
          inputSchema: {
            type: "object",
            properties: {
              articleId: {
                type: "string",
                description: "The id of the article to summarize.",
              },
            },
          },
          execute: async ({ articleId }: { articleId: string }) => {
            useArticlesStore.getState().setArticleIdToSummarize(articleId);
            useArticlesStore.getState().setIsOpenSummarizeModal(true);
            return {
              content: [{ type: "text", text: "Summarize modal opened." }],
            };
          },
        },
        {
          name: "clear_favorites",
          description: "Clear the favorites list.",
          inputSchema: { type: "object", properties: {} },
          execute: async () => {
            useArticlesStore.getState().clearFavorites();
            return {
              content: [{ type: "text", text: "Favorites cleared." }],
            };
          },
        },
      ],
    });
  }
};
