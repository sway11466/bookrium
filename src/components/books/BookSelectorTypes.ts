import { Book } from 'src/stores/BookTypes'

/**
 * 
 */
export type SelectableBook = Book & {
  selected: boolean,
}
