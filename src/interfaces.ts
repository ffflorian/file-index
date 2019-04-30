export interface Entry {
  fullPath: string;
  name: string;
  type: 'directory' | 'file';
}

export interface FileEntry extends Entry {
  type: 'file';
}

export interface DirEntry extends Entry {
  directories: Record<string, DirEntry>;
  files: Record<string, FileEntry>;
  type: 'directory';
}
