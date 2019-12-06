import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListCreateComponent } from './movie-list-create.component';

describe('MovieListCreateComponent', () => {
  let component: MovieListCreateComponent;
  let fixture: ComponentFixture<MovieListCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieListCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
