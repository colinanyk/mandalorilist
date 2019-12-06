import { TestBed } from '@angular/core/testing';

import { RequestorMovieListService } from './requestor-movie-list.service';

describe('RequestorMovieListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestorMovieListService = TestBed.get(RequestorMovieListService);
    expect(service).toBeTruthy();
  });
});
