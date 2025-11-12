import { TestBed } from '@angular/core/testing';

import { CidadesPE } from './cidades-pe';

describe('CidadesPE', () => {
  let service: CidadesPE;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CidadesPE);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
