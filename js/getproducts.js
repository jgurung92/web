new gridjs.Grid({
    search: true,
    sort: true,
    pagination: true,
    fixedHeader: true,
    height: "55%",

    columns: [
        {name: "id", width: "100px"},
        {name: "name", width: "100px"},
        {name: "category", width: "100px"} ],
    
    server: {
        url: "http://localhost:8003/api/v1/nepalSupermarket",
        then: (data) => {
            data.sort((a,b) => a.id - b.id);
            return data.map((products) => [
                products.id,
                products.name,
                products.category
            ]);
        }
    },
}).render(document.getElementById("table"));