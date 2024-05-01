# Directory and File Structure

## Excecutable Dir/File Structure
```
./
 +-- artwork/
 |   |
 |   +-- [connector.id]/
 |        |
 |        +-- [book.id].png
 |
 +-- books/
 |   |
 |   +-- [connector.id].books.json
 |
 +-- cache/
 |
 +-- connector/
 |   | 
 |   +-- connecotrs.json
 |
 +-- labels/
 |   |
 |   +-- labels.json
 |   |
 |   +-- [label.id].books.json
 |
 +-- shelves/
 |   |
 |   +-- shelves.json
 |   |
 |   +-- [shelf.id].books.json
 |
 +-- booklium.json
```

## /book/books.json
```json
{
    "bookrium": {
        "books": {
            [book.id]: {
                [key]: [val]
            }
        }
    }
}
```

## /shelves/shelves.json
```json
{
    "bookrium": {
        "shelves": {
            "[label.id]": {
				"id": "uuid4",
				"name": "shelf name",
				"description": "",
                "books": [book.id]
            }
        }
    }
}
```

## /labels/label.json
```json
{
    "bookrium": {
        "labels": {
            "[label.id]": {
				"id": "uuid4",
				"name": "label name",
				"fore_color": "#000000",
				"back_color": "#ffffff",
				"parent_id": "parent label id",
				"count": 0,
				"createdAt": "2000-01-01T01:01:01.001Z"
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
			"showapp": {
				"kindle": "[builtin | os]",
				"pdf": "[builtin | os]"
			},
			"platform": "[win32]",
			"version": "0.0.0"
        },
        "connector": {
            "[connector.id]": {
                "[key]": "[val]"
            }
            "kindle-case": {
                "id": "uuid4",
                "tyee": "kindle",
                "email": "kindle login email address",
                "password": "kindle login password"
            }
            "pdfls-case": {
                "id": "uuid4",
                "tyee": "pdfls",
                "path": "[path to base directory]"
            }
        }
    }
}
```
