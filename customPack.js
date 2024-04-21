document.addEventListener("DOMContentLoaded", function() {
    const quantities = document.querySelectorAll('.quantity');
    const plusButtons = document.querySelectorAll('.plus');
    const minusButtons = document.querySelectorAll('.minus');
    const selectedItemsList = document.getElementById('selected-items').querySelector('ul');
    const totalPrice = document.getElementById('total-price');
    const chocolatesCount = document.getElementById('chocolates-count');

    let selectedItems = [];
    let totalCost = 0;

    plusButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            const currentCount = parseInt(chocolatesCount.textContent);
            
            if (currentCount < 8) {
                quantities[index].value = parseInt(quantities[index].value) + 1;
                updateSelectedItems();
                updateTotalPrice();
                chocolatesCount.textContent = currentCount + 1;
            } else {
                alert("You can't select more then 8 chocolated");
            }
        });
    });

    minusButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            const currentCount = parseInt(chocolatesCount.textContent);
            
            if (currentCount > 0 && parseInt(quantities[index].value) > 0) {
                quantities[index].value = parseInt(quantities[index].value) - 1;
                updateSelectedItems();
                updateTotalPrice();
                chocolatesCount.textContent = currentCount - 1;
            }
        });
    });

    quantities.forEach(function(input, index) {
        input.addEventListener('change', function() {
            const currentCount = parseInt(chocolatesCount.textContent);
            const quantity = parseInt(input.value);
            
            if (quantity > 8) {
                input.value = 8;
            }
            
            if (quantity < 0) {
                input.value = 0;
            }

            updateSelectedItems();
            updateTotalPrice();
            chocolatesCount.textContent = quantity; // Update count based on the input value
        });
    });

    function updateSelectedItems() {
        selectedItems = [];
        quantities.forEach(function(input, index) {
            const quantity = parseInt(input.value);
            const name = input.parentElement.textContent.trim().split(' - ')[0];
            const price = parseFloat(input.parentElement.getAttribute('data-price'));

            for (let i = 0; i < quantity; i++) {
                selectedItems.push({ name: name, price: price });
            }
        });
        renderSelectedItems();
    }

    function renderSelectedItems() {
        selectedItemsList.innerHTML = '';
        selectedItems.forEach(function(item) {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            selectedItemsList.appendChild(listItem);
        });
    }

    function updateTotalPrice() {
        totalCost = selectedItems.reduce((acc, item) => acc + item.price, 0);
        totalPrice.textContent = `$${totalCost.toFixed(2)}`;
    }

    updateTotalPrice(); // Initial update
});
