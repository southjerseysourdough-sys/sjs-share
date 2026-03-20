import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getShareMetadata } from "@/lib/share";

type Props = {
  params: Promise<{ slug: string }>;
};

const SITE_NAME = "South Jersey Sourdough";
const STORE_URL = "https://southjerseysourdough.com";

function shorten(text: string, maxLength: number): string {
  const clean = (text || "").trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength).trimEnd()}...`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getShareMetadata(slug);

  if (!data) {
    return {
      title: "Product Not Found",
      description: "This product could not be found.",
    };
  }

  const shareUrl = `https://share.southjerseysourdough.com/product/${data.slug}`;

  return {
    title: data.title,
    description: shorten(data.description || "", 155),
    alternates: {
      canonical: data.canonical_url,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: shareUrl,
      type: "website",
      siteName: SITE_NAME,
      images: [
        {
          url: data.image,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [data.image],
    },
  };
}

export default async function ProductSharePage({ params }: Props) {
  const { slug } = await params;
  const data = await getShareMetadata(slug);

  if (!data) return notFound();

  return (
    <div className="min-h-screen bg-[#eae6df] flex items-center justify-center p-6">
      <div className="w-full max-w-[640px] rounded-2xl overflow-hidden shadow-lg bg-[#f5f1ea]">

        {/* IMAGE */}
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-[260px] object-cover"
        />

        {/* CONTENT */}
        <div className="p-6">
          <p className="text-xs tracking-wide text-neutral-500 mb-2">
            SOUTH JERSEY SOURDOUGH
          </p>

          <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
            {data.title}
          </h1>

          <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
            {data.description}
          </p>

          <div className="flex gap-3">
            <a
              href={data.canonical_url}
              className="px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-medium"
            >
              View Product
            </a>

            <a
              href={STORE_URL}
              className="px-4 py-2 rounded-lg border border-neutral-300 text-sm font-medium"
            >
              Visit Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}