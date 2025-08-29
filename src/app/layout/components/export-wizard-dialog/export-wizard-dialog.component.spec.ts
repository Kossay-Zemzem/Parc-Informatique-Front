import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportWizardDialogComponent } from './export-wizard-dialog.component';

describe('ExportWizardDialogComponent', () => {
  let component: ExportWizardDialogComponent;
  let fixture: ComponentFixture<ExportWizardDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExportWizardDialogComponent]
    });
    fixture = TestBed.createComponent(ExportWizardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
