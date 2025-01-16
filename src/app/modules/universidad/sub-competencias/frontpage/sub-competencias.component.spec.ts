import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCompetenciasComponent } from './sub-competencias.component';

describe('SubCompetenciasComponent', () => {
  let component: SubCompetenciasComponent;
  let fixture: ComponentFixture<SubCompetenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubCompetenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCompetenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
