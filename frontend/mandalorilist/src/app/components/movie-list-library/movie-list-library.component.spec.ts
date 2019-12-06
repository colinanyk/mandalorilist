import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListLibraryComponent } from './movie-list-library.component';

describe('MovieListLibraryComponent', () => {
  let component: MovieListLibraryComponent;
  let fixture: ComponentFixture<MovieListLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieListLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
