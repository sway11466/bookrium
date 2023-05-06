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
 |   +-- label.json
 |
 +-- cache/
 |
 +-- booklium.json
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

## /labels/label.json
```json
{
    "bookrium": {
        "labels": {
            [label-name]: {
                "count": 0,
            }
        }
    }
}
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
