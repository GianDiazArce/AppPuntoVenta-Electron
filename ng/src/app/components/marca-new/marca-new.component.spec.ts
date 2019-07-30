import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaNewComponent } from './marca-new.component';

describe('MarcaNewComponent', () => {
  let component: MarcaNewComponent;
  let fixture: ComponentFixture<MarcaNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcaNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
