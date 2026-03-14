import type { ArticleByIdType } from "../types";

export const summarizeArticle = async (article: ArticleByIdType) => {
  if ("Summarizer" in self) {
    const availability = await self.Summarizer!.availability();
    if (availability === "unavailable") {
      console.error("Summarizer API is unavailable");
      return;
    }

    const summarizer = await self.Summarizer!.create({
      type: "tldr",
      format: "plain-text",
      length: "medium",
      expectedInputLanguages: ["en", "ja", "es"],
      outputLanguage: "en",
      expectedContextLanguages: ["en"],
      sharedContext:
        "This is a article about the development programming (news, tutorials, etc.)",
      monitor(m: any) {
        m.addEventListener("downloadprogress", (e: any) => {
          console.log(`Downloaded ${e.loaded * 100}%`);
        });
      },
    });

    const summary = await summarizer.summarize(article.body_markdown);
    return summary;
  }
};
