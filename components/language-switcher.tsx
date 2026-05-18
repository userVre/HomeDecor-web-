"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { languages, type LanguageCode } from "@/lib/i18n";

declare global {
  interface Window {
    __homeDecorLanguage?: LanguageCode;
    __homeDecorTranslate?: (language: LanguageCode) => void;
  }
}

const storageKey = "homedecor-language";

const flagStyles: Record<LanguageCode, CSSProperties> = {
  en: {
    background:
      "linear-gradient(#b22234 0 14%, #fff 14% 28%, #b22234 28% 42%, #fff 42% 56%, #b22234 56% 70%, #fff 70% 84%, #b22234 84%)",
  },
  de: { background: "linear-gradient(#000 0 33%, #dd0000 33% 66%, #ffce00 66%)" },
  es: { background: "linear-gradient(#aa151b 0 25%, #f1bf00 25% 75%, #aa151b 75%)" },
  fr: { background: "linear-gradient(90deg, #002395 0 33%, #fff 33% 66%, #ed2939 66%)" },
  pt: { background: "linear-gradient(90deg, #006600 0 42%, #ff0000 42%)" },
  zh: { background: "#de2910" },
  it: { background: "linear-gradient(90deg, #009246 0 33%, #fff 33% 66%, #ce2b37 66%)" },
  nl: { background: "linear-gradient(#ae1c28 0 33%, #fff 33% 66%, #21468b 66%)" },
  pl: { background: "linear-gradient(#fff 0 50%, #dc143c 50%)" },
  ja: { background: "radial-gradient(circle at 50% 50%, #bc002d 0 28%, #fff 29%)" },
  tr: { background: "#e30a17" },
};

function Flag({ code }: { code: LanguageCode }) {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block h-3.5 w-5 shrink-0 overflow-hidden rounded-[3px] border border-line bg-white shadow-sm"
      style={flagStyles[code]}
    >
      {code === "zh" ? (
        <span className="absolute left-1 top-[2px] text-[8px] leading-none text-yellow-300">
          {"\u2605"}
        </span>
      ) : null}
      {code === "tr" ? (
        <span className="absolute left-[5px] top-[1px] text-[10px] leading-none text-white">
          {"\u25CF"}
        </span>
      ) : null}
    </span>
  );
}

function isLanguageCode(value: string | null): value is LanguageCode {
  return languages.some((language) => language.code === value);
}

function getSavedLanguage() {
  try {
    return window.localStorage?.getItem(storageKey) ?? null;
  } catch {
    return null;
  }
}

function saveLanguage(language: LanguageCode) {
  try {
    window.localStorage?.setItem(storageKey, language);
  } catch {
    // Private browsing or strict storage settings should not break language switching.
  }
}

function updateUrlLanguage(language: LanguageCode) {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", language);
  window.history.replaceState(null, "", url);
}

export function LanguageSwitcher() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const menuRef = useRef<HTMLDetailsElement>(null);

  const selectedLanguage = useMemo(
    () => languages.find((item) => item.code === language) ?? languages[0],
    [language],
  );

  useEffect(() => {
    const paramsLanguage = new URLSearchParams(window.location.search).get("lang");
    const savedLanguage = getSavedLanguage();
    const nextLanguage = isLanguageCode(paramsLanguage)
      ? paramsLanguage
      : isLanguageCode(savedLanguage)
        ? savedLanguage
        : "en";

    saveLanguage(nextLanguage);
    window.__homeDecorLanguage = nextLanguage;
    window.__homeDecorTranslate?.(nextLanguage);

    const timeout = window.setTimeout(() => setLanguage(nextLanguage), 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    saveLanguage(language);
    window.__homeDecorLanguage = language;
    window.__homeDecorTranslate?.(language);
  }, [language]);

  return (
    <details ref={menuRef} className="relative" data-i18n-ignore>
      <summary
        aria-label="Change language"
        className="flex h-9 cursor-pointer list-none items-center gap-2 rounded-full border border-line bg-white px-3 text-sm font-medium text-foreground transition marker:hidden hover:border-brand-blue hover:bg-[var(--brand-blue-soft)] sm:h-10 [&::-webkit-details-marker]:hidden"
      >
        <Flag code={selectedLanguage.code} />
        <span data-language-summary-name className="hidden md:inline">
          {selectedLanguage.name}
        </span>
        <span className="text-muted" aria-hidden="true">
          {"\u25BE"}
        </span>
      </summary>

      <div className="absolute right-0 top-12 z-50 w-60 overflow-hidden rounded-[18px] border border-line bg-white p-2 shadow-[0_24px_70px_rgba(28,32,36,0.14)]">
        {languages.map((item) => (
          <a
            key={item.code}
            href={`?lang=${item.code}`}
            data-language-option={item.code}
            aria-current={item.code === language ? "true" : undefined}
            onClick={(event) => {
              event.preventDefault();
              setLanguage(item.code);
              saveLanguage(item.code);
              updateUrlLanguage(item.code);
              window.__homeDecorLanguage = item.code;
              window.__homeDecorTranslate?.(item.code);
              menuRef.current?.removeAttribute("open");
            }}
            className={`flex w-full items-center justify-between rounded-[12px] px-3 py-2 text-left text-sm font-medium transition hover:bg-[var(--brand-blue-soft)] ${
              item.code === language ? "text-brand-blue" : "text-foreground"
            }`}
          >
            <span className="flex items-center gap-3">
              <Flag code={item.code} />
              <span>{item.name}</span>
            </span>
            <span className="text-brand-blue" aria-hidden="true">
              {item.code === language ? "\u2713" : ""}
            </span>
          </a>
        ))}
      </div>
    </details>
  );
}
