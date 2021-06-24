import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexLegendsComponent } from './apex-legends.component';

describe('ApexLegendsComponent', () => {
  let component: ApexLegendsComponent;
  let fixture: ComponentFixture<ApexLegendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApexLegendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApexLegendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
