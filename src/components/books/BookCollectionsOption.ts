/**
 * 
 */
export type BookCollectionsOption = {
  bookMenu: {
    editBook: boolean,
  },
  selection: 'single' | 'multiple',
}

export const BookCollectionsOptionDefault: Readonly<BookCollectionsOption> = {
  bookMenu: {
    editBook: false,
  },
  selection: 'single',
}
