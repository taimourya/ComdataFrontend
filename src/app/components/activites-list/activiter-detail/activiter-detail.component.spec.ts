import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviterDetailComponent } from './activiter-detail.component';

describe('ActiviterDetailComponent', () => {
  let component: ActiviterDetailComponent;
  let fixture: ComponentFixture<ActiviterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiviterDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
