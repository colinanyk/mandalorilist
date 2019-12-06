import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListSingleComponent } from './movie-list-single.component';

describe('MovieListSingleComponent', () => {
  let component: MovieListSingleComponent;
  let fixture: ComponentFixture<MovieListSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieListSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
