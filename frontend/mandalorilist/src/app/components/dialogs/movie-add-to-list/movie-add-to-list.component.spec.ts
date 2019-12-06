import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAddToListComponent } from './movie-add-to-list.component';

describe('MovieAddToListComponent', () => {
  let component: MovieAddToListComponent;
  let fixture: ComponentFixture<MovieAddToListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieAddToListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAddToListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
