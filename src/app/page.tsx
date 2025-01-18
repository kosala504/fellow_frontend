import type { Block } from "@/types";
import qs from "qs";
import { getStrapiURL } from "@/lib/utils";

import { Hero } from "@/components/hero";
import { CardGrid } from "@/components/card-grid";
import { SectionHeading } from "@/components/section-heading";
import ContentWithImage from "@/components/content-with-image";
import { Pricing } from "@/components/pricing";
import { BestTools } from "@/components/best-tools";
import BlogRoute from "@/components/latest-posts";

// Type for the page props
interface HomeProps {
  searchParams: {
    page?: string;
    query?: string;
    category?: string;
  };
}

async function loader() {
  const { fetchData } = await import("@/lib/fetch");
  const path = "/api/landing-page";
  const baseUrl = getStrapiURL();

  const query = qs.stringify({
    populate: {
      blocks: {
        on: {
          "layout.hero": {
            populate: {
              image: {
                fields: ["url", "alternativeText", "name"],
              },
              backgroundImage: {
                fields: ["url", "alternativeText", "name"],
              },
              buttonLink: {
                populate: "*",
              },
              topLink: {
                populate: "*",
              },
            },
          },
          "layout.card-grid": {
            populate: "*",
          },
          "layout.section-heading": {
            populate: "*",
          },
          "layout.content-with-image": {
            populate: {
              image: {
                fields: ["url", "alternativeText", "name"],
              },
            },
          },
          "layout.price-grid": {
            populate: {
              priceCard: {
                populate: "*",
              },
            },
          },
          "layout.best-tools": {
            populate: {
              Tool: {
                populate: "icon",
              },
            },
          },
        },
      },
    },
  });

  const url = new URL(path, baseUrl);
  url.search = query;
  const data = await fetchData(url.href);
  return data;
}

function BlockRenderer(block: Block) {
  switch (block.__component) {
    case "layout.hero":
      return <Hero key={block.id} {...block} />;
    case "layout.card-grid":
      return <CardGrid key={block.id} {...block} />;
    case "layout.section-heading":
      return <SectionHeading key={block.id} {...block} />;
    case "layout.content-with-image":
      return <ContentWithImage key={block.id} {...block} />;
    case "layout.price-grid":
      return <Pricing key={block.id} {...block} />;
    case "layout.best-tools":
      return <BestTools key={block.id} {...block} />;
    default:
      return null;
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const data = await loader();
  const blocks = data?.data?.blocks;
  if (!blocks) return null;

  // Separate the first block from the rest
  const [firstBlock, ...remainingBlocks] = blocks;

  return (
    <div>
      {/* Render the first block */}
      {BlockRenderer(firstBlock)}

      {/* Insert the Blog section with searchParams */}
      <section>
        <BlogRoute searchParams={searchParams} />
      </section>

      {/* Render the remaining blocks */}
      {remainingBlocks.map((block: Block) => BlockRenderer(block))}
    </div>
  );
}