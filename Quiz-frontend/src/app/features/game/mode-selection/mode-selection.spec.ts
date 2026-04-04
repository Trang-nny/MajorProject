import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeSelection } from './mode-selection';

describe('ModeSelection', () => {
  let component: ModeSelection;
  let fixture: ComponentFixture<ModeSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeSelection],
    }).compileComponents();

    fixture = TestBed.createComponent(ModeSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
