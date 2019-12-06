import { TestBed } from '@angular/core/testing';

import { RequestorMovieService } from './requestor-movie.service';

describe('RequestorMovieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestorMovieService = TestBed.get(RequestorMovieService);
    expect(service).toBeTruthy();
  });
});
