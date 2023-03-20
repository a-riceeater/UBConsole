console.log("a", { hi: "A"})
document.body.onclick = function() {
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
}