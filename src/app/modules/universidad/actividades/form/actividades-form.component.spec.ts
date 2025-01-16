import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadFormComponent } from './actividades-form.component';

describe('ActividadesFormComponent', () => {
  let component: ActividadFormComponent;
  let fixture: ComponentFixture<ActividadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActividadFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
