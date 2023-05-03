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
        "setting": {
            "settingPath": "",
            "storage": {
                "dataFolderPath": "",
                "bookFolderPath": "",
                "cacheFolderPath": "",
                "artworkFolderPath": ""
            }
        },
        "connector": {
            [connector-id]: {
                [attr-key]: [attr-val]
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
