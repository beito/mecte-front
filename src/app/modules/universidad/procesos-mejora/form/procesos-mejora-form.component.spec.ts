import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoMejoraFormComponent } from './procesos-mejora-form.component';

describe('ActividadesFormComponent', () => {
  let component: ProcesoMejoraFormComponent;
  let fixture: ComponentFixture<ProcesoMejoraFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcesoMejoraFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesoMejoraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
