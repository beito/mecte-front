import { TestBed } from '@angular/core/testing';

import { DecanosService } from './decanos.service';

describe('DecanosService', () => {
  let service: DecanosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecanosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
