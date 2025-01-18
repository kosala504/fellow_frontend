import { BestToolsProps } from "@/types";
import { getStrapiURL } from "@/lib/utils"; // Utility to get the base Strapi URL

export function BestTools({ Tool, Heading, Description, }: Readonly<BestToolsProps>) {
  return (
    <section className="text-center p-8">
  <h1 className="font-heading text-3xl font-semibold sm:text-4xl mb-2">{Heading}</h1>
  <h2 className="font-bold uppercase text-primary text-center">{Description}</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-7xl mx-auto">
    {Tool.map((tool, index) => (
      <div
        key={index}
        className="bg-transparent border border-gray-200 rounded-lg shadow p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg"
      >
        {tool.icon && (
          <img
            src={`${getStrapiURL()}${tool.icon.url}`} // Prepend the base URL
            alt={tool.icon.alternativeText || "Tool Icon"}
            className="w-12 h-12 mb-4"
          />
        )}
        <p className="text-white font-medium">{tool.toolName}</p>
      </div>
    ))}
  </div>
</section>


  );
}
