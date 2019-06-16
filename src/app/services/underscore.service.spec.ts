import { TestBed } from '@angular/core/testing';

import { UnderscoreService } from './underscore.service';

describe('UnderscoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnderscoreService = TestBed.get(UnderscoreService);
    expect(service).toBeTruthy();
  });
});
