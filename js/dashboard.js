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

    // Inventory Adjustments Section
    const inventoryAdjustmentsForm = document.getElementById('inventory-adjustments-form');
    const adjustmentLogTableBody = document.getElementById('adjustment-log-table').querySelector('tbody');

    const loadAdjustmentLog = () => {
        adjustmentLogTableBody.innerHTML = ''; // Clear existing rows
        const adjustments = JSON.parse(localStorage.getItem('inventoryAdjustments') || '[]');

        adjustments.forEach(adjustment => {
            const row = adjustmentLogTableBody.insertRow();
            row.insertCell(0).textContent = adjustment.date;
            row.insertCell(1).textContent = adjustment.type;
            row.insertCell(2).textContent = adjustment.item;
            row.insertCell(3).textContent = adjustment.quantity;
            row.insertCell(4).textContent = adjustment.reason;
            row.insertCell(5).textContent = adjustment.responsiblePerson;
        });
    };

    inventoryAdjustmentsForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const adjustmentType = document.getElementById('adjustment-type').value;
        const adjustmentReason = document.getElementById('adjustment-reason').value;
        const adjustedItem = document.getElementById('adjusted-item').value;
        const adjustedQuantity = document.getElementById('adjusted-quantity').value;
        const responsiblePerson = document.getElementById('responsible-person').value;

        const adjustment = {
            date: new Date().toLocaleDateString(),
            type: adjustmentType,
            item: adjustedItem,
            quantity: adjustedQuantity,
            reason: adjustmentReason,
            responsiblePerson: responsiblePerson
        };

        const adjustments = JSON.parse(localStorage.getItem('inventoryAdjustments') || '[]');
        adjustments.push(adjustment);
        localStorage.setItem('inventoryAdjustments', JSON.stringify(adjustments));

        const row = adjustmentLogTableBody.insertRow();
        row.insertCell(0).textContent = adjustment.date;
        row.insertCell(1).textContent = adjustment.type;
        row.insertCell(2).textContent = adjustment.item;
        row.insertCell(3).textContent = adjustment.quantity;
        row.insertCell(4).textContent = adjustment.reason;
        row.insertCell(5).textContent = adjustment.responsiblePerson;

        alert('Inventory adjustment saved!');
        inventoryAdjustmentsForm.reset();
    });

    loadAdjustmentLog();

    // Pricing Information Section
    const pricingInformationForm = document.getElementById('pricing-information-form');
    const pricingLogTableBody = document.getElementById('pricing-log-table').querySelector('tbody');

    // Function to load saved pricing information from localStorage
    const loadPricingInformation = () => {
        pricingLogTableBody.innerHTML = ''; // Clear existing rows
        const pricingData = JSON.parse(localStorage.getItem('pricingInformation') || '[]');

        pricingData.forEach(price => {
            const row = pricingLogTableBody.insertRow();
            row.insertCell(0).textContent = price.productName;
            row.insertCell(1).textContent = price.costPrice;
            row.insertCell(2).textContent = price.sellingPrice;
            row.insertCell(3).textContent = price.discounts;
            row.insertCell(4).textContent = price.taxRate ? `${price.taxRate}%` : 'N/A';
        });
    };

    // Event listener for the pricing form submission
    pricingInformationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form values
        const productName = document.getElementById('pricing-product-name').value;
        const costPrice = document.getElementById('cost-price').value;
        const sellingPrice = document.getElementById('selling-price').value;
        const discounts = document.getElementById('discounts').value || 'N/A';
        const taxRate = document.getElementById('tax-rate').value || '0';

        // Create a new pricing object
        const pricingEntry = {
            productName,
            costPrice: parseFloat(costPrice).toFixed(2),
            sellingPrice: parseFloat(sellingPrice).toFixed(2),
            discounts,
            taxRate: parseFloat(taxRate).toFixed(2)
        };

        // Save to localStorage
        const pricingData = JSON.parse(localStorage.getItem('pricingInformation') || '[]');
        pricingData.push(pricingEntry);
        localStorage.setItem('pricingInformation', JSON.stringify(pricingData));

        // Dynamically add the new row to the table
        const row = pricingLogTableBody.insertRow();
        row.insertCell(0).textContent = pricingEntry.productName;
        row.insertCell(1).textContent = pricingEntry.costPrice;
        row.insertCell(2).textContent = pricingEntry.sellingPrice;
        row.insertCell(3).textContent = pricingEntry.discounts;
        row.insertCell(4).textContent = pricingEntry.taxRate ? `${pricingEntry.taxRate}%` : 'N/A';

        alert('Pricing information saved successfully!');
        pricingInformationForm.reset();
    });

    // Load existing pricing information on page load
    loadPricingInformation();

    // Reports and Analysis Section
    const loadReportsAndAnalysis = () => {
        // Low Stock Alerts
        const lowStockTableBody = document.getElementById('low-stock-alerts-table').querySelector('tbody');
        lowStockTableBody.innerHTML = ''; // Clear existing rows

        const currentQuantity = parseInt(localStorage.getItem('currentQuantity')) || 0;
        const minStockLevel = parseInt(localStorage.getItem('minStockLevel')) || 0;

        if (currentQuantity < minStockLevel) {
            const row = lowStockTableBody.insertRow();
            row.insertCell(0).textContent = 'Item'; // Generic name
            row.insertCell(1).textContent = currentQuantity;
            row.insertCell(2).textContent = minStockLevel;
        }

        // Overstock Reports
        const overstockTableBody = document.getElementById('overstock-reports-table').querySelector('tbody');
        overstockTableBody.innerHTML = ''; // Clear existing rows

        const maxStockCapacity = parseInt(localStorage.getItem('maxStockCapacity')) || 0;

        if (currentQuantity > maxStockCapacity) {
            const row = overstockTableBody.insertRow();
            row.insertCell(0).textContent = 'Item'; // Generic name
            row.insertCell(1).textContent = currentQuantity;
            row.insertCell(2).textContent = maxStockCapacity;
        }

        // Expiry Reports
        const expiryTableBody = document.getElementById('expiry-reports-table').querySelector('tbody');
        expiryTableBody.innerHTML = ''; // Clear existing rows

        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.forEach(product => {
            const expiryDate = new Date(product.expiryDate);
            const today = new Date();
            const daysToExpiry = Math.round((expiryDate - today) / (1000 * 60 * 60 * 24));

            if (daysToExpiry <= 30) { // Alert for items expiring within 30 days
                const row = expiryTableBody.insertRow();
                row.insertCell(0).textContent = product.productName || 'Item'; // Generic name
                row.insertCell(1).textContent = expiryDate.toLocaleDateString();
                row.insertCell(2).textContent = daysToExpiry;
            }
        });
    };

    // Attach the reports reload function to relevant events
    const attachReportUpdates = () => {
        // Trigger Reports and Analysis updates after stock details are saved
        const stockDetailsForm = document.getElementById('stock-details-form');
        if (stockDetailsForm) {
            stockDetailsForm.addEventListener('submit', loadReportsAndAnalysis);
        }

        // Trigger Reports and Analysis updates after product information is updated
        const productInfoForm = document.getElementById('product-info-form');
        if (productInfoForm) {
            productInfoForm.addEventListener('submit', loadReportsAndAnalysis);
        }

        // Trigger Reports and Analysis updates after inventory adjustments are made
        const inventoryAdjustmentsForm = document.getElementById('inventory-adjustments-form');
        if (inventoryAdjustmentsForm) {
            inventoryAdjustmentsForm.addEventListener('submit', loadReportsAndAnalysis);
        }
    };

    // Initial load for reports and attach updates
    loadReportsAndAnalysis();
    attachReportUpdates();

    // sales information section

    // JavaScript for managing sales entries and updating the sales table
    const salesTable = document.getElementById('sales-table').getElementsByTagName('tbody')[0];
    const salesCountElement = document.getElementById('sales-count');

    // let salesCount = parseInt(localStorage.getItem('salesCount') || '0'); // Initialize sales count from localStorage
    salesCountElement.textContent = salesCount; // Display initial sales count

    document.getElementById('add-sales').addEventListener('click', function () {
        const productName = prompt('Enter product name:');
        const quantitySold = parseInt(prompt('Enter quantity sold:'));
        const totalSales = parseFloat(prompt('Enter total sales amount:'));

        if (productName && !isNaN(quantitySold) && !isNaN(totalSales)) {
            // Add new row to the sales table
            const newRow = salesTable.insertRow();
            newRow.innerHTML = `
            <td>${productName}</td>
            <td>${quantitySold}</td>
            <td>₦${totalSales.toFixed(2)}</td>

        `;

            // Update the sales count
            salesCount += quantitySold;
            salesCountElement.textContent = salesCount;
            localStorage.setItem('salesCount', salesCount); // Save updated sales count to localStorage

            // Attach the delete event listener to the delete button
        } else {
            alert('Please enter valid data.');
        }
    });

    // Initialize order data in localStorage if it doesn't exist
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([])); // Default to empty array
    }

    // Function to update the Order Overview
    function updateOrderOverview() {
        const orders = JSON.parse(localStorage.getItem('orders'));
        const orderCount = orders.length;
        const pendingOrders = orders.filter(order => order.status === 'Pending').length;
        const shippedOrders = orders.filter(order => order.status === 'Shipped').length;

        document.getElementById('order-count').textContent = orderCount;
        document.getElementById('pending-orders-count').textContent = pendingOrders;
        document.getElementById('shipped-orders-count').textContent = shippedOrders;

        updateOrderTable(); // Update the table with the new order data
    }

    // Function to update the order details table
    function updateOrderTable() {
        const orders = JSON.parse(localStorage.getItem('orders'));
        const tableBody = document.querySelector('#order-table tbody');
        tableBody.innerHTML = ''; // Clear the table before adding new rows

        orders.forEach(order => {
            const row = document.createElement('tr');

            row.innerHTML = `
            <td>${order.orderId}</td>
            <td>${order.customerName}</td>
            <td>${order.product}</td>
            <td>${order.quantity}</td>
            <td>${order.status}</td>
            
        `;

            tableBody.appendChild(row);
        });
    }

    // Function to handle adding a new order
    document.getElementById('add-order-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const orderId = document.getElementById('order-id').value;
        const customerName = document.getElementById('customer-name').value;
        const product = document.getElementById('product').value;
        const quantity = document.getElementById('quantity').value;
        const status = document.getElementById('status').value;

        // Create a new order object
        const newOrder = {
            orderId,
            customerName,
            product,
            quantity,
            status
        };

        // Get the current orders from localStorage and add the new one
        const orders = JSON.parse(localStorage.getItem('orders'));
        orders.push(newOrder);

        // Save the updated orders array back to localStorage
        localStorage.setItem('orders', JSON.stringify(orders));

        // Clear the form
        document.getElementById('add-order-form').reset();

        // Update the overview and table
        updateOrderOverview();
    });

    // Function to delete an order by order ID
    function deleteOrder(orderId) {
        const orders = JSON.parse(localStorage.getItem('orders'));

        // Filter out the deleted order
        const updatedOrders = orders.filter(order => order.orderId !== orderId);

        // Save the updated orders array back to localStorage
        localStorage.setItem('orders', JSON.stringify(updatedOrders));

        // Update the overview and table
        updateOrderOverview();
    }

    // Function to edit an order (optional, can be expanded further)
    function editOrder(orderId) {
        const orders = JSON.parse(localStorage.getItem('orders'));

        // Find the order to edit
        const orderToEdit = orders.find(order => order.orderId === orderId);

        if (orderToEdit) {
            // Pre-fill the form with the order details for editing
            document.getElementById('order-id').value = orderToEdit.orderId;
            document.getElementById('customer-name').value = orderToEdit.customerName;
            document.getElementById('product').value = orderToEdit.product;
            document.getElementById('quantity').value = orderToEdit.quantity;
            document.getElementById('status').value = orderToEdit.status;

            // Remove the order from localStorage before saving the edited one
            deleteOrder(orderId);
        }
    }

    // Initial call to update the Order Overview when the page loads
    updateOrderOverview();

// user access section

    document.addEventListener('DOMContentLoaded', function () {
        const rolesPermissionsForm = document.getElementById('role-management-form');
        const rolesTableBody = document.getElementById('user-roles-table').getElementsByTagName('tbody')[0];

        // Load roles and permissions from localStorage
        const loadRolesPermissions = () => {
            rolesTableBody.innerHTML = ''; // Clear existing rows
            const roles = JSON.parse(localStorage.getItem('rolesPermissions') || '[]');
            roles.forEach(role => {
                const row = rolesTableBody.insertRow();
                row.insertCell(0).textContent = role.employeeName;
                row.insertCell(1).textContent = role.role;

                const deleteCell = row.insertCell(2);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'delete-btn';
                deleteButton.addEventListener('click', function () {
                    deleteRole(role); // Remove from localStorage
                    loadRolesPermissions(); // Reload table after deleting
                });
                deleteCell.appendChild(deleteButton);
            });
        };

        // Save new role to localStorage
        const saveRole = (employeeName, role) => {
            const roles = JSON.parse(localStorage.getItem('rolesPermissions') || '[]');
            roles.push({ employeeName, role });
            localStorage.setItem('rolesPermissions', JSON.stringify(roles));
        };

        // Delete role from localStorage
        const deleteRole = (role) => {
            const roles = JSON.parse(localStorage.getItem('rolesPermissions') || '[]');
            const updatedRoles = roles.filter(r => r.employeeName !== role.employeeName);
            localStorage.setItem('rolesPermissions', JSON.stringify(updatedRoles));
        };

        // Handle role form submission
        rolesPermissionsForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const employeeName = document.getElementById('employee-name').value;
            const role = document.getElementById('role').value;

            if (employeeName && role) {
                saveRole(employeeName, role);
                alert('Role saved successfully!');
                loadRolesPermissions(); // Reload table after saving
                rolesPermissionsForm.reset();
            } else {
                alert('Please fill in all fields before saving.');
            }
        });

        // Initial load of roles
        loadRolesPermissions();
    });

    
   
        const rolesPermissionsForm = document.getElementById('role-management-form');
        const rolesTableBody = document.getElementById('user-roles-table').getElementsByTagName('tbody')[0];

        // Load roles and permissions from localStorage
        const loadRolesPermissions = () => {
            rolesTableBody.innerHTML = ''; // Clear existing rows
            const roles = JSON.parse(localStorage.getItem('rolesPermissions') || '[]');
            roles.forEach(role => {
                const row = rolesTableBody.insertRow();
                row.insertCell(0).textContent = role.employeeName;
                row.insertCell(1).textContent = role.role;

                const deleteCell = row.insertCell(2);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'delete-btn';
                deleteButton.addEventListener('click', function () {
                    deleteRole(role); // Remove from localStorage
                    loadRolesPermissions(); // Reload table after deleting
                });
                deleteCell.appendChild(deleteButton);
            });
        };

        // Save new role to localStorage
        const saveRole = (employeeName, role) => {
            const roles = JSON.parse(localStorage.getItem('rolesPermissions') || '[]');
            roles.push({ employeeName, role });
            localStorage.setItem('rolesPermissions', JSON.stringify(roles));
        };

        // Delete role from localStorage
        const deleteRole = (role) => {
            const roles = JSON.parse(localStorage.getItem('rolesPermissions') || '[]');
            const updatedRoles = roles.filter(r => r.employeeName !== role.employeeName);
            localStorage.setItem('rolesPermissions', JSON.stringify(updatedRoles));
        };

        // Handle role form submission
        rolesPermissionsForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const employeeName = document.getElementById('employee-name').value;
            const role = document.getElementById('role').value;

            if (employeeName && role) {
                saveRole(employeeName, role);
                alert('Role saved successfully!');
                loadRolesPermissions(); // Reload table after saving
                rolesPermissionsForm.reset();
            } else {
                alert('Please fill in all fields before saving.');
            }
        });

        // Initial load of roles
        loadRolesPermissions();
   
});
