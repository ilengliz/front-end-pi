import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionnisteComponent } from './nutritionniste.component';

describe('NutritionnisteComponent', () => {
  let component: NutritionnisteComponent;
  let fixture: ComponentFixture<NutritionnisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutritionnisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionnisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
