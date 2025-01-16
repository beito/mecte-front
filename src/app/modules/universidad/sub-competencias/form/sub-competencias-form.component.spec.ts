import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCompetenciasFormComponent } from './sub-competencias-form.component';

describe('ActividadesFormComponent', () => {
  let component: SubCompetenciasFormComponent;
  let fixture: ComponentFixture<SubCompetenciasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubCompetenciasFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCompetenciasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
