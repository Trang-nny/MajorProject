import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLayout } from './game-layout';

describe('GameLayout', () => {
  let component: GameLayout;
  let fixture: ComponentFixture<GameLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(GameLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
