import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAdjusterComponent } from './setting-adjuster.component';

describe('SettingAdjusterComponent', () => {
  let component: SettingAdjusterComponent;
  let fixture: ComponentFixture<SettingAdjusterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingAdjusterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingAdjusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
