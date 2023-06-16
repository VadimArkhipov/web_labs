import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsNewsComponent } from './friends-news.component';

describe('FriendsNewsComponent', () => {
  let component: FriendsNewsComponent;
  let fixture: ComponentFixture<FriendsNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
