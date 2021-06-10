import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrucialErrorDialogComponent } from './crucial-error-dialog.component';

describe('CrucialErrorDialogComponent', () => {
  let component: CrucialErrorDialogComponent;
  let fixture: ComponentFixture<CrucialErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrucialErrorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrucialErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
