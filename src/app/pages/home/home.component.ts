import { Component, OnInit } from '@angular/core';
import { UserHomeComponent } from "./user-home/user-home.component";
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [UserHomeComponent, AdminHomeComponent, NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private userService: UserService,private authService: AuthenticationService){}

  currentUser? : User;

  ngOnInit() : void {
    this.authService.getUserData().subscribe({
      next: (response) => {
          this.currentUser = User.fromObject(response);
          this.userService.setUser(this.currentUser);
      },
    });
  }


  

}
