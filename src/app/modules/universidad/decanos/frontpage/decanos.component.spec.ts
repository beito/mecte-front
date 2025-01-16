import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecanosComponent } from './decanos.component';

describe('DecanosComponent', () => {
  let component: DecanosComponent;
  let fixture: ComponentFixture<DecanosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DecanosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
