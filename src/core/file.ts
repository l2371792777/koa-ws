import * as fs from 'fs';
import * as path from 'path';


class fileManage {
    constructor() {
    }

    /* 遍历指定目录下所有文件
    */
    private static directoryRecursive(directoryPath: string,filePaths: Record<string, any>): void {
        const files = fs.readdirSync(directoryPath);

        files.forEach((file) => {
            const filePath = path.join(directoryPath, file);
            const stats = fs.statSync(filePath);

            if (stats.isFile()) {
                console.log('File:', filePath);
                // 在这里执行文件的操作
                filePaths[file] = filePath;
            } else if (stats.isDirectory()) {
                console.log('Directory:', filePath);
                // 在这里执行目录的操作
                fileManage.directoryRecursive(filePath,filePaths); // 递归调用，读取子目录
            }
        });
    }
    /* 遍历目录
    */
    static readDirectory(directoryPath: string):Record<string, any>{
        let filePaths: Record<string, any> = {};
        fileManage.directoryRecursive(directoryPath,filePaths);
        return filePaths;
    }
}

export default fileManage;