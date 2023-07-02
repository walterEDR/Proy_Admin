import { TestBed } from '@angular/core/testing';

import { Login2Guard } from './login2.guard';

describe('Login2Guard', () => {
  let guard: Login2Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Login2Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
