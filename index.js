console.log("a", { hi: "A" })
fetch("https://httpbin.org/geasdsadt", {
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
    .catch(err => {
        console.dir(err)
    })
