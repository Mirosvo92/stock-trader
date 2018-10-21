import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../../shared/shared.module';
import {By} from '@angular/platform-browser';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports: [
        SharedModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has three controls', () => {
    expect(component.form.controls['email']).toBeTruthy();
    expect(component.form.controls['password']).toBeTruthy();
    expect(component.form.controls['name']).toBeTruthy();
  });

  it('should has button', () => {
    const htmlElem =
      fixture.debugElement.query(By.css('.auth-button'))
        .nativeElement;
    expect(htmlElem).toBeTruthy();
  });

  it('should has three inputs', () => {
    const htmlElem = fixture.debugElement.queryAll(By.css('input'));
    expect(htmlElem.length).toEqual(3);
  });

  it('error text should be undefined', () => {
    expect(component.errorText).toBe(undefined);
  });
});
