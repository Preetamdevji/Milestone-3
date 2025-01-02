interface Blog {
  name: string;
  type: string;
  title: string;
  fields: Field[];
}

type Field =
  | StringField
  | SlugField
  | ArrayField
  | DateTimeField
  | ImageField
  | ObjectField;

interface StringField {
  name: string;
  type: 'string';
  title: string;
}

interface SlugField {
  name: string;
  type: 'slug';
  title: string;
  options: {
    source: string;
    maxLength: number;
    slugify: (input: string) => string;
  };
}

interface ArrayField {
  name: string;
  title: string;
  type: 'array';
  of: BlockType[];
}

type BlockType = { type: 'block' } | ImageBlock;

interface ImageBlock {
  type: 'image';
  fields: AltField[];
}

interface AltField {
  type: 'text';
  name: 'alt';
  title: 'Alternative text';
  description: string;
  options: {
    isHighlighted: boolean;
  };
}

interface DateTimeField {
  title: string;
  name: string;
  type: 'datetime';
}

interface ImageField {
  title: string;
  name: string;
  type: 'image';
  options: {
    hotspot: boolean;
  };
  fields: CaptionField[];
}

interface CaptionField {
  name: string;
  type: 'string';
  title: string;
}

interface ObjectField {
  name: string;
  type: 'object';
  fields: ReferenceField[];
}

interface ReferenceField {
  title: string;
  name: string;
  type: 'reference';
  to: ReferenceTo[];
}

interface ReferenceTo {
  type: string;
}


const blogSchema: Blog = {
  name: 'blog',
  type: 'document',
  title: 'Blogs',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative text',
              description: `Some of your visitors cannot see images, 
                      be they blind, color-blind, low-sighted; 
                      alternative text is of great help for those 
                      people that can rely on it to have a good idea of 
                      what's on your page.`,
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'metaDesc',
      type: 'string',
      title: 'Meta Description',
    },
    {
      title: 'Created At',
      name: 'createdAt',
      type: 'datetime',
    },
    {
      title: 'Blog Image',
      name: 'blogImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
        {
          name: 'attribution',
          type: 'string',
          title: 'Attribution',
        },
      ],
    },
    {
      name: 'author',
      type: 'object',
      fields: [
        {
          title: 'Author',
          name: 'author',
          type: 'reference',
          to: [{ type: 'author' }],
        },
      ],
    },
  ],
};

export default blogSchema;