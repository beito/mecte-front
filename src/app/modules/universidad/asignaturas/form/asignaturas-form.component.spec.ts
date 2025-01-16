import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturaFormComponent } from './asignaturas-form.component';

describe('ActividadesFormComponent', () => {
  let component: AsignaturaFormComponent;
  let fixture: ComponentFixture<AsignaturaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignaturaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignaturaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
