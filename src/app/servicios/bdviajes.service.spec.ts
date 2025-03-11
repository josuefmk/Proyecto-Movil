import { TestBed } from '@angular/core/testing';

import { BdviajesService } from './bdviajes.service';

describe('BdviajesService', () => {
  let service: BdviajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdviajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
