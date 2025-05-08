import { Injectable } from '@angular/core';
import { InvestmentInput } from './investment-input.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  resultsData?:{
    year: number;
    interest: number;
    valueEndOfYear: number;
    annualInvestment: number;
    totalInterest: number;
    totalAmountInvested: number;
  }[];
  calculateInvestmentResults(data: InvestmentInput) {
    const annualData = [];
    const { initialInvestment, annualInvestment, duration, expectedReturn } = data;
  
    let investmentValue = initialInvestment;
  
    for (let i = 0; i < duration; i++) {
      const year = i + 1;
  
      // Calculate interest for the year
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
  
      // Update investment value by adding interest and annual investment
      investmentValue += interestEarnedInYear + annualInvestment;
  
      // Calculate total amount invested till this year
      const totalInvested = initialInvestment + annualInvestment * year;
  
      // Calculate total interest earned till this year
      const totalInterest = investmentValue - totalInvested;
  
      // Push data for current year
      annualData.push({
        year: year,
        interest: parseFloat(interestEarnedInYear.toFixed(2)),
        valueEndOfYear: parseFloat(investmentValue.toFixed(2)),
        annualInvestment: annualInvestment,
        totalInterest: parseFloat(totalInterest.toFixed(2)),
        totalAmountInvested: totalInvested,
      });
    }
  
    this.resultsData = annualData;
  }
  
  
}
