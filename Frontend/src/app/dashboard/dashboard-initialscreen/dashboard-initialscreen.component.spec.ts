import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInitialscreenComponent } from './dashboard-initialscreen.component';

describe('DashboardInitialscreenComponent', () => {
  let component: DashboardInitialscreenComponent;
  let fixture: ComponentFixture<DashboardInitialscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardInitialscreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInitialscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
