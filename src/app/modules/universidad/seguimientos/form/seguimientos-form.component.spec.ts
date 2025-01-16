import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoFormComponent } from './seguimientos-form.component';

describe('ActividadesFormComponent', () => {
  let component: SeguimientoFormComponent;
  let fixture: ComponentFixture<SeguimientoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeguimientoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguimientoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
