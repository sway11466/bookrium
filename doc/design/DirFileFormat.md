# Directory and File Structure

## Excecutable Dir/File Structure
```
./
 +-- books/
 |   +-- [connector-id].json
 |
 +-- artwork/
 |
 +-- shelf/
 |
 +-- labels/
 |
 +-- cache/
 |
 +-- booklium.json
```

## /bookrium.json
```json
{
    "bookrium": {
        "connector": {
            [connector-id]: {
                [attr-key]: [attr-val]
            }
        },
        "setting": {
            "settingPath": "",
            "storage": {
                "dataFolderPath": "",
                "bookFolderPath": "",
                "cacheFolderPath": "",
                "artworkFolderPath": ""
            }
        }
    }
}
```

## /book/[connector-id].json
```json
{
    "bookrium": {
        "books": [
            [book-object]
          ]
        }
    }
}
```
