import type { Metadata } from 'next';

type Product = {
  name: string;
  description: string;
  image: string;
  canonicalUrl: string;
};

const PRODUCTS: Record<string, Product> = {
  'original-starter': {
    name: 'Original Sourdough Starter',
    description:
      'A mature dehydrated sourdough starter from South Jersey Sourdough.',
    image: 'https://southjerseysourdough.com/opengraph-image.png',
    canonicalUrl:
      'https://southjerseysourdough.com/shop/organic-authentic-italian-liquid-sourdough-starter',
  },
  'organic-starter': {
    name: 'Organic Sourdough Starter',
    description:
      'A mature organic dehydrated sourdough starter from South Jersey Sourdough.',
    image: 'https://southjerseysourdough.com/opengraph-image.png',
    canonicalUrl:
      'https://southjerseysourdough.com/shop/organic-authentic-italian-liquid-sourdough-starter',
  },
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS[slug];

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'This product could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const shareUrl = `https://share.southjerseysourdough.com/product/${slug}`;

  return {
    title: product.name,
    description: product.description,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: product.canonicalUrl,
    },
    openGraph: {
      title: product.name,
      description: product.description,
      url: shareUrl,
      siteName: 'South Jersey Sourdough',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductSharePage({ params }: PageProps) {
  const { slug } = await params;
  const product = PRODUCTS[slug];

  if (!product) {
    return (
      <main
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          padding: '24px',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          background: '#f7f3ee',
          color: '#2b2b2b',
        }}
      >
        <div
          style={{
            maxWidth: '640px',
            width: '100%',
            background: '#ffffff',
            border: '1px solid #e8dfd3',
            borderRadius: '18px',
            padding: '32px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
          }}
        >
          <h1 style={{ marginTop: 0, fontSize: '2rem' }}>Product Not Found</h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.6, marginBottom: 0 }}>
            This product could not be found.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '24px',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        background: '#f7f3ee',
        color: '#2b2b2b',
      }}
    >
      <div
        style={{
          maxWidth: '720px',
          width: '100%',
          background: '#ffffff',
          border: '1px solid #e8dfd3',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 12px 36px rgba(0,0,0,0.08)',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            display: 'block',
            width: '100%',
            aspectRatio: '1200 / 630',
            objectFit: 'cover',
            background: '#efe7dc',
          }}
        />

        <div style={{ padding: '28px' }}>
          <p
            style={{
              margin: '0 0 10px 0',
              fontSize: '0.9rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#7a6a58',
            }}
          >
            South Jersey Sourdough
          </p>

          <h1
            style={{
              margin: '0 0 12px 0',
              fontSize: '2rem',
              lineHeight: 1.15,
            }}
          >
            {product.name}
          </h1>

          <p
            style={{
              margin: '0 0 24px 0',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: '#4b443d',
            }}
          >
            {product.description}
          </p>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href={product.canonicalUrl}
              style={{
                display: 'inline-block',
                padding: '12px 18px',
                borderRadius: '12px',
                background: '#7a6a58',
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              View Product
            </a>

            <a
              href="https://southjerseysourdough.com"
              style={{
                display: 'inline-block',
                padding: '12px 18px',
                borderRadius: '12px',
                background: '#efe7dc',
                color: '#3f372f',
                textDecoration: 'none',
                fontWeight: 600,
                border: '1px solid #ded2c4',
              }}
            >
              Visit Store
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}