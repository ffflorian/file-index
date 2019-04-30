# file-index [![npm version](https://img.shields.io/npm/v/@ffflorian/file-index.svg?style=flat)](https://www.npmjs.com/package/@ffflorian/file-index) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=ffflorian/file-index)](https://dependabot.com)

Generate a file index.

## Installation

Run `yarn add @ffflorian/file-index` or `npm install @ffflorian/file-index`.

## Usage

**Definition**

```ts
function generateIndex(directory: string): Promise<DirEntry>;
function generateIndexSync(directory: string): DirEntry;

interface FileEntry {
  fullPath: string;
  name: string;
  size: number;
  type: 'file';
}

interface LinkEntry {
  fullPath: string;
  name: string;
  type: 'link';
}

interface DirEntry extends Entry {
  directories: {[name: string]: DirEntry};
  files: {[name: string]: FileEntry};
  links: {[name: string]: LinkEntry};
  type: 'directory';
}
```

**YourFile.ts**

```ts
import {generateIndex} from '@ffflorian/file-index';

generateIndex('./')
  .then(index => {
    // see result
  })
  .catch(error => console.error(error));
```

**Result**

```json
{
  "directories": {
    ".github": {
      "directories": {},
      "files": {
        "main.workflow": {
          "fullPath": "/home/user/file-index/.github/main.workflow",
          "name": "main.workflow",
          "size": 1369,
          "type": "file"
        }
      },
      "fullPath": "/home/user/file-index/.github/",
      "links": {},
      "name": ".github",
      "type": "directory"
    },
    "dist": {
      "directories": {},
      "files": {
        "fileIndex.d.ts": {
          "fullPath": "/home/user/file-index/dist/fileIndex.d.ts",
          "name": "fileIndex.d.ts",
          "size": 190,
          "type": "file"
        }
        // ...
      },
      "fullPath": "/home/user/file-index/dist/",
      "links": {},
      "name": "dist",
      "type": "directory"
    },
    "src": {
      "directories": {},
      "files": {
        "fileIndex.ts": {
          "fullPath": "/home/user/file-index/src/fileIndex.ts",
          "name": "fileIndex.ts",
          "size": 2635,
          "type": "file"
        }
        // ...
      },
      "fullPath": "/home/user/file-index/src/",
      "links": {},
      "name": "src",
      "type": "directory"
    }
    // ...
  },
  "fullPath": "/home/user/file-index/",
  "links": {},
  "name": "file-index",
  "type": "directory"
}
```
