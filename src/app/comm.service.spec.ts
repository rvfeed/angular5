import { TestBed, inject } from '@angular/core/testing';

import { CommService } from './comm.service';

describe('CommService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommService]
    });
  });

  it('should be created', inject([CommService], (service: CommService) => {
    expect(service).toBeTruthy();
  }));
});
