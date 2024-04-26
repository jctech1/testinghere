import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCComponent } from './section-c.component';

describe('SectionCComponent', () => {
  let component: SectionCComponent;
  let fixture: ComponentFixture<SectionCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionCComponent]
    });
    fixture = TestBed.createComponent(SectionCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
