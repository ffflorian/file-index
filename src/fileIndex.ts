import * as fs from 'fs';
import * as path from 'path';
import {promisify} from 'util';

const readdirAsync = promisify(fs.readdir);
const lstatAsync = promisify(fs.lstat);

import {DirEntry} from './interfaces';

function getBaseIndex(directory: string): DirEntry {
  const resolvedDir = path.resolve(directory);

  return {
    directories: {},
    files: {},
    fullPath: `${resolvedDir}${path.sep}`,
    name: path.basename(resolvedDir),
    type: 'directory',
  };
}

export async function generateIndex(directory: string): Promise<DirEntry> {
  const resolvedDir = path.resolve(directory);
  const fileIndex = getBaseIndex(directory);

  try {
    const dirObjects = await readdirAsync(resolvedDir);

    const generateIndices = dirObjects.sort().map(async fileName => {
      const resolvedFile = path.join(resolvedDir, fileName);
      const lstat = await lstatAsync(resolvedFile);

      if (lstat.isFile()) {
        fileIndex.files[fileName] = {
          fullPath: resolvedFile,
          name: path.basename(resolvedFile),
          type: 'file',
        };
      } else {
        const deepIndex = await generateIndex(resolvedFile);
        fileIndex.directories[fileName] = deepIndex;
      }
    });

    await Promise.all(generateIndices);
  } catch (error) {
    console.error(error);
  }

  return fileIndex;
}

export function generateFileTreeSync(directory: string): DirEntry {
  const resolvedDir = path.resolve(directory);
  const fileIndex = getBaseIndex(directory);

  try {
    const dirObjects = fs.readdirSync(resolvedDir);

    dirObjects.sort().map(fileName => {
      const resolvedFile = path.join(resolvedDir, fileName);
      const lstat = fs.lstatSync(resolvedFile);

      if (lstat.isFile()) {
        fileIndex.files[fileName] = {
          fullPath: resolvedFile,
          name: path.basename(resolvedFile),
          type: 'file',
        };
      } else {
        const deepIndex = generateFileTreeSync(resolvedFile);
        fileIndex.directories[fileName] = deepIndex;
      }
    });
  } catch (error) {
    console.error(error);
  }

  return fileIndex;
}
