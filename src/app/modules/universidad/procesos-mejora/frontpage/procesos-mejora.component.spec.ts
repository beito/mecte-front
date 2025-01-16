import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesosMejoraComponent } from './procesos-mejora.component';

describe('ProcesosMejoraComponent', () => {
  let component: ProcesosMejoraComponent;
  let fixture: ComponentFixture<ProcesosMejoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcesosMejoraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesosMejoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
