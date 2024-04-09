import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    alias: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/HomePage.vue') }],
  },

  {
    path: '/books',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/books/BooksCollectionPage.vue') }],
  },

  {
    path: '/books/:bookid',
    component: () => import('layouts/DetailLayout.vue'),
    children: [{
      path: '', 
      components: {
        default: () => import('pages/books/BookDetailPage.vue'),
        header: () => import('pages/books/BookDetailHeader.vue'),
        page: () => import('pages/books/BookDetailPage.vue'),
    }}],
  },

  {
    path: '/shelves',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/shelves/ShelfCollectionsPage.vue') }],
  },

  {
    path: '/shelves/new',
    component: () => import('layouts/DetailLayout.vue'),
    children: [{
      path: '',
      components:{
        default: ()  => import('pages/shelves/ShelfEditPage.vue'),
        header: () => import('pages/shelves/ShelfEditHeader.vue'),
        page: () => import('pages/shelves/ShelfEditPage.vue'),
    }}],
  },

  {
    path: '/shelves/:shelfid',
    component: () => import('layouts/DetailLayout.vue'),
    children: [{
        path: '',
        components: {
          default: () => import('pages/shelves/ShelfViewPage.vue'),
          header: () => import('pages/shelves/ShelfViewHeader.vue'),
          page: () => import('pages/shelves/ShelfViewPage.vue'),
      }},{
        path: 'edit',
        components: {
          default: () => import('pages/shelves/ShelfEditPage.vue'),
          header: () => import('pages/shelves/ShelfEditHeader.vue'),
          page: () => import('pages/shelves/ShelfEditPage.vue')
      }},{
        path: 'addBook',
        components: {
          default: () => import('pages/shelves/BookSelectorPage.vue'),
          header: () => import('pages/shelves/BookSelectorHeader.vue'),
          page: () => import('pages/shelves/BookSelectorPage.vue'),
      }},{
        path: 'delBook',
        components: {
          default: () => import('pages/shelves/BookSelectorPage.vue'),
          header: () => import('pages/shelves/BookSelectorHeader.vue'),
          page: () => import('pages/shelves/BookSelectorPage.vue'),
      }}
    ],
  },

  {
    path: '/labels',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/LabelCollectionPage.vue') }],
  },

  {
    path: '/labels/:labelid',
    component: () => import('layouts/DetailLayout.vue'),
    children: [{ path: '', component: () => import('pages/LabelItemPage.vue') }],
  },

  {
    path: '/labels/new',
    component: () => import('layouts/DetailLayout.vue'),
    children: [{ path: '', component: () => import('pages/LabelItemPage.vue') }],
  },

  {
    path: '/connects',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/ConnectsPage.vue') }],
  },

  {
    path: '/settings',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/SettingsPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
