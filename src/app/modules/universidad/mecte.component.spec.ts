import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecteComponent } from './mecte.component';

describe('MecteComponent', () => {
  let component: MecteComponent;
  let fixture: ComponentFixture<MecteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MecteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
