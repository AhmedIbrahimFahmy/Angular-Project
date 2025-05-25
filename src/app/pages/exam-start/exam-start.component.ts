import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccountService } from '../../services/user-account.service';
import { ExamService } from '../../services/exam.service';
import { Exam } from '../../models/exam';
import { Question } from '../../models/question';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-exam-start',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './exam-start.component.html',
  styleUrl: './exam-start.component.css'
})
export class ExamStartComponent implements OnInit{
  constructor(private route:ActivatedRoute,
    private router:Router,
    private userAccountService:UserAccountService, 
    private examService:ExamService,
    private fb: FormBuilder,
  ){}

  examId:number = 0;

  exam!:Exam;
  examQuestions:Question[] = [];

  examForm!: FormGroup;
  errorMessage: string = "";

  ngOnInit(): void {
    this.examId = Number(this.route.snapshot.paramMap.get("examId"));


    // Taking part in the Exam
    this.userAccountService.takePartInExam(this.examId).subscribe({
      next: (response) => {
        console.log(response);  
        alert(response['message']);

        // Getting Exam Data
        this.examService.getExamById(this.examId).subscribe({
          next: (response) => {
            console.log("Got Exam Data");
            this.exam = Exam.fromJson(response);



          // Getting Exam Questions
            this.examService.getExamQuestions(this.examId).subscribe({
            next: (response) => {
              console.log("Got Exam Exam's Questions");
              this.examQuestions = response.map((q) => Question.fromJson(q));


              // Generating form controllers for the questions
              this.examForm = this.fb.group({
                answers: this.fb.array([])
              });

              this.examQuestions.forEach(question => {
                (this.examForm.get('answers') as FormArray).push(
                  this.fb.group({
                    questionId: [question.id],
                    selectedChoiceId: [null, Validators.required]
                  })
                );
              });
            },
            error: (error) => {
              console.log(`Error: ${error}`);
            }
            });
            
          },
          error: (error) => {
            console.log(`Error: ${error}`);
          }
        });
      },
      error: (error) => {
        console.log(error);
        alert(error['error']);
        this.router.navigate(['/home']);
      }
    });

  }


  submitExam() {
    if (this.examForm.valid) {
      const userAnswers = this.examForm.value.answers;
      console.log('Submitted Answers:', userAnswers);

      // Submit logic goes here...
      this.userAccountService.submitExamAnswers(this.examId, userAnswers).subscribe({
        next: (response) => {
          console.log(response);
          alert(response['message']);

          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    else{
      this.errorMessage = "make sure you answer all the questions";
    }
  }
}
