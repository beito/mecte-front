import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecanoFormComponent } from './decanos-form.component';

describe('ActividadesFormComponent', () => {
  let component: DecanoFormComponent;
  let fixture: ComponentFixture<DecanoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecanoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecanoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
