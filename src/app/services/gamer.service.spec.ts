import { TestBed } from '@angular/core/testing';

import { GamerService } from './gamer.service';

<<<<<<< HEAD:src/app/services/gamer.service.spec.ts
describe('AccountService', () => {
=======
describe('GamerService', () => {
>>>>>>> 37a33077118bfc6e85405b99f81437fca86531c0:src/app/services/account.service.spec.ts
  let service: GamerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
