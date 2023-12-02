import * as fs from 'fs';
import * as path from 'path';
import Router from 'koa-router';

class init {
  private static app: any;
  constructor() {
  };

  static initroute(app: any): void {
    init.app = app;
    const routerDirectory = `${process.cwd()}/src/routes`;
    init.readDirectoryRecursive(routerDirectory);
  }

  static modulebind(file: string, filePath: string): void {
    const modules: Record<string, any> = {};
    if (file.endsWith('.ts')) {
      const moduleName = path.basename(file, '.ts');
      modules[moduleName] = require(filePath);
      if (modules[moduleName] instanceof Router) {
        init.app.use(modules[moduleName].routes());
      }
    }
  }
  static readDirectoryRecursive(directoryPath: string): void {
    const files = fs.readdirSync(directoryPath);

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isFile()) {
        console.log('File:', filePath);
        // 在这里执行文件的操作
        init.modulebind(file, filePath);
      } else if (stats.isDirectory()) {
        console.log('Directory:', filePath);
        // 在这里执行目录的操作
        init.readDirectoryRecursive(filePath); // 递归调用，读取子目录
      }
    });
  }
}


export = init;

