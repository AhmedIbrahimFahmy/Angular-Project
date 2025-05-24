import { Component, Input } from '@angular/core';
import { UserExamResult } from '../../models/userExamResult';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-exam-result-card',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-exam-result-card.component.html',
  styleUrl: './user-exam-result-card.component.css'
})
export class UserExamResultCardComponent {
  @Input() result! : UserExamResult;

}
