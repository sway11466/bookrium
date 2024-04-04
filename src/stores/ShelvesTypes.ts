/**
 */

export type ShelvesStore = {
  shelves: Map<string, Shelf>,
}

// Todo: index by book-id
export type Shelf = {
  id: string,
  name: string,
  description: string,
  books: string[],
};
