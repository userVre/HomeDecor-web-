import { NextResponse } from "next/server";
import { languages, type LanguageCode } from "@/lib/i18n";

const supportedLanguages = new Set(languages.map((language) => language.code));

type TranslateRequest = {
  target?: string;
  texts?: string[];
};

function isLanguageCode(value: unknown): value is LanguageCode {
  return typeof value === "string" && supportedLanguages.has(value as LanguageCode);
}

async function translateText(text: string, target: LanguageCode) {
  if (target === "en") {
    return text;
  }

  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", "en");
  url.searchParams.set("tl", target === "zh" ? "zh-CN" : target);
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", text);

  const response = await fetch(url, {
    headers: {
      "User-Agent": "HomeDecor-AI-Website/1.0",
    },
    next: {
      revalidate: 60 * 60 * 24 * 30,
    },
  });

  if (!response.ok) {
    throw new Error(`Translation request failed: ${response.status}`);
  }

  const data = (await response.json()) as Array<Array<Array<string>>>;

  return data[0]?.map((part) => part[0]).join("") || text;
}

export async function POST(request: Request) {
  const body = (await request.json()) as TranslateRequest;
  const target = body.target;
  const texts = body.texts;

  if (!isLanguageCode(target) || !Array.isArray(texts)) {
    return NextResponse.json(
      { error: "Invalid translation request." },
      { status: 400 },
    );
  }

  const uniqueTexts = Array.from(
    new Set(
      texts
        .filter((text) => typeof text === "string")
        .map((text) => text.trim())
        .filter((text) => text.length > 1 && text.length <= 900),
    ),
  ).slice(0, 80);

  try {
    const translatedEntries = await Promise.all(
      uniqueTexts.map(async (text) => [text, await translateText(text, target)]),
    );

    return NextResponse.json({
      translations: Object.fromEntries(translatedEntries),
    });
  } catch {
    return NextResponse.json(
      { error: "Translation service unavailable." },
      { status: 502 },
    );
  }
}
