import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineSetupPageComponent } from './machine-setup-page.component';

describe('MachineSetupPageComponent', () => {
  let component: MachineSetupPageComponent;
  let fixture: ComponentFixture<MachineSetupPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MachineSetupPageComponent]
    });
    fixture = TestBed.createComponent(MachineSetupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
