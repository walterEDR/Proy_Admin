import { TestBed } from '@angular/core/testing';

import { Prchild1Guard } from './prchild1.guard';

describe('Prchild1Guard', () => {
  let guard: Prchild1Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Prchild1Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
