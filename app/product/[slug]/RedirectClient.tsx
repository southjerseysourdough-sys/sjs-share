'use client';

import { useEffect } from 'react';

type RedirectClientProps = {
  url: string;
  delay?: number;
};

export default function RedirectClient({
  url,
  delay = 1200,
}: RedirectClientProps) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.location.href = url;
    }, delay);

    return () => window.clearTimeout(timer);
  }, [url, delay]);

  return null;
}