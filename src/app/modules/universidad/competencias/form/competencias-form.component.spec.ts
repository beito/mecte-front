import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenciasFormComponent } from './competencias-form.component';

describe('ActividadesFormComponent', () => {
  let component: CompetenciasFormComponent;
  let fixture: ComponentFixture<CompetenciasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompetenciasFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetenciasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
