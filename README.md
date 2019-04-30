# file-index [![npm version](https://img.shields.io/npm/v/@ffflorian/file-index.svg?style=flat)](https://www.npmjs.com/package/@ffflorian/file-index) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=ffflorian/file-index)](https://dependabot.com)

Generate a file index.

## Installation

Run `yarn add @ffflorian/file-index` or `npm install @ffflorian/file-index`.

## Usage

**YourFile.ts**

```ts
import {generateIndex} from '@ffflorian/file-index';

generateIndex('./src')
  .then(index => {
    // see result
  })
  .catch(error => console.error(error));
```

**Result**

```json
{
  "directories": {},
  "files": {
    "fileIndex.ts": {
      "fullPath": "/home/user/file-index/src/fileIndex.ts",
      "name": "fileIndex.ts",
      "size": 2635,
      "type": "file"
    },
    "index.ts": {
      "fullPath": "/home/user/file-index/src/index.ts",
      "name": "index.ts",
      "size": 59,
      "type": "file"
    },
    "interfaces.ts": {
      "fullPath": "/home/user/file-index/src/interfaces.ts",
      "name": "interfaces.ts",
      "size": 421,
      "type": "file"
    }
  },
  "fullPath": "/home/user/file-index/src/",
  "links": {},
  "name": "src",
  "type": "directory"
}
```
