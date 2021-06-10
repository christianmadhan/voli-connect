import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupComponentDialogComponent } from './setup-component-dialog.component';

describe('SetupComponentDialogComponent', () => {
  let component: SetupComponentDialogComponent;
  let fixture: ComponentFixture<SetupComponentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupComponentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupComponentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
