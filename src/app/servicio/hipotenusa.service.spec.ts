import { TestBed } from '@angular/core/testing';

import { HipotenusaService } from './hipotenusa.service';

describe('HipotenusaService', () => {
  let service: HipotenusaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HipotenusaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
