import fileManager from './file';
import * as path from 'path';
import Router from 'koa-router';
import * as ErrorInfo from './ErrorInfo';
import * as ResModel from "./ResModel";
class initManager {
  constructor() {
  };

  static initCore(app: any): void {
    initManager.loadRouter(app, path.join(__dirname, `../app/api`));
    this.loadGlobalVariable();
  }

  /**
   * 绑定路由
   * @param app 
   * @param routerDirectory 
   */
  static loadRouter(app: any, routerDirectory: string): void {
    const modules: Record<string, any> = {};
    let filePaths: Record<string, any> = fileManager.readDirectory(routerDirectory);
    
    Object.keys(filePaths).forEach(file => {
      if (file.endsWith('.ts')) {
        const moduleName = path.basename(file, '.ts');
        modules[moduleName] = require(filePaths[file]);

        if (modules[moduleName] instanceof Router) {
          app.use(modules[moduleName].routes());
        }
        else {
          Object.keys(modules[moduleName]).forEach(key => {
            if (modules[moduleName][key] instanceof Router) {
              app.use(modules[moduleName][key].routes());
            }
          });
        }
      }
    });
  }
  static loadGlobalVariable(){
    global.ResModel=ResModel;
    global.ErrorInfo=ErrorInfo;
  }
}


export default initManager;

