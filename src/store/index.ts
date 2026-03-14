import { create } from "zustand";
import type { ArticleType } from "../types";

interface ArticlesState {
  articles: ArticleType[];
  favorites: ArticleType[];
  isSidebarOpen: boolean;
  authorSearchInput: string;
  articleIdToSummarize: string | number | null;
  isOpenSummarizeModal: boolean;
  setArticles: (articles: ArticleType[]) => void;
  addFavorite: (article: ArticleType) => void;
  removeFavorite: (article: ArticleType) => void;
  clearFavorites: () => void;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  setAuthorSearchInput: (authorSearchInput: string) => void;
  setArticleIdToSummarize: (
    articleIdToSummarize: string | number | null,
  ) => void;
  setIsOpenSummarizeModal: (isOpenSummarizeModal: boolean) => void;
}

export const useArticlesStore = create<ArticlesState>((set) => ({
  articles: [],
  favorites: [],
  isSidebarOpen: false,
  authorSearchInput: "",
  articleIdToSummarize: null,
  isOpenSummarizeModal: false,
  setArticles: (articles) => set({ articles }),
  addFavorite: (article) =>
    set((state) => ({
      favorites: state.favorites.some((a) => a.id === article.id)
        ? state.favorites
        : [...state.favorites, article],
      isSidebarOpen: true,
    })),
  removeFavorite: (article) =>
    set((state) => ({
      favorites: state.favorites.filter((a) => a.id !== article.id),
    })),
  clearFavorites: () => set({ favorites: [] }),
  setIsSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
  setAuthorSearchInput: (authorSearchInput) => set({ authorSearchInput }),
  setArticleIdToSummarize: (articleIdToSummarize: string | number | null) =>
    set({ articleIdToSummarize }),
  setIsOpenSummarizeModal: (isOpenSummarizeModal: boolean) =>
    set({ isOpenSummarizeModal }),
}));
