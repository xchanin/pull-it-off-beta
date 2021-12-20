import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TapSideToSeekComponent } from './tap-side-to-seek.component';

describe('TapSideToSeekComponent', () => {
  let component: TapSideToSeekComponent;
  let fixture: ComponentFixture<TapSideToSeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TapSideToSeekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TapSideToSeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
