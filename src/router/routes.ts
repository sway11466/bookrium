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
    children: [{ path: '', component: () => import('pages/BooksListPage.vue') }],
  },

  {
    path: '/books/:bookid',
    component: () => import('layouts/DetailLayout.vue'),
    children: [{ path: '', component: () => import('pages/BookDetailPage.vue') }],
  },

  {
    path: '/shelves',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/shelves/ShelfCollectionsPage.vue') }],
  },

  {
    path: '/shelves/:shelfid',
    component: () => import('layouts/DetailLayout.vue'),
    children: [{ path: '', component: () => import('pages/shelves/ShelfViewPage.vue') }],
  },

  {
    path: '/shelves/:shelfid/edit',
    component: () => import('layouts/DetailLayout.vue'),
    children: [{ path: '', component: () => import('pages/shelves/ShelfEditPage.vue') }],
  },

  {
    path: '/shelves/new',
    component: () => import('layouts/DetailLayout.vue'),
    children: [{ path: '', component: () => import('pages/ShelfEditPage.vue') }],
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
