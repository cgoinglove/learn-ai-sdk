import inquirer from 'inquirer';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

interface FileItem {
  name: string;
  value: string;
  isDirectory: boolean;
}

function ls(rootPath: string) {
  const items = fs.readdirSync(rootPath);
  const fileItems: FileItem[] = items.map((item) => {
    const itemPath = path.join(rootPath, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();

    return {
      name: `${isDirectory ? '📂/' : '✅'}${item}`,
      value: itemPath,
      isDirectory,
    };
  });
  if (path.resolve(rootPath) !== path.resolve('/')) {
    fileItems.unshift({
      name: '📂 ..',
      value: path.join(rootPath, '..'),
      isDirectory: true,
    });
  }
  return fileItems;
}

async function exploreDirectory(rootPath: string): Promise<string> {
  let currentPath = rootPath;
  while (true) {
    const { selectedPath } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedPath',
        message: '',
        choices: () => ls(currentPath),
      },
    ]);
    if (fs.statSync(selectedPath).isDirectory()) {
      currentPath = selectedPath;
    } else {
      return selectedPath;
    }
  }
}

console.log('✨ select file:');
exploreDirectory(path.join(process.cwd(), 'src')).then((file) => {
  const result = file.replace(process.cwd(), '').replace('/', '');
  spawn(`pnpm tsx ${result}`, { shell: true, stdio: 'inherit' });
});
