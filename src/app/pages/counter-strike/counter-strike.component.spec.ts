import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterStrikeComponent } from './counter-strike.component';

describe('CounterStrikeComponent', () => {
  let component: CounterStrikeComponent;
  let fixture: ComponentFixture<CounterStrikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterStrikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterStrikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
