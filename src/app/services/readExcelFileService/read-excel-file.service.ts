import { Injectable } from '@angular/core';
import readXlsxFile from 'read-excel-file';

@Injectable({
  providedIn: 'root'
})
export class ReadExcelFileService {

  constructor() { }

  getFile(files: any): any {
    return readXlsxFile(files);
  }
}
