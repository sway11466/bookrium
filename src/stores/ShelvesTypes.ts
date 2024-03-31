/**
 * 
 */
export type ShelvesStore = {
  shelves: Map<string, Shelf>,
}

export type Shelf = {
  id: string,
  name: string,
  description: string,
  books: string[],
};
