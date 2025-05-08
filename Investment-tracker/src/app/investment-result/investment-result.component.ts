import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-result',
  templateUrl: './investment-result.component.html',
  styleUrl: './investment-result.component.css',
  standalone:false
})
export class InvestmentResultComponent {
  private investmentServices = inject(InvestmentService)

  get results(){
    return this.investmentServices.resultsData;
  }
}
