const req = new XMLHttpRequest();
req.addEventListener("load", reqListener);
    
req.open("GET", "a.txt");
req.send();

function reqListener() {
    document.getElementById("a").innerText = this.responseText;
}