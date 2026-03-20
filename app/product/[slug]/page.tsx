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
    <div className="min-h-screen bg-[#e6dfd4] flex items-center justify-center p-6">
      <div className="w-full max-w-[640px] rounded-2xl overflow-hidden shadow-xl bg-[#f4efe7] border border-[#e0d6c8]">

        {/* IMAGE */}
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-[260px] object-cover"
        />

        {/* CONTENT */}
        <div className="p-7">
          <p className="text-xs tracking-[0.1em] text-[#9a7b55] mb-3 font-medium">
            SOUTH JERSEY SOURDOUGH
          </p>

          <h1 className="text-[2rem] font-semibold text-[#4b382a] mb-3 leading-tight">
            {data.title}
          </h1>

          <p className="text-[15px] text-[#6a5643] mb-6 line-clamp-3 leading-relaxed">
            {data.description}
          </p>

          <div className="flex gap-3">

            {/* PRIMARY BUTTON — SJS BROWN */}
            <a
              href={data.canonical_url}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#8a5a33] text-[#fff7ec] text-sm font-semibold no-underline shadow-md hover:bg-[#6f4728] transition-colors"
            >
              View Product
            </a>

            {/* SECONDARY BUTTON — SOFT TAN */}
            <a
              href={STORE_URL}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-[#d8cbb8] bg-[#fbf8f3] text-[#5f4a37] text-sm font-medium no-underline hover:bg-[#f1e9df] transition-colors"
            >
              Visit Store
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}