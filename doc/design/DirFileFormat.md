# Directory and File Structure

## Excecutable Dir/File Structure
```
./
 +-- artwork/
 |
 +-- books/
 |   +-- books.json
 |
 +-- cache/
 |
 +-- index/
 |
 +-- labels/
 |   +-- label.json
 |
 +-- shelf/
 |
 +-- booklium.json
```

## /book/books.json
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
