// Function to fetch all products
async function fetchProducts() {
    try {
        // connecting endpoint locally
        // const response = await fetch('http://localhost:8003/api/v1/nepalSupermarket');

        // connecting endpoint Remotely:
        const response = await fetch('https://nepalsupermarket.onrender.com/api/v1/nepalSupermarket');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

// Function to group products by a specified key
function groupProductsByKey(products, key) {
    const groupedProducts = {};
    products.forEach(product => {
        const value = product[key];
        if (!groupedProducts[value]) {
            groupedProducts[value] = [];
        }
        groupedProducts[value].push(product);
    });
    return groupedProducts;
}

// Function to populate dropdown with distinct values
async function populateDropdown(key, dropdownId) {
    const products = await fetchProducts();
    const groupedProducts = groupProductsByKey(products, key);
    const dropdown = document.getElementById(dropdownId);
    Object.keys(groupedProducts).forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        dropdown.appendChild(option);
    });
}


// Function to populate form fields with product details based on search term
function populateFormFields(searchTerm) {
    // Fetch all products
    fetchProducts()
    .then(products => {
        // Find the product with the matching ID, name, or category
        const product = products.find(p => p.id == searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase()));
        if (product) {
            // Populate form fields with product details
            document.getElementById('id').value = product.id;
            document.getElementById('name').value = product.name;
            document.getElementById('category').value = product.category;
        } else {
            console.error('Product not found');
        }
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });
}

// function to update the product
async function updateProduct(id, data) {
    try {
        console.log('Updating product with ID:', id);

        // connecting endpoint locally:
        // const url = 'http://localhost:8003/api/v1/nepalSupermarket/' + id;

        // connecting endpoint remotely:
        const url =  'https://nepalsupermarket.onrender.com/api/v1/nepalSupermarket' + id;
        console.log('Request URL:', url);
        
        const requestBody = JSON.stringify(data);
        console.log('Request Body:', requestBody);
        
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error('Failed to update product');
        }
        
        const updatedProduct = await response.json();
        console.log('Product updated:', updatedProduct);
        
        $.toaster({ priority: 'success', title: 'Products', message: 'Product has been updated' });
    } catch (error) {
        console.error('Error updating product:', error);
        $.toaster({ priority: 'danger', title: 'Error', message: 'Failed to update product' });
    }
}
