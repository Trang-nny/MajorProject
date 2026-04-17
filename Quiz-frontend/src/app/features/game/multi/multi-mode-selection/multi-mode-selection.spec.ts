import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiModeSelection } from './multi-mode-selection';

describe('MultiModeSelection', () => {
  let component: MultiModeSelection;
  let fixture: ComponentFixture<MultiModeSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiModeSelection],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiModeSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
