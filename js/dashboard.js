document.addEventListener('DOMContentLoaded', function () {
   
    const sections = document.querySelectorAll('.section');
    const sidebarLinks = document.querySelectorAll('.sidebar a');

   
    const overviewSection = document.getElementById('overview-section');
    overviewSection.classList.add('visible');

   
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const sectionId = link.id.replace('-link', '-section');
            sections.forEach(section => section.classList.remove('visible'));
            document.getElementById(sectionId).classList.add('visible');
        });
    });

    // Handle logout
    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', function () {
        localStorage.clear();
        window.location.href = 'index.html';
    });

   
    const updateOverviewStockCount = () => {
        const currentQuantity = localStorage.getItem('currentQuantity') || 0;
        document.getElementById('stock-count').textContent = currentQuantity;
    };

    const salesCount = localStorage.getItem('salesCount') || 0;
    const orderCount = localStorage.getItem('orderCount') || 0;

    document.getElementById('sales-count').textContent = salesCount;
    document.getElementById('order-count').textContent = orderCount;


    updateOverviewStockCount();

  
    const productInfoForm = document.getElementById('product-info-form');
    if (productInfoForm) {
        productInfoForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Get values from the form
            const productId = document.getElementById('product-id').value;
            const productName = document.getElementById('product-name').value;
            const productDescription = document.getElementById('product-description').value;
            const productCategory = document.getElementById('product-category').value;
            const manufacturerDetails = document.getElementById('manufacturer-details').value;
            const unitOfMeasure = document.getElementById('unit-of-measure').value;
            const expiryDate = document.getElementById('expiry-date').value;

          
            const products = JSON.parse(localStorage.getItem('products') || '[]');
            products.push({
                productId,
                productName,
                productDescription,
                productCategory,
                manufacturerDetails,
                unitOfMeasure,
                expiryDate
            });
            localStorage.setItem('products', JSON.stringify(products));

            alert('Product information saved!');
            productInfoForm.reset();
        });
    }

    // Stock Details Form Submission
    const stockDetailsForm = document.getElementById('stock-details-form');
    if (stockDetailsForm) {
        const loadStockDetails = () => {
            document.getElementById('display-current-quantity').textContent = localStorage.getItem('currentQuantity') || 'N/A';
            document.getElementById('display-min-stock-level').textContent = localStorage.getItem('minStockLevel') || 'N/A';
            document.getElementById('display-max-stock-capacity').textContent = localStorage.getItem('maxStockCapacity') || 'N/A';
            document.getElementById('display-stock-location').textContent = localStorage.getItem('stockLocation') || 'N/A';
        };

        loadStockDetails();

        document.getElementById('save-stock-details').addEventListener('click', function () {
            const currentQuantity = document.getElementById('current-quantity').value;
            const minStockLevel = document.getElementById('min-stock-level').value;
            const maxStockCapacity = document.getElementById('max-stock-capacity').value;
            const stockLocation = document.getElementById('stock-location').value;

            if (currentQuantity && minStockLevel && maxStockCapacity && stockLocation) {
                localStorage.setItem('currentQuantity', currentQuantity);
                localStorage.setItem('minStockLevel', minStockLevel);
                localStorage.setItem('maxStockCapacity', maxStockCapacity);
                localStorage.setItem('stockLocation', stockLocation);

                alert('Stock details saved successfully!');
                updateOverviewStockCount();
                loadStockDetails();
            } else {
                alert('Please fill in all fields before saving.');
            }
        });
    }

    // Supplier Information Form Submission
    const supplierInfoForm = document.getElementById('supplier-info-form');
    const supplierTable = document.getElementById('supplier-table');

    if (supplierInfoForm) {
        const loadSupplierDetails = () => {
            const tbody = supplierTable.querySelector('tbody');
            tbody.innerHTML = '';

            const suppliers = JSON.parse(localStorage.getItem('suppliers') || '[]');
            suppliers.forEach(supplier => {
                const row = tbody.insertRow();
                row.insertCell(0).textContent = supplier.supplierId;
                row.insertCell(1).textContent = supplier.supplierName;
                row.insertCell(2).textContent = supplier.supplierContact;
                row.insertCell(3).textContent = supplier.supplyLeadTime;
                row.insertCell(4).textContent = supplier.productsSupplied;
                row.insertCell(5).textContent = supplier.purchaseTerms;
            });
        };

        loadSupplierDetails();

        supplierInfoForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const supplierId = document.getElementById('supplier-id').value;
            const supplierName = document.getElementById('supplier-name').value;
            const supplierContact = document.getElementById('supplier-contact').value;
            const supplyLeadTime = document.getElementById('supply-lead-time').value;
            const productsSupplied = document.getElementById('products-supplied').value;
            const purchaseTerms = document.getElementById('purchase-terms').value;

            const suppliers = JSON.parse(localStorage.getItem('suppliers') || '[]');
            suppliers.push({
                supplierId,
                supplierName,
                supplierContact,
                supplyLeadTime,
                productsSupplied,
                purchaseTerms
            });
            localStorage.setItem('suppliers', JSON.stringify(suppliers));

            alert('Supplier information saved!');
            loadSupplierDetails();
            supplierInfoForm.reset();
        });
    }

    // Purchasing and Restocking Form Submission
    const purchasingForm = document.getElementById('purchasing-form');
    if (purchasingForm) {
        purchasingForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const itemName = document.getElementById('item-name').value;
            const itemQuantity = document.getElementById('item-quantity').value;
            const restockDate = document.getElementById('restock-date').value;
            const supplierName = document.getElementById('restock-supplier').value;

            const restocks = JSON.parse(localStorage.getItem('restocks') || '[]');
            restocks.push({
                itemName,
                itemQuantity,
                restockDate,
                supplierName
            });
            localStorage.setItem('restocks', JSON.stringify(restocks));

            alert('Restock information saved!');
            purchasingForm.reset();
        });
    }
});
