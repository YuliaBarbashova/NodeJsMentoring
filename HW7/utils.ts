import fs from "fs";
import * as path from "path";
import { fileURLToPath } from 'url';

import {
  CartEntity,
  OrderEntity,
  ProductEntity,
  UserEntity,
} from "./types/index.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type FileDataType = CartEntity[] | OrderEntity[] | ProductEntity[] | UserEntity[];

export const writeDataInFile = (fileFolder: string, fileName: string, data: FileDataType) => {
  fs.writeFileSync(path.join(__dirname,fileFolder, fileName), JSON.stringify(data, null, 2), "utf8");
};
