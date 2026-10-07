import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { products } from '@/data/products';
import { reviews as allReviews } from '@/data/reviews';
import { ProductDetailClient } from '@/components/product/ProductDetailClient';
import { JsonLd, buildProductSchema, buildBreadcrumbSchema } from '@/components/seo/JsonLd';
import { SITE_CONFIG } from '@/lib/constants';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | Dura Flex Pakistan`,
    description: product.shortDescription || product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | Dura Flex`,
      description: product.shortDescription,
      images: product.images.map((img) => ({
        url: img.src,
        alt: img.alt,
      })),
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const productReviews = allReviews.filter((r) => r.productId === product.id);
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  // Fallback to other products if none in same category
  const finalRelated =
    relatedProducts.length > 0
      ? relatedProducts
      : products.filter((p) => p.id !== product.id).slice(0, 3);

  const productSchema = buildProductSchema({
    name: product.name,
    description: product.description,
    image: product.images[0]?.src || '',
    slug: product.slug,
    price: product.basePrice,
    salePrice: product.salePrice,
    rating: product.rating,
    reviewCount: product.reviewCount,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: product.name, href: `/products/${product.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[productSchema, breadcrumbSchema]} />
      <ProductDetailClient
        product={product}
        reviews={productReviews}
        relatedProducts={finalRelated}
      />
    </>
  );
}
