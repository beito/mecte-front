import { TestBed } from '@angular/core/testing';

import { PeriodosAcademicosService } from './periodos-academicos.service';

describe('PeriodosAcademicosService', () => {
  let service: PeriodosAcademicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodosAcademicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
