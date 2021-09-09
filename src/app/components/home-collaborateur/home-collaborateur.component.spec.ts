import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCollaborateurComponent } from './home-collaborateur.component';

describe('HomeCollaborateurComponent', () => {
  let component: HomeCollaborateurComponent;
  let fixture: ComponentFixture<HomeCollaborateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCollaborateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
