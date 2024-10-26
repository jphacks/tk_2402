export interface Book {
    id: string;
    volumeInfo: {
      title: string;
      description?: string;
      preview: boolean;
      previewLink: string;
      imageLinks?: {
        smallThumbnail: string;
      };
    };
    saleInfo?: {
      saleability: string;
      buyLink?: string;
    };
  }
  