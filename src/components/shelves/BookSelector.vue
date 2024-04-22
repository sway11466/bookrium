<template>
  <q-infinite-scroll @load="next" class="q-pa-md row items-start q-gutter-md">
    <template v-slot:loading>
      <q-spinner color="primary" size="40px" />
    </template>
    <template v-for="(book, index) in part" :key="index">
      <q-card @click="click(book)" flat bordered :class="{selected: selected.has(book.id)}">
        <q-card-section>
          <q-img :src="book.artwork" fit="contain" no-spinner />
        </q-card-section>
        <q-card-section class="q-pt-none q-mb-sm text-caption title">
          {{ book.title }}
        </q-card-section>
      </q-card>    
    </template>
  </q-infinite-scroll>

  <q-page-sticky position="bottom" :offset="[0, 18]">
    <q-btn @click="complete" unelevated rounded no-caps color="primary" class="q-px-xl">
      <q-icon :name=" mode === 'add' ? 'mdi-book-plus-multiple-outline' : 'mdi-book-remove-multiple-outline'" />
      <div class="q-pl-md">{{ (mode === 'add' ? 'add' : 'delete') }} {{ selected.size }} books to shelf</div>
    </q-btn>
  </q-page-sticky>
</template>

<style scoped>
.q-card {
  width: 14em;
  cursor: pointer;
}
.q-img {
  height: 14em;
}
.title {
  height: 3em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.selected {
  opacity: 0.5;
  background-color: gray;
}
</style>

<script setup lang="ts">
import { Ref, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBooksStore } from 'src/stores/Books';
import { useShelvesStore } from 'src/stores/Shelves';
import { Book } from 'src/stores/BookTypes';

const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator(value: string) {
      return ['add', 'del'].includes(value);
    }
  },
  shelfid: {
    type: String,
    required: false,
    default: ''
  }
});

const router = useRouter();
const books = useBooksStore();
const shelves = useShelvesStore();

const shelf = shelves.clone(shelves.get(props.shelfid));
const all = computed<Book[]>(() => {
  switch (props.mode) {
    case 'add':
      return books.list.filter(book => !shelf.books.includes(book.id));
    case 'del':
      return shelf.books.map(id => books.get(id));
    default:
      return [];
  }
})

const part: Ref<Book[]> = ref([]);
function next(index: number, done: (stop?: boolean) => void) {
  const items = all.value.slice((index-1)*10, index*10);
  part.value.push(...items);
  done(items.length === 0);
}

const selected: Ref<Map<string, Book>> = ref(new Map());

function click(book: Book) {
  console.log('[BookSelector] book clicked:', book.title);
  selected.value.has(book.id) ? selected.value.delete(book.id) : selected.value.set(book.id, book);
}

function complete() {
  console.log('[BookSelector] add book button clicked');
  switch (props.mode) {
    case 'add':
      shelf.books.splice(0, 0, ...selected.value.keys());
      break;
    case 'del':
      selected.value.forEach((book, id) => {
        const index = shelf.books.indexOf(id);
        if (index >= 0) { shelf.books.splice(index, 1); }
      });
      break;
  }
  shelves.update(shelf);
  router.go(-1);
}
</script>
