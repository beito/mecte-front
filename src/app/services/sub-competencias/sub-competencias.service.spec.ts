import { TestBed } from '@angular/core/testing';

import { SubCompetenciasService } from './sub-competencias.service';

describe('SubCompetenciasService', () => {
  let service: SubCompetenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubCompetenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
