import { Exam } from '../../../models/exam';
import { Component, OnInit } from '@angular/core';
import { ExamCardComponent } from "../../../components/exam-card/exam-card.component";
import { ExamService } from '../../../services/exam.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  imports: [ExamCardComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {

  constructor(private examService: ExamService, private router:Router){}

  examsList:Exam[] = [];

  async ngOnInit() {
      // Call an API and to get all the Exam & Fetch the Data
      await this.getAllExams();
  }

  async getAllExams() : Promise<void> {
    this.examsList = [];
    this.examService.getAllExams().subscribe({
      next: (response) => {

        // console.log(JSON.stringify(response, null, 2));

        response.forEach((exam) => {
          console.log(exam);
          this.examsList.push(Exam.fromJson(exam));
        });

        console.log(this.examsList);
        this.examsList.reverse();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  goToAddExam(){
    this.router.navigate(['/addExam']);
  }
}
