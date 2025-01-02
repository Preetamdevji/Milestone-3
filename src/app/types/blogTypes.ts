import { AuthorSchema } from "./authorTypes";

export interface Blog {
    name: string;
    type: string;
    title: string;
    fields: Field[];
    content: BlockType[];
    createdAt: string; // Add `createdAt` if it's in the response.
  blogImage?: ImageField; // Optional blog image
  author?: AuthorSchema;
  }
  

  type Field =
    | StringField
    | SlugField
    | ArrayField
    | DateTimeField
    | ImageField
    | ObjectField;
  
export interface StringField {
    name: string;
    type: 'string';
    title: string;
  }
  
export interface SlugField {
    name: string;
    type: 'slug';
    title: string;
    options: {
      source: string;
      maxLength: number;
      slugify: (input: string) => string;
    };
  }
  
export interface ArrayField {
    name: string;
    title: string;
    type: 'array';
    of: BlockType[];
  }
  
  type BlockType = { type: 'block' } | ImageBlock;
  
export interface ImageBlock {
    type: 'image';
    fields: AltField[];
  }
  
export interface AltField {
    type: 'text';
    name: 'alt';
    title: 'Alternative text';
    description: string;
    options: {
      isHighlighted: boolean;
    };
  }
  
export interface DateTimeField {
    title: string;
    name: string;
    type: 'datetime';
  }
  
export interface ImageField {
    title: string;
    name: string;
    type: 'image';
    options: {
      hotspot: boolean;
    };
    fields: CaptionField[];
  }
  
export interface CaptionField {
    name: string;
    type: 'string';
    title: string;
  }
  
export interface ObjectField {
    name: string;
    type: 'object';
    fields: ReferenceField[];
  }
  
export interface ReferenceField {
    title: string;
    name: string;
    type: 'reference';
    to: ReferenceTo[];
  }
  
export interface ReferenceTo {
    type: string;
  }