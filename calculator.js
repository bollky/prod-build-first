// === Salary Calculator Logic ===
const calculateSalaryButton = document.getElementById('calculate-salary-button');

if (calculateSalaryButton) {
    const annualSalaryInput = document.getElementById('annual-salary');
    // const nonTaxableAllowanceInput = document.getElementById('non-taxable-allowance'); // No longer used by simplified logic
    // const dependentsInput = document.getElementById('dependents'); // No longer used by simplified logic
    // const childrenInput = document.getElementById('children'); // No longer used by simplified logic

    const monthlyTakeHomeOutput = document.getElementById('monthly-take-home');
    const annualTakeHomeOutput = document.getElementById('annual-take-home');
    const totalDeductionsOutput = document.getElementById('total-deductions');
    const nationalPensionOutput = document.getElementById('result-national-pension');
    const healthInsuranceOutput = document.getElementById('result-health-insurance');
    const longTermCareOutput = document.getElementById('result-long-term-care');
    const employmentInsuranceOutput = document.getElementById('result-employment-insurance');
    const incomeTaxOutput = document.getElementById('result-income-tax');
    const localIncomeTaxOutput = document.getElementById('result-local-income-tax');

    /**
     * 연봉 실수령액 계산 (2026년 기준 추정)
     * @param {number} annualSalary 만원 단위 (ex: 5000)
     */
    function calculateNetSalary(annualSalary) {
        const annual = annualSalary * 10000;
        const monthly = annual / 12;

        // 4대보험 (근사치)
        const pension = monthly * 0.045;
        const health = monthly * 0.03545;
        const care = health * 0.1295;
        const employment = monthly * 0.008;

        // 단순화된 소득세 (MVP용)
        let incomeTax = 0;
        if (annual <= 46000000) incomeTax = monthly * 0.06;
        else if (annual <= 88000000) incomeTax = monthly * 0.15;
        else incomeTax = monthly * 0.24;

        const localTax = incomeTax * 0.1;

        const totalDeduction =
            pension + health + care + employment + incomeTax + localTax;

        const netMonthly = monthly - totalDeduction;

        return {
            monthlyGross: Math.round(monthly),
            pension: Math.round(pension),
            health: Math.round(health),
            care: Math.round(care),
            employment: Math.round(employment),
            incomeTax: Math.round(incomeTax),
            localTax: Math.round(localTax),
            netMonthly: Math.round(netMonthly),
            netAnnual: Math.round(netMonthly * 12)
        };
    }

    calculateSalaryButton.addEventListener('click', () => {
        const annualSalary = parseFloat(annualSalaryInput.value); // Already in 10,000 KRW units

        if (isNaN(annualSalary)) {
            alert('Please enter a valid annual salary.');
            return;
        }

        const result = calculateNetSalary(annualSalary);

        // 5. Display Results
        const formatter = new Intl.NumberFormat('en-US'); // Using en-US for number formatting, display will be in KRW
        monthlyTakeHomeOutput.textContent = formatter.format(result.netMonthly);
        annualTakeHomeOutput.textContent = formatter.format(result.netAnnual);
        totalDeductionsOutput.textContent = formatter.format(
            result.pension + result.health + result.care + result.employment + result.incomeTax + result.localTax
        );
        nationalPensionOutput.textContent = formatter.format(result.pension);
        healthInsuranceOutput.textContent = formatter.format(result.health);
        longTermCareOutput.textContent = formatter.format(result.care);
        employmentInsuranceOutput.textContent = formatter.format(result.employment);
        incomeTaxOutput.textContent = formatter.format(result.incomeTax);
        localIncomeTaxOutput.textContent = formatter.format(result.localTax);
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

