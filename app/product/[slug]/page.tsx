import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ProductData = {
  slug: string;
  title: string;
  description: string;
  image: string;
  canonicalUrl: string;
};

const PRODUCTS: Record<string, ProductData> = {
  "original-starter": {
    slug: "original-starter",
    title: "Original Sourdough Starter",
    description:
      "A mature dehydrated sourdough starter from South Jersey Sourdough.",
    image:
      "https://southjerseysourdough.com/opengraph-image.png",
    canonicalUrl:
      "https://southjerseysourdough.com/shop/organic-authentic-italian-liquid-sourdough-starter",
  },
  "einkorn-starter": {
    slug: "einkorn-starter",
    title: "Organic Einkorn Sourdough Starter",
    description:
      "A traditional dehydrated Einkorn sourdough starter for home bakers.",
    image:
      "https://southjerseysourdough.com/opengraph-image.png",
    canonicalUrl:
      "https://southjerseysourdough.com/shop/organic-einkorn-sourdough-starter",
  },
  "rye-starter": {
    slug: "rye-starter",
    title: "Rye Sourdough Starter",
    description:
      "A mature dehydrated rye sourdough starter from South Jersey Sourdough.",
    image:
      "https://southjerseysourdough.com/opengraph-image.png",
    canonicalUrl:
      "https://southjerseysourdough.com/shop/rye-sourdough-starter",
  },
};

function getProduct(slug: string): ProductData | null {
  return PRODUCTS[slug] ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {
      title: "South Jersey Sourdough",
      description: "Traditional sourdough starters and baking goods.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const shareUrl = `https://share.southjerseysourdough.com/product/${product.slug}`;

  return {
    title: product.title,
    description: product.description,
    alternates: {
      canonical: product.canonicalUrl,
    },
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: product.title,
      description: product.description,
      url: shareUrl,
      siteName: "South Jersey Sourdough",
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductSharePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${product.canonicalUrl}`} />
      </head>
      <body>
        <p>Redirecting...</p>
      </body>
    </html>
  );
}