import type { ArticleByIdType, ArticleType } from "../types";

export const fetchArticles = async (
  quantity: number = 12,
  username?: string,
): Promise<ArticleType[]> => {
  const url = new URL("https://dev.to/api/articles");
  if (quantity) url.searchParams.set("per_page", quantity.toString());
  if (username) url.searchParams.set("username", username);
  const response = await fetch(url.toString());
  const data = await response.json();
  return data;
};

export const fetchArticleById = async (
  id: string,
): Promise<ArticleByIdType> => {
  const response = await fetch(`https://dev.to/api/articles/${id}`);
  const data = await response.json();
  return data;
};
