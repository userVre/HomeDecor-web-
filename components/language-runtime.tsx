"use client";

import { useEffect } from "react";
import { languages, translations, type LanguageCode } from "@/lib/i18n";

const storageKey = "homedecor-language";
const originals = new WeakMap<Text, string>();

function isLanguage(code: string | null): code is LanguageCode {
  return languages.some((language) => language.code === code);
}

function getLanguage(): LanguageCode {
  const queryLanguage = new URLSearchParams(window.location.search).get("lang");

  if (isLanguage(queryLanguage)) {
    return queryLanguage;
  }

  try {
    const savedLanguage = window.localStorage?.getItem(storageKey) ?? null;

    if (isLanguage(savedLanguage)) {
      return savedLanguage;
    }
  } catch {
    // Storage can be blocked in strict browser modes.
  }

  return "en";
}

function saveLanguage(language: LanguageCode) {
  try {
    window.localStorage?.setItem(storageKey, language);
  } catch {
    // Storage can be blocked in strict browser modes.
  }
}

function shouldSkip(node: Text) {
  const parent = node.parentElement;

  if (!parent) {
    return true;
  }

  return Boolean(
    parent.closest("[data-i18n-ignore]") ||
      ["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT", "SELECT"].includes(
        parent.tagName,
      ),
  );
}

function translateText(text: string, language: LanguageCode) {
  if (language === "en") {
    return text;
  }

  return translations[text]?.[language] ?? text;
}

function getCache(language: LanguageCode): Record<string, string> {
  try {
    return JSON.parse(
      window.localStorage?.getItem(`${storageKey}-cache-${language}`) ?? "{}",
    ) as Record<string, string>;
  } catch {
    return {};
  }
}

function saveCache(language: LanguageCode, cache: Record<string, string>) {
  try {
    window.localStorage?.setItem(
      `${storageKey}-cache-${language}`,
      JSON.stringify(cache),
    );
  } catch {
    // Cache is helpful, not required.
  }
}

async function translateMissing(
  language: LanguageCode,
  pairs: Array<{
    node: Text;
    original: string;
    value: string;
    trimmed: string;
  }>,
) {
  if (language === "en" || pairs.length === 0) {
    return;
  }

  const cache = getCache(language);
  const missing = new Set<string>();

  for (const pair of pairs) {
    const known = translations[pair.original]?.[language];

    if (known) {
      cache[pair.original] = known;
    }

    if (!cache[pair.original]) {
      missing.add(pair.original);
    }
  }

  if (missing.size > 0) {
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: language, texts: Array.from(missing) }),
      });

      if (response.ok) {
        const data = (await response.json()) as {
          translations?: Record<string, string>;
        };

        Object.assign(cache, data.translations ?? {});
        saveCache(language, cache);
      }
    } catch {
      // If automatic translation is unavailable, the curated dictionary still works.
    }
  }

  for (const pair of pairs) {
    const translated = cache[pair.original];

    if (translated) {
      pair.node.nodeValue = pair.value.replace(pair.trimmed, translated);
    }
  }
}

function syncSwitcher(language: LanguageCode) {
  const selected = languages.find((item) => item.code === language) ?? languages[0];
  const name = document.querySelector("[data-language-summary-name]");

  if (name && name.textContent !== selected.name) {
    name.textContent = selected.name;
  }

  document.querySelectorAll("[data-language-option]").forEach((item) => {
    const isCurrent = item.getAttribute("data-language-option") === language;

    if (isCurrent) {
      item.setAttribute("aria-current", "true");
    } else {
      item.removeAttribute("aria-current");
    }
  });
}

function translatePage(language: LanguageCode) {
  document.documentElement.lang = language;
  saveLanguage(language);
  syncSwitcher(language);

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  const unknownPairs: Array<{
    node: Text;
    original: string;
    value: string;
    trimmed: string;
  }> = [];

  while (walker.nextNode()) {
    nodes.push(walker.currentNode as Text);
  }

  for (const node of nodes) {
    if (shouldSkip(node)) {
      continue;
    }

    const value = node.nodeValue ?? "";
    const trimmed = value.trim();

    if (!trimmed) {
      continue;
    }

    if (!originals.has(node)) {
      originals.set(node, trimmed);
    }

    const original = originals.get(node) ?? trimmed;
    const translated = translateText(original, language);
    node.nodeValue = value.replace(trimmed, translated);

    if (language !== "en" && translated === original && original.length > 2) {
      unknownPairs.push({ node, original, value, trimmed });
    }
  }

  void translateMissing(language, unknownPairs);
}

declare global {
  interface Window {
    __homeDecorLanguage?: LanguageCode;
    __homeDecorTranslate?: (language: LanguageCode) => void;
  }
}

export function LanguageRuntime() {
  useEffect(() => {
    const language = getLanguage();

    window.__homeDecorLanguage = language;
    window.__homeDecorTranslate = translatePage;
    translatePage(language);

    const retries = [
      window.setTimeout(() => translatePage(language), 350),
      window.setTimeout(() => translatePage(language), 1400),
    ];

    return () => retries.forEach((retry) => window.clearTimeout(retry));
  }, []);

  return null;
}
