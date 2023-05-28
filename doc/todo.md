- temp

- todo:now
  - KindleSetting.vueの実装をPDFLocalStorageSEtting.vueに合わせる
  - 本一覧の無限スクロール
  - bookはベンダー情報とユーザー入力情報を分けるべきだな
  - booksフォルダの構造変更
    - books/kindle/何か/

- todo:parkinglot
  - 本の収集は非同期にする
  - localstrage-picturesに対応
  - shelfの実装
  - book一覧にフィルターつける
  - export/import
  - treeにフィルター付ける
    - quasarのdocにサンプルがある
  - 根本的なデータアーキの変更
    - 画面の変更はstoreデータではなくコピーを変更する

- todo:probless
  - localstrage-pdfの表紙を取得して出す

- design memo
  - store api
    - init
    - load   -> all saved items load to store.
    - save   -> all store items save to file.
    - new    -> create new item. but not store.
    - clone  -> create new item from already item. not store.
    - add    -> add store and save file.
    - has    -> check to see if it exists.
    - get    -> get item from store.
    - update -> update store and save file.
    - del    -> delete from store and file.
    - deproy -> .

- coding style
  - Component is Pascal Case
