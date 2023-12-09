import fileManager from './file';
import * as path from 'path';
import Router from 'koa-router';
import * as ResModel from './model/ResModel';
import * as ErrorInfo from './model/ErrorInfo';

class initManager {
  private static app: any;
  constructor() {
  };

  static initCore(app: any): void {
    initManager.initLoadRouters(app, path.join(__dirname, `../app/api`));
    initManager.loadModel();
  }

  /**
  * @parameter routerDirectory string 文件路径 
  */
  static initLoadRouters(app: any, routerDirectory: string): void {
    initManager.app = app;
    let filePaths: Record<string, any> = fileManager.readDirectory(routerDirectory);
    initManager.loadRouter(filePaths);
  }
  /** 绑定路由模块
   *  
   */
  static loadRouter(filePaths: Record<string, any>): void {
    const modules: Record<string, any> = {};
    //遍历文件
    Object.keys(filePaths).forEach(file => {
      if (file.endsWith('.ts')) {
        const moduleName = path.basename(file, '.ts');
        modules[moduleName] = require(filePaths[file]);

        if (modules[moduleName] instanceof Router) {
          initManager.app.use(modules[moduleName].routes());
        }
        else {
          Object.keys(modules[moduleName]).forEach(key => {
            if (modules[moduleName][key] instanceof Router) {
              initManager.app.use(modules[moduleName][key].routes());
            }
          });
        }
      }
    });
  }
  /** 加载错误信息，数据模型为全局变量
   * 
   */
  static loadModel() {
    global.ResModel = ResModel;
    global.ErrorInfo = ErrorInfo;
  }
}


export = initManager;

