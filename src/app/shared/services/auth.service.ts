import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from './user.service';

@Injectable()
export class AuthService {

  constructor(private router: Router,
              private usersService: UsersService) {

  }

  isAuthenticated = false;

  login(userId: number) {
    this.isAuthenticated = true;
    localStorage.setItem('user', JSON.stringify(userId));
    this.usersService.id = +localStorage.getItem('user');
    this.router.navigate(['system', 'markets']);
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('user');
    this.router.navigate(['auth', 'login']);
  }

}
