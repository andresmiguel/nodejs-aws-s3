import fs from "fs";
import os from "os";
import path from "path";

import logger from "../loggers/logger";

const tmpDir = os.tmpdir();

export const createFile = (fileName, fileContent) => {

    console.log("----TMP: " + tmpDir);

    const filePath = path.join(tmpDir, fileName);

    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, fileContent, err => {
            if (err) {
                logger.log("error", err);
                reject(err);
            } else {
                logger.log("info", "File %s created successfully", filePath);
                resolve({filePath});
            }
        });
    });    
};