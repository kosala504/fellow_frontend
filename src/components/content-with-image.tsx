import React from "react";
import type { ContentWithImageProps } from "@/types";
import { cn } from "@/lib/utils";
import { StrapiImage } from "./strapi-image";

function serializeRichText(richText: any): string {
  if (!Array.isArray(richText)) return '';

  return richText
    .map((block) => {
      if (block.type === 'list' && block.format === 'unordered') {
        // Handle unordered lists
        const items = block.children
          .map((child: any) => {
            if (child.type === 'list-item' && child.children) {
              // Extract text from list-item
              return `<li>${child.children
                .map((grandChild: any) => grandChild.text || '')
                .join('')}</li>`;
            }
            return '';
          })
          .join('');
        return `<ul>${items}</ul>`;
      }
      return ''; // Add more cases if needed for other block types
    })
    .join('');
}


export default function ContentWithImage(data: Readonly<ContentWithImageProps>) {
  if (!data) return null;

  const { reverse, image, heading, subHeading, richText } = data;
  const reverseStyle = reverse ? "md:flex-row-reverse" : "md:flex-row";
  const richTextHtml = serializeRichText(richText);

  return (
    <section
      className={cn("container flex flex-col gap-10 py-24 md:items-center md:gap-24", reverseStyle)}
    >
      <div className="relative flex-1">
        <StrapiImage
          src={image.url}
          alt={image.name}
          width={713}
          height={497.7}
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-5">
        <div className="flex flex-col gap-3">
          <span className="font-bold uppercase text-primary text-left">{subHeading}</span>
          <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-left">
            {heading}
          </h2>
        </div>
        <div
          className="
            text-lg text-muted-foreground max-w-lg text-left 
            [&>p]:mb-4 [&>p]:text-muted-foreground
            [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 
            [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 
            [&>li]:mb-1 [&>li]:text-muted-foreground 
            [&>strong]:font-bold [&>em]:italic
          "
          dangerouslySetInnerHTML={{ __html: richTextHtml }}
        />
      </div>
    </section>
  );
}


