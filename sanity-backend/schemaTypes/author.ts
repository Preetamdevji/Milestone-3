interface AuthorSchema {
  name: string;
  type: string;
  title: string;
  fields: AuthorField[];
}

type AuthorField = StringField | ImageField;

interface StringField {
  name: string;
  type: 'string';
  title: string;
}

interface ImageField {
  name: string;
  type: 'image';
  title: string;
}

const authorSchema: AuthorSchema = {
  name: 'author',
  type: 'document',
  title: 'Authors',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'about',
      type: 'string',
      title: 'About',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
  ],
};

export default authorSchema;
