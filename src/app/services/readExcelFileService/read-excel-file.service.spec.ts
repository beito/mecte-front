import { TestBed } from '@angular/core/testing';

import { ReadExcelFileService } from './read-excel-file.service';

describe('ReadExcelFileService', () => {
  let service: ReadExcelFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadExcelFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
