console.log("a", { hi: "A"})
fetch("https://httpbin.org/get", {
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(data => {
    return data.json();
})
.then(data => {
    console.log(data);
})