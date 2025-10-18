import { TestBed } from '@angular/core/testing';

import { Curso } from './course.service';

describe('Curso', () => {
  let service: Curso;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Curso);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
