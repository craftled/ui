"use client";

import { useTheme } from "next-themes";
import * as React from "react";

import { applyThemeCssVars, clearThemeCssVars } from "@/lib/apply-theme-vars";
import {
  BRAND_THEMES,
  type BrandTheme,
  DEFAULT_BRAND_ID,
  getBrandTheme,
} from "@/lib/brand-themes";

const STORAGE_KEY = "craftled-brand";
const BRAND_MESSAGE = "craftled-brand";

function isBrandId(id: string) {
  return BRAND_THEMES.some((b) => b.id === id);
}

type BrandContextValue = {
  brandId: string;
  brand: BrandTheme;
  setBrandId: (id: string) => void;
  brands: BrandTheme[];
};

const BrandContext = React.createContext<BrandContextValue | null>(null);

export function useBrand() {
  const ctx = React.useContext(BrandContext);
  if (!ctx) {
    throw new Error("useBrand must be used within BrandProvider");
  }
  return ctx;
}

export function useBrandOptional() {
  return React.useContext(BrandContext);
}

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [brandId, setBrandIdState] = React.useState(DEFAULT_BRAND_ID);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && BRAND_THEMES.some((b) => b.id === stored)) {
      setBrandIdState(stored);
    }
    setMounted(true);
  }, []);

  const brand = getBrandTheme(brandId);

  const setBrandId = React.useCallback(
    (id: string) => {
      const next = getBrandTheme(id);
      setBrandIdState(next.id);
      localStorage.setItem(STORAGE_KEY, next.id);
      if (next.lightOnly) {
        setTheme("light");
      }
      window.postMessage(
        { type: BRAND_MESSAGE, brandId: next.id },
        window.location.origin
      );
    },
    [setTheme]
  );

  const syncBrandId = React.useCallback(
    (id: string) => {
      if (!isBrandId(id) || id === brandId) {
        return;
      }
      const next = getBrandTheme(id);
      setBrandIdState(next.id);
      if (next.lightOnly) {
        setTheme("light");
      }
    },
    [brandId, setTheme]
  );

  React.useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        syncBrandId(event.newValue);
      }
    };

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return;
      }
      if (event.data?.type !== BRAND_MESSAGE) {
        return;
      }
      if (typeof event.data.brandId === "string") {
        syncBrandId(event.data.brandId);
      }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("message", onMessage);
    };
  }, [syncBrandId]);

  React.useEffect(() => {
    if (!mounted) {
      return;
    }

    document.documentElement.dataset.brand = brand.id;

    if (brand.id === DEFAULT_BRAND_ID) {
      clearThemeCssVars(brand.cssVars);
      return;
    }

    const colorScheme = resolvedTheme === "dark" ? "dark" : "light";
    applyThemeCssVars(brand.cssVars, {
      colorScheme,
      lightOnly: brand.lightOnly,
    });
  }, [brand, mounted, resolvedTheme]);

  const value = React.useMemo(
    () => ({
      brandId,
      brand,
      setBrandId,
      brands: BRAND_THEMES,
    }),
    [brand, brandId, setBrandId]
  );

  return (
    <BrandContext.Provider value={value}>{children}</BrandContext.Provider>
  );
}
