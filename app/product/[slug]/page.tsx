import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getShareMetadata } from "@/lib/share";

type Props = {
  params: Promise<{ slug: string }>;
};

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
    description: data.description,
    alternates: {
      canonical: data.canonical_url,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: shareUrl,
      type: "website",
      siteName: "South Jersey Sourdough",
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

  if (!data) {
    notFound();
  }

  return (
    <main className="page">
      <div className="card">
        <div className="imageWrap">
          <img src={data.image} alt={data.title} />
        </div>

        <div className="content">
          <div className="eyebrow">South Jersey Sourdough</div>
          <h1>{data.title}</h1>
          <p>{data.description}</p>

          <div className="actions">
            <a className="button" href={data.canonical_url}>
              View Product
            </a>
            <a className="link" href="https://southjerseysourdough.com">
              Visit Store
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}