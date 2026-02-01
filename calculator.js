// === Salary Calculator Logic ===
const calculateSalaryButton = document.getElementById('calculate-salary-button');

if (calculateSalaryButton) {
    const annualSalaryInput = document.getElementById('annual-salary');
    const nonTaxableAllowanceInput = document.getElementById('non-taxable-allowance');
    const dependentsInput = document.getElementById('dependents');
    const childrenInput = document.getElementById('children');

    const monthlyTakeHomeOutput = document.getElementById('monthly-take-home');
    const annualTakeHomeOutput = document.getElementById('annual-take-home');
    const totalDeductionsOutput = document.getElementById('total-deductions');
    const nationalPensionOutput = document.getElementById('result-national-pension');
    const healthInsuranceOutput = document.getElementById('result-health-insurance');
    const longTermCareOutput = document.getElementById('result-long-term-care');
    const employmentInsuranceOutput = document.getElementById('result-employment-insurance');
    const incomeTaxOutput = document.getElementById('result-income-tax');
    const localIncomeTaxOutput = document.getElementById('result-local-income-tax');

    calculateSalaryButton.addEventListener('click', () => {
        const annualSalary = parseFloat(annualSalaryInput.value) * 10000;
        const nonTaxableAllowance = parseFloat(nonTaxableAllowanceInput.value);
        const dependents = parseInt(dependentsInput.value);
        const children = parseInt(childrenInput.value);

        const applyNationalPension = document.querySelector('input[name="national-pension"]:checked').value === 'apply';

        if (isNaN(annualSalary)) {
            alert('Please enter a valid annual salary.');
            return;
        }

        // --- Calculations (based on 2024 rates) ---

        // 1. Calculate monthly salary and income subject to insurance calculations
        const monthlySalary = annualSalary / 12;
        const monthlyTaxableIncomeForInsurance = Math.max(0, monthlySalary - nonTaxableAllowance);

        // 2. 4 Major Insurances
        // National Pension (국민연금): 4.5% for employee, with income caps
        const nationalPensionMin = 370000;
        const nationalPensionMax = 5900000;
        const nationalPensionBase = Math.max(nationalPensionMin, Math.min(monthlyTaxableIncomeForInsurance, nationalPensionMax));
        const nationalPension = applyNationalPension ? Math.floor(nationalPensionBase * 0.045 / 10) * 10 : 0;

        // Employment Insurance (고용보험): 0.9% for employee
        const employmentInsurance = Math.floor(monthlyTaxableIncomeForInsurance * 0.009 / 10) * 10;
        
        // Health Insurance (건강보험): 3.545% for employee
        const healthInsurance = Math.floor(monthlyTaxableIncomeForInsurance * 0.03545 / 10) * 10;
        
        // Long-term Care Insurance (장기요양보험): 12.95% of Health Insurance
        const longTermCare = Math.floor(healthInsurance * 0.1295 / 10) * 10;

        const totalInsuranceDeductions = nationalPension + employmentInsurance + healthInsurance + longTermCare;

        // 3. Income Tax (근로소득세)
        const annualTaxableSalary = annualSalary - (nonTaxableAllowance * 12);

        // Deductions
        const basicDeduction = dependents * 1500000;
        const selfDeduction = 1500000; // Simplified - adding basic deduction for self
        
        // Simplified earned income deduction (근로소득공제)
        let earnedIncomeDeduction = 0;
        if (annualTaxableSalary <= 5000000) {
            earnedIncomeDeduction = annualTaxableSalary * 0.7;
        } else if (annualTaxableSalary <= 15000000) {
            earnedIncomeDeduction = 3500000 + (annualTaxableSalary - 5000000) * 0.4;
        } else if (annualTaxableSalary <= 45000000) {
            earnedIncomeDeduction = 7500000 + (annualTaxableSalary - 15000000) * 0.15;
        } else if (annualTaxableSalary <= 100000000) {
            earnedIncomeDeduction = 12000000 + (annualTaxableSalary - 45000000) * 0.05;
        } else {
            earnedIncomeDeduction = 14750000 + (annualTaxableSalary - 100000000) * 0.02;
        }

        const totalIncomeDeduction = basicDeduction + earnedIncomeDeduction;

        const taxBase = Math.max(0, annualTaxableSalary - totalIncomeDeduction);

        // Income tax calculation based on tax base (과세표준)
        let calculatedAnnualTax = 0;
        if (taxBase <= 14000000) {
            calculatedAnnualTax = taxBase * 0.06;
        } else if (taxBase <= 50000000) {
            calculatedAnnualTax = (14000000 * 0.06) + (taxBase - 14000000) * 0.15;
        } else if (taxBase <= 88000000) {
            calculatedAnnualTax = (14000000 * 0.06) + (36000000 * 0.15) + (taxBase - 50000000) * 0.24;
        } else if (taxBase <= 150000000) {
            calculatedAnnualTax = (14000000 * 0.06) + (36000000 * 0.15) + (38000000 * 0.24) + (taxBase - 88000000) * 0.35;
        } else { // Simplified for higher incomes
            calculatedAnnualTax = (14000000 * 0.06) + (36000000 * 0.15) + (38000000 * 0.24) + (62000000 * 0.35) + (taxBase - 150000000) * 0.38;
        }

        // Child tax credit (자녀세액공제)
        let childTaxCredit = 0;
        if (children === 1) childTaxCredit = 150000;
        else if (children >= 2) childTaxCredit = 300000 + (children - 2) * 300000; // Simplified

        calculatedAnnualTax = Math.max(0, calculatedAnnualTax - childTaxCredit);
        
        const monthlyIncomeTax = Math.floor(calculatedAnnualTax / 12 / 10) * 10;
        const monthlyLocalIncomeTax = Math.floor(monthlyIncomeTax * 0.1 / 10) * 10;
        
        const totalMonthlyTax = monthlyIncomeTax + monthlyLocalIncomeTax;

        // 4. Final Calculation
        const totalMonthlyDeductions = totalInsuranceDeductions + totalMonthlyTax;
        const monthlyTakeHome = monthlySalary - totalMonthlyDeductions;
        const annualTakeHome = monthlyTakeHome * 12;

        // 5. Display Results
        const formatter = new Intl.NumberFormat('en-US');
        monthlyTakeHomeOutput.textContent = formatter.format(Math.round(monthlyTakeHome));
        annualTakeHomeOutput.textContent = formatter.format(Math.round(annualTakeHome));
        totalDeductionsOutput.textContent = formatter.format(Math.round(totalMonthlyDeductions));
        nationalPensionOutput.textContent = formatter.format(nationalPension);
        healthInsuranceOutput.textContent = formatter.format(healthInsurance);
        longTermCareOutput.textContent = formatter.format(longTermCare);
        employmentInsuranceOutput.textContent = formatter.format(employmentInsurance);
        incomeTaxOutput.textContent = formatter.format(monthlyIncomeTax);
        localIncomeTaxOutput.textContent = formatter.format(monthlyLocalIncomeTax);
    });
}
// Also need the theme toggle logic on this page
const themeToggleButton = document.getElementById('theme-toggle-button');

const setButtonText = () => {
    const currentLang = localStorage.getItem('language') || 'ko';
    const isDarkMode = document.body.classList.contains('dark-mode');
    if (currentLang === 'ko') {
        themeToggleButton.textContent = isDarkMode ? '화이트 모드' : '다크 모드';
    } else {
        themeToggleButton.textContent = isDarkMode ? 'White Mode' : 'Dark Mode';
    }
}

setButtonText();

themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    setButtonText();
});

