import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {UsersService} from '../../shared/services/user.service';
import {Observable} from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let usersService: UsersService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        SharedModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    usersService = TestBed.get(UsersService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('error text should be undefined', () => {
    expect(component.errorText).toBe(undefined);
  });

  it('should has two controls', () => {
    expect(component.form.controls['email']).toBeTruthy();
    expect(component.form.controls['password']).toBeTruthy();
  });

  it('should has auth button', () => {
    const htmlElem =
      fixture.debugElement.query(By.css('.auth-button'))
        .nativeElement;
    expect(htmlElem).toBeTruthy();
  });

  it('should has two inputs', () => {
    const htmlElem = fixture.debugElement.queryAll(By.css('input'));
    expect(htmlElem.length).toEqual(2);
  });

  it('method comeIn should call method getUserByEmail', () => {
    spyOn(usersService, 'getUserByEmail').and.returnValue({ subscribe: () => {} });
    component.comeIn();
    expect(usersService.getUserByEmail).toHaveBeenCalled();
  });

});
