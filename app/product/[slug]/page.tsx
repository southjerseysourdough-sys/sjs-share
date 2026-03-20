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
    <div className="min-h-screen bg-[#e7e3db] flex items-center justify-center p-6">
      <div className="w-full max-w-[640px] rounded-2xl overflow-hidden shadow-xl bg-[#f8f5ef] border border-[#e2ddd3]">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-[260px] object-cover"
        />

        <div className="p-7">
          <p className="text-xs tracking-[0.08em] text-[#8b7355] mb-3 font-medium">
            SOUTH JERSEY SOURDOUGH
          </p>

          <h1 className="text-[2rem] font-semibold text-[#3f3328] mb-3 leading-tight">
            {data.title}
          </h1>

          <p className="text-[15px] text-[#625548] mb-6 line-clamp-3 leading-relaxed">
            {data.description}
          </p>

          <div className="flex gap-3">
            <a
              href={data.canonical_url}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#8f3a36] text-[#fff7ef] text-sm font-semibold no-underline shadow-sm hover:bg-[#7a2f2c] transition-colors"
            >
              View Product
            </a>

            <a
              href={STORE_URL}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-[#d5c7b8] bg-[#fffdfa] text-[#5a4a3d] text-sm font-medium no-underline hover:bg-[#f6f0e8] transition-colors"
            >
              Visit Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}