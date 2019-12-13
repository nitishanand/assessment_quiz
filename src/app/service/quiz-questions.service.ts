import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizQuestionsService {
  quizQuestions = [
    {
      "id": 1,
      "title": "What is full form of CSS?",
      "options": [
          'Copying Style Sheets', 'Cascading Style Sheets', 'Containing Style Sheets', 'None of the above'
        ]
    },
    {
      "id": 2,
      "title": "Is JavaScript a programming language?",
      "options": [
        'Yes', 'No'
      ]
    },
    {
      "id": 3,
      "title": "Which doc-type is valid in HTML5?",
      "options": [
        '<html>', '<!doctype html>', '<!html doctype="strict">', 'None of the above'
      ]
    }
  ];

  constructor(private http: HttpClient) { }

  getQuestions() {
    // return this.quizQuestions;
    return of(this.quizQuestions);
  }
}
