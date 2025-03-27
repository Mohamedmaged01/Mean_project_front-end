import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoForAdminComponent } from './user-info-for-admin.component';

describe('UserInfoForAdminComponent', () => {
  let component: UserInfoForAdminComponent;
  let fixture: ComponentFixture<UserInfoForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfoForAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfoForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
