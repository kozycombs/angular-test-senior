import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceDetail } from './finance-detail';

describe('FinanceDetail', () => {
  let component: FinanceDetail;
  let fixture: ComponentFixture<FinanceDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
