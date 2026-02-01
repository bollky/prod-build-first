const translations = {
    en: {
        // Navbar
        navLottoGenerator: "Lotto Generator",
        navSalaryCalculator: "Salary Calculator",
        navContact: "Contact",
        // Theme Toggle
        themeToggleWhite: "White Mode",
        themeToggleDark: "Dark Mode",
        // Language Toggle
        langToggle: "한국어",
        // Lotto Page
        lottoTitle: "Lotto 6/45 Generator",
        lottoSetsLabel: "Number of Sets:",
        lottoGenerateButton: "Generate Numbers",
        // Contact Page
        contactTitle: "Contact Us",
        contactEmailLabel: "Your Email:",
        contactNameLabel: "Your Name (Optional):",
        contactMessageLabel: "Your Message:",
        contactSendButton: "Send",
        // Calculator Page
        calculatorTitle: "Salary Calculator",
        calculatorInputsTitle: "Inputs",
        calculatorAnnualSalaryLabel: "Annual Salary (in 10,000 KRW):",
        calculatorNonTaxableLabel: "Monthly Non-Taxable Allowance (e.g., meals):",
        calculatorDependentsLabel: "Number of Dependents (including self):",
        calculatorChildrenLabel: "Number of Children (under 20):",
        calculatorNationalPensionLegend: "National Pension",
        calculatorApplyOption: "Apply",
        calculatorNoApplyOption: "Don't Apply",
        calculatorHealthInsuranceLegend: "Health Insurance",
        calculatorWorkplaceOption: "Workplace",
        calculatorRegionalOption: "Regional (Not Implemented)",
        calculatorCalculateButton: "Calculate",
        calculatorResultsTitle: "Results",
        calculatorMonthlyTakeHomeLabel: "Monthly Take-Home:",
        calculatorAnnualTakeHomeLabel: "Annual Take-Home:",
        calculatorTotalDeductionsLabel: "Total Monthly Deductions:",
        calculatorInsuranceDetailsTitle: "4 Major Insurance Details (Monthly)",
        calculatorNationalPensionLabel: "National Pension:",
        calculatorHealthInsuranceLabel: "Health Insurance:",
        calculatorLongTermCareLabel: "Long-Term Care:",
        calculatorEmploymentInsuranceLabel: "Employment Insurance:",
        calculatorTaxesTitle: "Taxes (Monthly)",
        calculatorIncomeTaxLabel: "Income Tax:",
        calculatorLocalIncomeTaxLabel: "Local Income Tax:",
    },
    ko: {
        // Navbar
        navLottoGenerator: "로또 번호 생성기",
        navSalaryCalculator: "연봉 계산기",
        navContact: "제휴 문의",
        // Theme Toggle
        themeToggleWhite: "화이트 모드",
        themeToggleDark: "다크 모드",
        // Language Toggle
        langToggle: "English",
        // Lotto Page
        lottoTitle: "로또 6/45 번호 생성기",
        lottoSetsLabel: "생성 개수:",
        lottoGenerateButton: "번호 생성",
        // Contact Page
        contactTitle: "제휴 문의",
        contactEmailLabel: "이메일:",
        contactNameLabel: "이름 (선택):",
        contactMessageLabel: "메시지:",
        contactSendButton: "보내기",
        // Calculator Page
        calculatorTitle: "연봉 계산기",
        calculatorInputsTitle: "입력",
        calculatorAnnualSalaryLabel: "연봉 (만원단위):",
        calculatorNonTaxableLabel: "월 비과세액 (식대 등):",
        calculatorDependentsLabel: "부양가족 수 (본인 포함):",
        calculatorChildrenLabel: "자녀 수 (20세 미만):",
        calculatorNationalPensionLegend: "국민연금",
        calculatorApplyOption: "적용",
        calculatorNoApplyOption: "미적용",
        calculatorHealthInsuranceLegend: "건강보험",
        calculatorWorkplaceOption: "직장가입자",
        calculatorRegionalOption: "지역가입자 (미구현)",
        calculatorCalculateButton: "계산하기",
        calculatorResultsTitle: "결과",
        calculatorMonthlyTakeHomeLabel: "월 실수령액:",
        calculatorAnnualTakeHomeLabel: "연 실수령액:",
        calculatorTotalDeductionsLabel: "월 공제액 합계:",
        calculatorInsuranceDetailsTitle: "4대보험 상세 (월)",
        calculatorNationalPensionLabel: "국민연금:",
        calculatorHealthInsuranceLabel: "건강보험:",
        calculatorLongTermCareLabel: "장기요양:",
        calculatorEmploymentInsuranceLabel: "고용보험:",
        calculatorTaxesTitle: "세금 (월)",
        calculatorIncomeTaxLabel: "소득세:",
        calculatorLocalIncomeTaxLabel: "지방소득세:",
    }
};

const setLanguage = (lang) => {
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);

    document.querySelectorAll('[data-i18n-key]').forEach(element => {
        const key = element.getAttribute('data-i18n-key');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Special case for the theme toggle button text which is dynamic
    const themeToggleButton = document.getElementById('theme-toggle-button');
    if (themeToggleButton) {
        const isDarkMode = document.body.classList.contains('dark-mode');
        if (lang === 'ko') {
            themeToggleButton.textContent = isDarkMode ? translations.ko.themeToggleWhite : translations.ko.themeToggleDark;
        } else {
            themeToggleButton.textContent = isDarkMode ? translations.en.themeToggleWhite : translations.en.themeToggleDark;
        }
    }
};

const toggleLanguage = () => {
    const currentLang = localStorage.getItem('language') || 'ko';
    const newLang = currentLang === 'ko' ? 'en' : 'ko';
    setLanguage(newLang);
};

document.addEventListener('DOMContentLoaded', () => {
    const langToggleButton = document.getElementById('lang-toggle-button');
    if (langToggleButton) {
        langToggleButton.addEventListener('click', toggleLanguage);
    }

    const initialLang = localStorage.getItem('language') || 'ko';
    setLanguage(initialLang);
});
