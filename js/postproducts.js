const formEl = document.querySelector('.form');

formEl.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);
    if(data.id == "" || data.name == "" || data.category == "") {
        $.toaster({ priority : 'danger', title : 'Error', message : "Oops! something went wrong."})
    }
    else {
        // connecting endpoint locally:
        // fetch('http://localhost:8003/api/v1/nepalSupermarket', {

        // connecting endpoint remotely:
            fetch('https://nepalsupermarket.onrender.com/api/v1/nepalSupermarket', {
        
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(data => console.log(data))
        .then(error => console.log(error))
        $.toaster({ priority : 'success', title : 'Products', message : "Product has been added"})
    }
});



