import { TestBed } from '@angular/core/testing';

import { ProcesosMejoraService } from './procesos-mejora.service';

describe('ProcesosMejoraService', () => {
  let service: ProcesosMejoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcesosMejoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
