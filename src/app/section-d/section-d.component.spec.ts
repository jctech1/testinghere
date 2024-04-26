import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDComponent } from './section-d.component';

describe('SectionDComponent', () => {
  let component: SectionDComponent;
  let fixture: ComponentFixture<SectionDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionDComponent]
    });
    fixture = TestBed.createComponent(SectionDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
