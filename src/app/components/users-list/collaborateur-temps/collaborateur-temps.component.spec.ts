import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborateurTempsComponent } from './collaborateur-temps.component';

describe('CollaborateurTempsComponent', () => {
  let component: CollaborateurTempsComponent;
  let fixture: ComponentFixture<CollaborateurTempsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaborateurTempsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborateurTempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
