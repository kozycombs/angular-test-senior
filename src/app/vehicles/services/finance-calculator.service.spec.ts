import { TestBed } from '@angular/core/testing';

import { FinanceCalculatorService } from './finance-calculator.service';

describe('FinanceCalculatorService', () => {
  let service: FinanceCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanceCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
