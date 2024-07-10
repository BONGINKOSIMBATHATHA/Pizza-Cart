document.addEventListener('DOMContentLoaded', () => {
    const prices = {
        small: 31.99,
        medium: 58.99,
        large: 87.99
    };

    let totals = {
        small: 0,
        medium: 0,
        large: 0
    };

    const totalCostElement = document.getElementById('total-cost');
    const checkoutButton = document.getElementById('checkout');
    const paymentSection = document.getElementById('payment-section');
    const messageElement = document.querySelector('.message');

    const updateTotalCost = () => {
        const totalCost = (totals.small * prices.small) + (totals.medium * prices.medium) + (totals.large * prices.large);
        totalCostElement.textContent = totalCost.toFixed(2);
        if (totalCost > 0) {
            checkoutButton.style.display = 'inline-block';
        } else {
            checkoutButton.style.display = 'none';
        }
    };

    const updateCartCount = () => {
        document.querySelectorAll('.count').forEach(countElement => {
            const size = countElement.getAttribute('data-size');
            countElement.textContent = totals[size];
        });
    };

    document.querySelectorAll('.order').forEach(button => {
        button.addEventListener('click', (event) => {
            const size = event.target.getAttribute('data-size');
            totals[size]++;
            updateCartCount();
            updateTotalCost();
        });
    });

    document.querySelectorAll('.increment').forEach(button => {
        button.addEventListener('click', (event) => {
            const size = event.target.getAttribute('data-size');
            totals[size]++;
            updateCartCount();
            updateTotalCost();
        });
    });

    document.querySelectorAll('.decrement').forEach(button => {
        button.addEventListener('click', (event) => {
            const size = event.target.getAttribute('data-size');
            if (totals[size] > 0) {
                totals[size]--;
                updateCartCount();
                updateTotalCost();
            }
        });
    });

    checkoutButton.addEventListener('click', () => {
        paymentSection.style.display = 'block';
    });

    document.getElementById('pay').addEventListener('click', () => {
        const paymentAmount = parseFloat(document.getElementById('payment-amount').value);
        const totalCost = (totals.small * prices.small) + (totals.medium * prices.medium) + (totals.large * prices.large);
        if (paymentAmount >= totalCost) {
            messageElement.textContent = 'Enjoy your pizzas!';
            messageElement.style.color = 'green';
            totals = { small: 0, medium: 0, large: 0 };
            updateCartCount();
            updateTotalCost();
            paymentSection.style.display = 'none';
        } else {
            messageElement.textContent = 'Sorry - that is not enough money!';
            messageElement.style.color = 'red';
        }
        setTimeout(() => {
            messageElement.textContent = '';
        }, 3000);
    });

    updateCartCount();
    updateTotalCost();
});





