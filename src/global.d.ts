/**
 * Global type declarations for browser APIs not in default TypeScript libs.
 */

/** Chrome Summarizer API (Chrome 138+, desktop) */
interface SummarizerAPI {
  availability(): Promise<
    "readily" | "after-download" | "no-model" | "unavailable"
  >;
  create(options: SummarizerCreateOptions): Promise<SummarizerInstance>;
}

interface SummarizerCreateOptions {
  type?: "tldr" | "teaser" | "key-points" | "headline";
  format?: "plain-text" | "markdown";
  length?: "short" | "medium" | "long";
  expectedInputLanguages?: string[];
  outputLanguage?: string;
  expectedContextLanguages?: string[];
  sharedContext?: string;
  monitor?: (model: unknown) => void;
}

interface SummarizerInstance {
  summarize(text: string): Promise<string>;
}

declare global {
  interface Window {
    Summarizer?: SummarizerAPI;
  }
}

export {};
