import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoAcademicoFormComponent } from './periodos-academicos-form.component';

describe('ActividadesFormComponent', () => {
  let component: PeriodoAcademicoFormComponent;
  let fixture: ComponentFixture<PeriodoAcademicoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeriodoAcademicoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodoAcademicoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
