import { TestBed } from '@angular/core/testing';

import { AddRoleService } from './add-role.service';

describe('AddRoleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddRoleService = TestBed.get(AddRoleService);
    expect(service).toBeTruthy();
  });
});
