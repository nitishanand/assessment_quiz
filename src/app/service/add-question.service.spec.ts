import { TestBed } from '@angular/core/testing';

import { AddQuestionService } from './add-question.service';

describe('AddQuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddQuestionService = TestBed.get(AddQuestionService);
    expect(service).toBeTruthy();
  });
});
