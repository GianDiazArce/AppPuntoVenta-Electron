import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TallaNewComponent } from './talla-new.component';

describe('TallaNewComponent', () => {
  let component: TallaNewComponent;
  let fixture: ComponentFixture<TallaNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TallaNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TallaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
