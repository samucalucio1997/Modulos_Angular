import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { autorizedAuthGuard } from './autorized-auth.guard';

describe('autorizedAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => autorizedAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
