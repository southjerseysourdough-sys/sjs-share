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
    <>
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
        {/* BACKGROUND GRAIN */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#e6dfd4",
            backgroundImage: `
              radial-gradient(rgba(120, 92, 62, 0.045) 0.6px, transparent 0.6px),
              radial-gradient(rgba(255, 255, 255, 0.12) 0.6px, transparent 0.6px)
            `,
            backgroundPosition: "0 0, 12px 12px",
            backgroundSize: "24px 24px",
          }}
        />

        {/* LIGHT OVERLAY */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.10), rgba(0,0,0,0.02))",
            mixBlendMode: "soft-light",
          }}
        />

        {/* CARD */}
        <div
          className="relative w-full max-w-[640px] rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "#f4efe7",
            border: "1px solid #e0d6c8",
            boxShadow: "0 18px 40px rgba(90, 64, 36, 0.12)",
            animation: "cardFadeUp 700ms ease-out both",
          }}
        >
          {/* CARD GRAIN */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(rgba(110, 88, 62, 0.03) 0.5px, transparent 0.5px),
                radial-gradient(rgba(255,255,255,0.08) 0.5px, transparent 0.5px)
              `,
              backgroundPosition: "0 0, 10px 10px",
              backgroundSize: "20px 20px",
              opacity: 0.7,
            }}
          />

          {/* IMAGE WRAPPER WITH HOVER */}
          <div className="overflow-hidden group">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-[260px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              style={{
                animation: "imageFadeIn 900ms ease-out both",
              }}
            />
          </div>

          {/* CONTENT */}
          <div className="relative p-7">
            <p
              className="text-xs tracking-[0.1em] mb-3 font-medium"
              style={{
                color: "#9a7b55",
                animation: "contentFade 850ms ease-out both",
              }}
            >
              SOUTH JERSEY SOURDOUGH
            </p>

            <h1
              className="text-[2rem] font-semibold mb-3 leading-tight"
              style={{
                color: "#4b382a",
                animation: "contentFade 950ms ease-out both",
              }}
            >
              {data.title}
            </h1>

            <p
              className="text-[15px] mb-6 line-clamp-3 leading-relaxed"
              style={{
                color: "#6a5643",
                animation: "contentFade 1050ms ease-out both",
              }}
            >
              {data.description}
            </p>

            <div
              className="flex gap-3"
              style={{
                animation: "contentFade 1150ms ease-out both",
              }}
            >
              <a
                href={data.canonical_url}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl no-underline transition-all duration-200 hover:-translate-y-[1px]"
                style={{
                  backgroundColor: "#8a5a33",
                  color: "#fff7ec",
                  border: "1px solid #8a5a33",
                  WebkitTextFillColor: "#fff7ec",
                  boxShadow: "0 8px 18px rgba(138, 90, 51, 0.18)",
                }}
              >
                <span style={{ color: "#fff7ec" }}>
                  View Product
                </span>
              </a>

              <a
                href={STORE_URL}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl no-underline transition-all duration-200 hover:-translate-y-[1px]"
                style={{
                  backgroundColor: "#fbf8f3",
                  color: "#5f4a37",
                  border: "1px solid #d8cbb8",
                  boxShadow: "0 4px 12px rgba(95, 74, 55, 0.05)",
                }}
              >
                <span style={{ color: "#5f4a37" }}>
                  Visit Store
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cardFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes imageFadeIn {
          from {
            opacity: 0;
            transform: scale(1.02);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes contentFade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}