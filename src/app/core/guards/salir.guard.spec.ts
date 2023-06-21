import { TestBed } from '@angular/core/testing';

import { SalirGuard } from './salir.guard';

describe('SalirGuard', () => {
  let guard: SalirGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SalirGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
