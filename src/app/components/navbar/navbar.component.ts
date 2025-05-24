import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private userService: UserService,private authService: AuthenticationService, private router:Router){}

  currentUser!:User;

  ngOnInit() : void {
    this.authService.getUserData().subscribe({
      next: (response) => {
          this.currentUser = User.fromObject(response);
          this.userService.setUser(this.currentUser);
      },
    });
  }

  logout(){
    this.router.navigate(['/login']);
  }

}
