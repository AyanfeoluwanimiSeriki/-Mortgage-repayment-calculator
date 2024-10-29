document.addEventListener('DOMContentLoaded', () => {
    const mortgageAmountInput = document.getElementById('mortgage-amount');
    const mortgageTermInput = document.getElementById('mortgage-term');
    const interestRateInput = document.getElementById('interest-rate');
    const mortgageTypeInputs = document.getElementsByName('mortgageType');
    const calculateBtn = document.getElementById('calculateBtn');
    const clearBtn = document.querySelector('.clear-btn');
    const monthAmountDisplay = document.getElementById('monthAmount');
    const totalAmountDisplay = document.getElementById('totalAmount');
    const emptyResultSection = document.querySelector('.empty-result');
    const completedResultsSection = document.querySelector('.completed-results');
    const errorFields = document.querySelectorAll('.error-field');

    
    errorFields.forEach(error => error.style.display = 'none');
    completedResultsSection.style.display = 'none';
    function showError(element) {
        const errorField = element.closest('.form-flex').nextElementSibling;
        const previousSymbol = element.previousElementSibling;
        const nextSymbol = element.nextElementSibling;
    
        
        if (errorField && errorField.classList.contains('error-field')) {
            errorField.style.display = 'block';
        }
    
        
        if (previousSymbol) {
            previousSymbol.style.backgroundColor = 'hsl(4, 69%, 50%)';
            previousSymbol.style.color = 'white';
        }
    
        if (nextSymbol) {
            nextSymbol.style.backgroundColor = 'hsl(4, 69%, 50%)';
            nextSymbol.style.color = 'white';
        }
        element.classList.add('shake');

    
     element.addEventListener('animationend', () => {
        element.classList.remove('shake');
    }, { once: true });
    }
    
        function hideError(element) {
            const errorField = element.closest('.form-flex').nextElementSibling;
            const previousSymbol = element.previousElementSibling;
            const nextSymbol = element.nextElementSibling;
        
            
            if (errorField && errorField.classList.contains('error-field')) {
                errorField.style.display = 'none';
            }
        
            
            if (previousSymbol) {
                previousSymbol.style.backgroundColor = '';
                previousSymbol.style.color = '';
            }
        
            if (nextSymbol) {
                nextSymbol.style.backgroundColor = '';
                nextSymbol.style.color = '';
            }
            

        
        
        }
    

   

    function validateInputs() {
        let isValid = true;

        
        if (!mortgageAmountInput.value || isNaN(mortgageAmountInput.value) || mortgageAmountInput.value <= 0) {
            showError(mortgageAmountInput);
            isValid = false;
        } else {
            hideError(mortgageAmountInput);
        }

        
        if (!mortgageTermInput.value || isNaN(mortgageTermInput.value) || mortgageTermInput.value <= 0) {
            showError(mortgageTermInput);
            isValid = false;
        } else {
            hideError(mortgageTermInput);
        }

        
        if (!interestRateInput.value || isNaN(interestRateInput.value) || interestRateInput.value <= 0) {
            showError(interestRateInput);
            isValid = false;
        } else {
            hideError(interestRateInput);
        }

        
        const selectedType = Array.from(mortgageTypeInputs).some(input => input.checked);
        const typeErrorField = document.querySelectorAll('.error-field')[3]; 
        if (!selectedType) {
            typeErrorField.style.display = 'block';
            isValid = false;
        } else {
            typeErrorField.style.display = 'none';
        }

        return isValid;
    }

    function calculateMortgage() {
        const amount = parseFloat(mortgageAmountInput.value);
        const term = parseFloat(mortgageTermInput.value);
        const rate = parseFloat(interestRateInput.value) / 100;
        const mortgageType = Array.from(mortgageTypeInputs).find(input => input.checked).value;
        let monthlyPayment = 0;
        let totalRepayment = 0;

        if (mortgageType === '1') { 
            const monthlyRate = rate / 12;
            const n = term * 12;
            monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
            totalRepayment = monthlyPayment * n;
        } else if (mortgageType === '2') { 
            monthlyPayment = (amount * rate) / 12;
            totalRepayment = monthlyPayment * term * 12;
        }
        return { monthlyPayment, totalRepayment };
    }

    function displayResults({ monthlyPayment, totalRepayment }) {
        monthAmountDisplay.textContent = `£${monthlyPayment.toFixed(2)}`;
        totalAmountDisplay.textContent = `£${totalRepayment.toFixed(2)}`;
        emptyResultSection.style.display = 'none';
        completedResultsSection.style.display = 'block';
    }

    calculateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateInputs()) {
            const results = calculateMortgage();
            displayResults(results);
        } else {
            completedResultsSection.style.display = 'none';
            emptyResultSection.style.display = 'block';
        }
    });

    
    
    clearBtn.addEventListener('click', () => {
        document.querySelector('form').reset();
        errorFields.forEach(error => error.style.display = 'none');
        monthAmountDisplay.textContent = '';
        totalAmountDisplay.textContent = '';
        emptyResultSection.style.display = 'block';
        completedResultsSection.style.display = 'none';

        
        [mortgageAmountInput, mortgageTermInput, interestRateInput].forEach(input => {
            const symbol = input.previousElementSibling;
            if (symbol) {
                symbol.style.backgroundColor = ''; // Reset symbol background color
                symbol.style.color = ''; // Reset symbol color
            }
        });
        [mortgageAmountInput, mortgageTermInput, interestRateInput].forEach(input => {
            const symbol = input.nextElementSibling;
            if (symbol) {
                symbol.style.backgroundColor = ''; // Reset symbol background color
                symbol.style.color = ''; // Reset symbol color
            }
        });
    });


    // Hide error message when a valid input is entered
    [mortgageAmountInput, mortgageTermInput, interestRateInput].forEach(input => {
        input.addEventListener('input', function () {
            if (this.value && !isNaN(this.value) && this.value > 0) {
                hideError(this);
                
                symbol.style.backgroundColor = ''
            }
        });

        
        input.addEventListener('focus', function () {
            const nextSymbol = this.nextElementSibling;
            const previousSymbol = this.previousElementSibling;
            // const isValid = this.value > 0 && !isNaN(this.value);
            
            if (previousSymbol) {
                previousSymbol.style.backgroundColor =  'hsl(61, 70%, 52%)';
            }
            if (nextSymbol) {
                nextSymbol.style.backgroundColor = '';
            }

        });
     
    });
        
        input.addEventListener('blur', function () {
           
            const nextSymbol = this.nextElementSibling;
            const isValid = this.value > 0 && !isNaN(this.value);
            
            if (previousSymbol) {
                previousSymbol.style.backgroundColor =  '';
            }
            if (nextSymbol) {
                nextSymbol.style.backgroundColor =  '';
            }
        });
    });

    
    mortgageTypeInputs.forEach(input => {
        input.addEventListener('change', () => {
            document.querySelectorAll('.error-field')[3].style.display = 'none';
        });
    });







