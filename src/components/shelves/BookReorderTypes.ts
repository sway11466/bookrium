import { Book } from 'src/stores/BookTypes'

/**
 * 
 */
export type SortableBook = Book & {
  dragging: boolean,
}
