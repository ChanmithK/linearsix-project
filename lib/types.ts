// Types for book data
export type Book = {
  id: number;
  title: string;
  author: string;
  rating: number;
  category: string;
  coverUrl: string;
};

export type BookInput = Omit<Book, "id">;
