import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaconomyDialogComponent } from './add-maconomy-dialog.component';

describe('AddMaconomyDialogComponent', () => {
  let component: AddMaconomyDialogComponent;
  let fixture: ComponentFixture<AddMaconomyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMaconomyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMaconomyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
