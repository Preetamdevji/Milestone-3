export interface AuthorSchema {
    name: string;
    type: string;
    title: string;
    fields: AuthorField[];
  }
  
  type AuthorField = StringField | ImageField;
  
export interface StringField {
    name: string;
    type: 'string';
    title: string;
  }
  
export interface ImageField {
    name: string;
    type: 'image';
    title: string;
  }


  