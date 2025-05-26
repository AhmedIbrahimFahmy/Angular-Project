import { UserAccountService } from './../../services/user-account.service';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Exam } from '../../models/exam';
import { AvailableExamCardComponent } from "../../components/available-exam-card/available-exam-card.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-available-exams',
  imports: [NavbarComponent, AvailableExamCardComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './available-exams.component.html',
  styleUrl: './available-exams.component.css'
})
export class AvailableExamsComponent implements OnInit {

  constructor(private userAccountService:UserAccountService){}

  availableExams: Exam[] = [];

  ngOnInit(): void {
      this.userAccountService.getAllAvailableExams().subscribe({
        next: (response) => {
          this.availableExams = response;
          console.log(this.availableExams);
          this.availableExams.reverse();
        },
        error: (error) => {
          console.log(`Error: ${error}`);
        }
      });
  }

}
