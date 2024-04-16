import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    alias: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      components: {
        header: () => import('headers/DefaultHeader.vue'),
        page:  () => import('pages/HomePage.vue'),
    }}],
  },

  {
    path: '/books',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      components: {
        header: () => import('headers/books/BookCollectionHeader.vue'),
        page: () => import('pages/books/BookCollectionPage.vue'),
    }}]
  },

  {
    path: '/books/:bookid',
    component: () => import('layouts/DetailLayout.vue'),
    children: [{
      path: '', 
      components: {
        header: () => import('headers/books/BookDetailHeader.vue'),
        page: () => import('pages/books/BookDetailPage.vue'),
    }}],
  },

  {
    path: '/shelves',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      components: {
        header: () => import('headers/DefaultHeader.vue'),
        page: () => import('pages/shelves/ShelfCollectionsPage.vue'),
    }}],
  },

  {
    path: '/shelves/new',
    component: () => import('layouts/DetailLayout.vue'),
    children: [{
      path: '',
      components: {
        header: () => import('headers/shelves/ShelfEditHeader.vue'),
        page: () => import('pages/shelves/ShelfEditPage.vue'),
    }}],
  },

  {
    path: '/shelves/:shelfid',
    component: () => import('layouts/DetailLayout.vue'),
    children: [{
        path: '',
        components: {
          header: () => import('headers/shelves/ShelfViewHeader.vue'),
          page: () => import('pages/shelves/ShelfViewPage.vue'),
      }},{
        path: 'edit',
        components: {
          header: () => import('headers/shelves/ShelfEditHeader.vue'),
          page: () => import('pages/shelves/ShelfEditPage.vue')
      }},{
        path: 'addBook',
        components: {
          header: () => import('headers/shelves/BookSelectorHeader.vue'),
          page: () => import('pages/shelves/BookSelectorPage.vue'),
      }},{
        path: 'sortBook',
        components: {
          header: () => import('headers/shelves/BookReorderHeader.vue'),
          page: () => import('pages/shelves/BookReorderPage.vue'),
      }},{
        path: 'delBook',
        components: {
          header: () => import('headers/shelves/BookSelectorHeader.vue'),
          page: () => import('pages/shelves/BookSelectorPage.vue'),
      }}],
  },

  {
    path: '/labels',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      components: {
        header: () => import('headers/DefaultHeader.vue'),
        page: () => import('pages/labels/LabelCollectionPage.vue'),
    }}],
  },

  {
    path: '/labels/new',
    component: () => import('layouts/DetailLayout.vue'),
    children: [{
      path: '',
      components: {
        header: () => import('headers/labels/LabelItemHeader.vue'),
        page: () => import('pages/labels/LabelItemPage.vue'),
    }}],
  },

  {
    path: '/labels/:labelid',
    component: () => import('layouts/DetailLayout.vue'),
    children: [{
      path: '',
      components: {
        header: () => import('headers/labels/LabelItemHeader.vue'),
        page: () => import('pages/labels/LabelItemPage.vue'),
    }}],
  },

  {
    path: '/connects',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      components: {
        header: () => import('headers/DefaultHeader.vue'),
        page: () => import('pages/connects/ConnectCollectionsPage.vue'),
    }}],
  },

  {
    path: '/connects/new',
    component: () => import('layouts/DetailLayout.vue'),
    children: [{
      path: '',
      components: {
        header: () => import('headers/connects/ConnectEditHeader.vue'),
        page: () => import('pages/connects/ConnectEditPage.vue') 
      }},{
        path: 'kindle',
        alias: ['pdfls'],
        components: {
          header: () => import('headers/connects/ConnectEditHeader.vue'),
          page: () => import('pages/connects/ConnectEditPage.vue') 
      }}],
  },

  {
    path: '/connects/:connectid',
    component: () => import('layouts/DetailLayout.vue'),
    children: [{
      path: '',
      components: {
        header: () => import('headers/connects/ConnectEditHeader.vue'),
        page: () => import('pages/connects/ConnectEditPage.vue') 
    }}]
  },

  {
    path: '/settings',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      components: {
        header: () => import('headers/DefaultHeader.vue'),
        page: () => import('pages/SettingsPage.vue')
    }}],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
