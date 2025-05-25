import { Router, RouterLink } from '@angular/router';
import { UserExamResult } from '../../../models/userExamResult';
import { UserAccountService } from './../../../services/user-account.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Exam } from '../../../models/exam';

@Component({
  selector: 'app-user-home',
  imports: [DatePipe],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit{
  
  constructor(private userAccountService:UserAccountService, private router:Router){}

  takenExamsResult:UserExamResult[] = [];
  availableExams: Exam[] = [];

  ngOnInit(): void {
      this.userAccountService.getAllExamResults().subscribe({
        next: (response) => {
          console.log(response);
          this.takenExamsResult = response.map((result) => UserExamResult.fromJson(result));
          console.log(this.takenExamsResult);
        },
        error: (error) => {
          console.log(`Error: ${error}`);
        }
      });


      this.userAccountService.getAllAvailableExams().subscribe({
        next: (response) => {
          this.availableExams = response;
          console.log(this.availableExams);
        },
        error: (error) => {
          console.log(`Error: ${error}`);
        }
      });
  }



  
}
