export type BookriumSetting = {
  storageSetting: StorageSetting,
}

// --------------------------------
//  [description]
//   - dataFolderPath       : 
//     - cacheFolderPath    : to store cache files
//     - artworkFolderPath  : to store book
//   - settingPath          :
//   - connectorSettingPath :
//
//  [windows example]
//   - dataFolderPath       : C:\Users\username\AppData\Roaming\Bookrium
//     - cacheFolderPath    : C:\Users\username\AppData\Roaming\Bookrium\cache
//     - artworkFolderPath  : C:\Users\username\AppData\Roaming\Bookrium\artwork
//   - settingPath          : C:\Users\username\AppData\Roaming\Bookrium\bookrium-setting.json
//   - connectorSettingPath : C:\Users\username\AppData\Roaming\Bookrium\bookrium-connector-stting.json
//
export type StorageSetting = {
  dataFolderPath: string,
  cacheFolderPath: string,
  artworkFolderPath: string,
  settingPath: string,
  connectorSettingPath: string,
};
