import { Router, RouterLink } from '@angular/router';
import { UserExamResult } from '../../../models/userExamResult';
import { UserAccountService } from './../../../services/user-account.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-home',
  imports: [DatePipe],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit{
  
  constructor(private userAccountService:UserAccountService, private router:Router){}

  takenExamsResult:UserExamResult[] = [];

  ngOnInit(): void {
      this.userAccountService.getAllExamResults().subscribe({
        next: (response) => {
          console.log(response);
          this.takenExamsResult = response.map((result) => UserExamResult.fromJson(result));
          console.log(this.takenExamsResult);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  
}
