import { TestBed } from '@angular/core/testing';

import { RequestorUserService } from './requestor-user.service';

describe('RequestorUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestorUserService = TestBed.get(RequestorUserService);
    expect(service).toBeTruthy();
  });
});
