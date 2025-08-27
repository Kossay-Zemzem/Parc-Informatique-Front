import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveMachineCardComponent } from './archive-machine-card.component';

describe('ArchiveMachineCardComponent', () => {
  let component: ArchiveMachineCardComponent;
  let fixture: ComponentFixture<ArchiveMachineCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchiveMachineCardComponent]
    });
    fixture = TestBed.createComponent(ArchiveMachineCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
