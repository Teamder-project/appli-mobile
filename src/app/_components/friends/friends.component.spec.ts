import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:src/app/pages/swipe/swipe.component.spec.ts
import { SwipeComponent } from './swipe.component';

describe('SwipeComponent', () => {
  let component: SwipeComponent;
  let fixture: ComponentFixture<SwipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwipeComponent ]
=======
import { FriendsComponent } from './friends.component';

describe('FriendsComponent', () => {
  let component: FriendsComponent;
  let fixture: ComponentFixture<FriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsComponent ]
>>>>>>> 0d5a1dec770681366d057f639e17100aec621552:src/app/_components/friends/friends.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:src/app/pages/swipe/swipe.component.spec.ts
    fixture = TestBed.createComponent(SwipeComponent);
=======
    fixture = TestBed.createComponent(FriendsComponent);
>>>>>>> 0d5a1dec770681366d057f639e17100aec621552:src/app/_components/friends/friends.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
