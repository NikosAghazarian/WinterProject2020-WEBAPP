import { TestBed } from '@angular/core/testing';

import { DbApiBinderService } from './db-api-binder.service';

describe('DbApiBinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbApiBinderService = TestBed.get(DbApiBinderService);
    expect(service).toBeTruthy();
  });
});
