export type ShareMetadata = {
  slug: string;
  title: string;
  description: string;
  image: string;
  canonical_url: string;
};

export async function getShareMetadata(slug: string): Promise<ShareMetadata | null> {
  const url =
    `https://jurinxsknuimlsbkspkx.supabase.co/functions/v1/share-metadata?slug=${encodeURIComponent(slug)}`;

  const res = await fetch(url, {
    headers: {
      accept: "application/json",
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as ShareMetadata;

  if (!data?.slug || !data?.title || !data?.description || !data?.image || !data?.canonical_url) {
    return null;
  }

  return data;
}