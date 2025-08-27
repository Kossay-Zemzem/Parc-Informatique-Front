import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveMachinePageComponent } from './archive-machine-page.component';

describe('ArchiveMachinePageComponent', () => {
  let component: ArchiveMachinePageComponent;
  let fixture: ComponentFixture<ArchiveMachinePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchiveMachinePageComponent]
    });
    fixture = TestBed.createComponent(ArchiveMachinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
