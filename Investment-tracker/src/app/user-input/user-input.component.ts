import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { InvestmentInput } from '../investment-input.model';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: false,
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'], 
})
export class UserInputComponent {
  @Output() calculate = new EventEmitter<InvestmentInput>();

  enteredInitialInvestment = '0';
  enteredAnnualInvestment = '0';
  enteredExpectedReturn = '12';
  enteredDuration = '5'; 

  constructor(private investmentService: InvestmentService){}

  onSubmit() {
    console.log("Submitted!");
this.investmentService.calculateInvestmentResults({ initialInvestment: +this.enteredInitialInvestment,
  annualInvestment: +this.enteredAnnualInvestment,
  expectedReturn: +this.enteredExpectedReturn,
  duration: +this.enteredDuration})
  }
}
