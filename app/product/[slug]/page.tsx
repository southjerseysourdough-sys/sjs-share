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
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-[260px] object-cover"
        />

        <div className="p-7">
          <p className="text-xs tracking-[0.1em] text-[#9a7b55] mb-3 font-medium">
            SOUTH JERSEY SOURDOUGH
          </p>

          <h1
            className="text-[2rem] font-semibold mb-3 leading-tight"
            style={{ color: "#4b382a" }}
          >
            {data.title}
          </h1>

          <p
            className="text-[15px] mb-6 line-clamp-3 leading-relaxed"
            style={{ color: "#6a5643" }}
          >
            {data.description}
          </p>

          <div className="flex gap-3">
            <a
              href={data.canonical_url}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl no-underline shadow-md transition-colors hover:opacity-95"
              style={{
                backgroundColor: "#8a5a33",
                color: "#fff7ec",
                border: "1px solid #8a5a33",
                WebkitTextFillColor: "#fff7ec",
              }}
            >
              <span
                style={{
                  color: "#fff7ec",
                  WebkitTextFillColor: "#fff7ec",
                }}
              >
                View Product
              </span>
            </a>

            <a
              href={STORE_URL}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl no-underline transition-colors hover:opacity-95"
              style={{
                backgroundColor: "#fbf8f3",
                color: "#5f4a37",
                border: "1px solid #d8cbb8",
                WebkitTextFillColor: "#5f4a37",
              }}
            >
              <span
                style={{
                  color: "#5f4a37",
                  WebkitTextFillColor: "#5f4a37",
                }}
              >
                Visit Store
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}