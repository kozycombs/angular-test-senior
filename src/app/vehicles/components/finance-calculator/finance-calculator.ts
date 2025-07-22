import {
  Component,
  EventEmitter,
  Input,
  input,
  InputSignal,
  OnInit,
  Output,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FincanceCalculatorInput } from '../../types/fincanceCalculatorInput';

@Component({
  selector: 'app-finance-calculator',
  imports: [ReactiveFormsModule],
  templateUrl: './finance-calculator.html',
  styleUrl: './finance-calculator.scss',
})
export class FinanceCalculator implements OnInit {
  @Input() financeCalculatorInput: FincanceCalculatorInput | undefined;
  @Output() onCalculate: EventEmitter<FincanceCalculatorInput> =
    new EventEmitter();

  financeCalculatorControl: FormGroup = new FormGroup({
    deposit: new FormControl(),
    term: new FormControl(),
  });

  financeTermsOptionsList = Array(49)
    .fill('-')
    .map((_, i) => i + 12);

  ngOnInit(): void {
    if (this.financeCalculatorInput) {
      this.financeCalculatorControl
        .get('deposit')
        ?.setValue(this.financeCalculatorInput.deposit);
      this.financeCalculatorControl
        .get('term')
        ?.setValue(this.financeCalculatorInput.term);
    }
  }

  handleCalculate(event: any): void {
    event.preventDefault();
    this.onCalculate.emit(this.financeCalculatorControl.value);
  }
}
