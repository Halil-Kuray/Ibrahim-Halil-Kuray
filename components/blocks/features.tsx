import { Section } from "../util/section";
import { Container } from "../util/container";
import { Icon } from "../util/icon";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import {
  PageBlocksFeatures,
  PageBlocksFeaturesItems,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

export const Feature = ({
  featuresColor,
  data,
}: {
  featuresColor: string;
  data: PageBlocksFeaturesItems;
}) => {
  return (
    <div
      data-tina-field={tinaField(data)}
      className="flex flex-col gap-2 text-center items-center lg:items-start lg:text-left max-w-xl mx-auto  bg-blue-100"
      style={{ flexBasis: "12rem" }}
      color={featuresColor}
    >
      {data.title && (
        <h3
          data-tina-field={tinaField(data, "title")}
          className="text-lg font-semibold title-font"
        >
          {data.title}
        </h3>
      )}
      {data.text && (
        <div
        className={`prose prose-md ${
          featuresColor === "primary" ? `prose-primary` : `dark:prose-dark`
        }`}
          data-tina-field={tinaField(data, "text")}
        >
          <TinaMarkdown content={data.text} />
        </div>
      )}
    </div>
  );
};

export const Features = ({ data }: { data: PageBlocksFeatures }) => {
  return (
    <Section color={data.color}>
      <Container size="small" width="medium">
        {data.title && (
          <h3 data-tina-field={tinaField(data, "title")}
            className="relative block py-1 mb-8 text-xl font-bold tracking-wide title-font z-20"
          >{data.title}</h3>
        )}
        {data.description && (
          <p data-tina-field={tinaField(data, "description")}
          className={`w-full relative	mb-8 text-xl tracking-normal leading-tight`}
          >
            {data.description}
          </p>
        )}
        <Section className={`flex flex-wrap gap-x-10 gap-y-8 text-left`}>
          {data.items &&
            data.items.map(function (block, i) {
              return <Feature featuresColor={data.color} key={i} data={block} />;
            })}
        </Section>

      </Container>
    </Section>
  );
};

const defaultFeature = {
  title: "Here's Another Feature",
  text: "This is where you might talk about the feature",
};

export const featureBlockSchema: Template = {
  name: "features",
  label: "Features",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      items: [defaultFeature, defaultFeature, defaultFeature],
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "string",
      name: "description",
      label: "Description",
    },
    {
      type: "object",
      label: "Feature Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultFeature,
        },
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Text",
          name: "text",
        },
      ],
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
  ],
};
