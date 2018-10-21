import { Component, OnInit } from '@angular/core';
import {User} from '../shared/models/user.models';
import {UsersService} from '../shared/services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  userData: User;

  constructor(private usersService: UsersService,
              private authService: AuthService,
              private route: Router) { }

  ngOnInit() {
    const id = this.usersService.id;
    this.usersService.getInfoAboutUser(id).subscribe( user => {
      if (user && user.length) {
        this.userData = user[0];
        this.usersService.updateBalance.next({'balance': this.userData['balance']});
      }
    });

    this.usersService.updateBalance.subscribe( value => {
      let totalBalance: number;
      if (value['price']) {
        if (value['operation']) {
          totalBalance = this.userData['balance'] + value['price'];
        } else {
          totalBalance = this.userData['balance'] - value['price'];
        }
        this.userData['balance'] = +totalBalance.toFixed(2);
        // update balance
        const data = {'balance': this.userData['balance']};
        this.usersService.upgradeBalance(this.usersService.id, data)
          .subscribe( () => {});
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

}
