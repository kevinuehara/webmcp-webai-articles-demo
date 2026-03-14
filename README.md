# WebMCP + WebAI Web Application

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5-443E3E?style=flat-square)
![WebMCP](https://img.shields.io/badge/Chrome-WebMCP-4285F4?style=flat-square&logo=googlechrome&logoColor=white)
![WebAI](https://img.shields.io/badge/Chrome-WebAI-4285F4?style=flat-square&logo=googlechrome&logoColor=white)

A demo app that showcases **WebMCP** (Model Context Protocol in the browser) and **WebAI** (Chrome’s experimental AI APIs). It lists Dev.to articles, lets you search by author, manage favorites, and summarize articles using on-device AI—all from the browser.

## WebMCP (Chrome Model Context Protocol)

This project uses **WebMCP** so the page can expose **tools** to the browser’s AI (e.g. Chrome’s built-in AI). The app registers tools via `navigator.modelContext.provideContext()`, so the AI can act on the app’s data and UI.

**Exposed tools:**

| Tool                            | Description                                       |
| ------------------------------- | ------------------------------------------------- |
| `handle_search_by_author`       | Search articles by Dev.to username                |
| `add_favorite`                  | Add an article to favorites by ID                 |
| `remove_article_from_favorites` | Remove an article from favorites (by id or title) |
| `get_favorites`                 | Return the current favorites list                 |
| `clear_favorites`               | Clear all favorites                               |
| `open_summarize_modal`          | Open the summarize modal for a given article ID   |

When the user interacts with Chrome’s AI (e.g. in the address bar or side panel), the AI can call these tools to search, add/remove favorites, and open the summarizer—without a separate backend.

## WebAI (Chrome Summarizer)

**WebAI** is used for **on-device summarization** via the experimental **Summarizer** API. When you click “Summarize with AI” on an article, the app:

1. Checks `self.Summarizer` and `Summarizer.availability()`
2. Creates a summarizer with `Summarizer.create()` (e.g. `type: "tldr"`, `length: "medium"`)
3. Calls `summarizer.summarize(article.body_markdown)` to get the summary

Summarization runs in the browser using Chrome’s built-in model, so no external summarization API is required.

## Tech stack

- **React 19** – UI
- **TypeScript** – Typing
- **Vite 7** – Build and dev server
- **Zustand** – Global state (articles, favorites, sidebar, summarize modal)
- **Tailwind CSS 4** – Styling
- **Dev.to API** – Article listing and full article content

## Prerequisites

- **Node.js** (v18+)
- **Chrome** with **WebMCP** and **WebAI** (Summarizer) enabled (experimental flags or a supporting channel)

## Getting started

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev
```

Then open the app in a Chrome build that supports WebMCP and WebAI. Use the search to find articles by author, add/remove favorites, and use “Summarize with AI” on an article (when Summarizer is available).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `pnpm dev`     | Start dev server         |
| `pnpm build`   | Production build         |
| `pnpm preview` | Preview production build |
| `pnpm lint`    | Run ESLint               |

## Project structure

```
src/
├── components/       # ArticleCard, FavoritesSidebar, SummarizeModal
├── hooks/
│   ├── webMcp.ts     # WebMCP tool registration (navigator.modelContext)
│   └── webAI.ts     # WebAI Summarizer usage (self.Summarizer)
├── services/         # Dev.to API client
├── store/            # Zustand store (articles, favorites, UI state)
└── types/            # Shared TypeScript types
```

## References

- [Chrome WebMCP / Model Context Protocol](https://developer.chrome.com/docs/ai/webmcp) (when available)
- [Chrome WebAI / Summarizer](https://developer.chrome.com/docs/ai/webai) (when available)
