import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesPauseListComponent } from './types-pause-list.component';

describe('TypesPauseListComponent', () => {
  let component: TypesPauseListComponent;
  let fixture: ComponentFixture<TypesPauseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesPauseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesPauseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
