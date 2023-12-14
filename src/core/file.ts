import * as fs from 'fs';
import * as path from 'path';


class fileManage {
    constructor() {
    }

    /**
     * 递归遍历目录
     * @param directoryPath 
     * @param filePaths 
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
    /**
     * 
     * @param directoryPath 遍历目录
     * @returns 
     */
    static readDirectory(directoryPath: string):Record<string, any>{
        let filePaths: Record<string, any> = {};
        fileManage.directoryRecursive(directoryPath,filePaths);
        return filePaths;
    }
}

export default fileManage;