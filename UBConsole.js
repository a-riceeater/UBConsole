/*
    Copyright (c) Elijah Bantugan 2023
    MIT License
*/

// Function to prevent naming collisions
(() => {
    const vmNm = window.location.href.toString().length *  (Math.random() * (5 - 1) + 1).toFixed() // or window.location.href.toString().length *  (Math.random() * (9999 - 1111) + 1111).toFixed()
    const consoleStyles = `
    @import url("https://fonts.googleapis.com/css?family=Roboto");
    @import url("https://fonts.googleapis.com/css?family=Google%20Sans");
    @import url("https://fonts.googleapis.com/css?family=Raleway");
    .csub-fl-container {
        position: fixed;
        z-index: 999999999999999999;
        left: 0%;
        bottom: 0%;
        height: calc(25% + 50px);
        width: 100%;
        background-color: #202124;
        font-family: monospace;
    }
    .csub-fl-navbar {
        position: absolute;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 50px;
        background-color: #333436;
        overflow-y: scroll;
    }
    
    .csub-fl-child {
        position: absolute;
        top: 50px;
        left: 0%;
        height: calc(100% - 17.5%);
        width: 100%;
        font-size: 14px;
        overflow-y: scroll;
        padding-left: 15px;
    }

    .node - div {
        background - color: #ffcccc;
        border: 1px solid #000;
        width: 100px;
        height: 50px;
    }
      
      .node - span {
        background - color: #ccffcc;
        border: 1px solid #000;
        width: 50px;
        height: 25px;
    }

    .tag {
        color: rgb(10, 114, 148) !important;
    }
    .attrName {
        color: lightblue !important;
    }
    .attr-value {
        color: orange !important;
    }
    .dt-identify {
        color: gray;
    }

    .ubc-domtree-ele, .ubc-domtree-ele-gray {
        cursor: default;
    }
    .ubc-domtree-ele:hover {
        background-color: gray;
    }
    .ubc-domtree-ele-gray:hover {
        background-color: rgb(10, 114, 148, 0.4) !important;
    }
    .csub-fl-sg {
        position: absolute;
        top: 60%;
        right: 0.5%;
        transform: translate(0%, -50%);
        cursor: pointer;
    }
    .ubc-domtree-editing {
    }
    .csub-fl-t5 {
        position: absolute;
        top: 50%;
        width: 100%;
        transform: translate(0%, -50%);
        height: 100%;
    }
    .csub-fl-navbar-btnop {
        margin-left: 15px;
        background: transparent;
        color: white;
        font-family: 'Roboto', serif;
        border: none;
        height: 100%;
        cursor: pointer;
        color: lightgray
    }
    .csub-fl-navbar-btnop:hover {
        background-color: rgb(128, 128, 128, 0.5);
        color: white;
    }
    .csub-fl-navbar-btnop-selected {
        background-color: black;
    }
    .csub-fl-hidden {
        display: none;
    }
    .csub-ct-msg {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        color: lightgray;
    }
    .csub-ct-from {
        margin-right: 10px;
        color: gray;
    }
    .dftnmsg-url, .dftmsg-status, .dftmsg-type, .dftmsg-time, .dftmsg-headers {
        color: white;
        border-right: 1px solid gray;
        padding-right: 8px;
    }

    .csub-fl-dft-nwmsg:nth-child(even) {
        border-bottom: 1px solid rgb(128, 128, 128, 0.7);
    }
    .csub-fl-dft-nwmsg:nth-child(odd) {
        border-bottom: 1px solid rgb(211, 211, 211, 0.7);
    }

    .csub-fl-dft-nwmsg {
        height: 30px;
        line-height: 30px;
    }

    #csub-fl-inputco {
        font-family: monospace;
        color: white;
        background: transparent;
        border: none;
        width: 90%;
        outline: 0;
    }
    `

    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = consoleStyles;
    document.head.appendChild(styleSheet);

    const consoleEle = document.createElement('div');
    consoleEle.classList.add('csub-fl-container')
    consoleEle.style.display = 'block'
    document.body.appendChild(consoleEle);

    const navbar = document.createElement("div");
    navbar.classList.add("csub-fl-navbar");
    navbar.innerHTML = `
    <div class="csub-fl-t5">
        <button class="csub-fl-navbar-btnop csub-fl-navbar-btnop-selected" id="csub-fl-elementsbtn">Elements</button>
        <button class="csub-fl-navbar-btnop" id="csub-fl-consolebtn">Console</button>
        <button class="csub-fl-navbar-btnop" id="csub-fl-elementsbtn">Sources</button>
        <button class="csub-fl-navbar-btnop" id="csub-fl-networkbtn">Network</button>
    </div>
    `
    consoleEle.appendChild(navbar)

    document.getElementById("csub-fl-elementsbtn").addEventListener("click", () => openPannel("elements"));
    document.getElementById("csub-fl-consolebtn").addEventListener("click", () => openPannel("console"));
    document.getElementById("csub-fl-networkbtn").addEventListener("click", () => openPannel("network"));

    const domTree = document.createElement("div");
    domTree.classList.add("csub-fl-domtree");
    domTree.classList.add("csub-fl-child");
    consoleEle.appendChild(domTree)

    const consoleTab = document.createElement("div");
    consoleTab.classList.add("csub-fl-cto");
    consoleTab.classList.add("csub-fl-child");
    consoleTab.classList.add("csub-fl-hidden");

    consoleTab.innerHTML = `
    <div id="csub-fl-inputcodiv">
    <span style="color: rgb(0, 119, 255);">&gt;</span> <input id="csub-fl-inputco">
    </div>
    `

    consoleEle.appendChild(consoleTab);

    document.getElementById("csub-fl-inputco").addEventListener("keyup", (e) => {
        if (e.keyCode == 13 || e.key === "Enter") {
            const value = document.getElementById("csub-fl-inputco").value;

            if (value.replaceAll(/ /g, "") == "") return;

            try {
                const func = eval(value);
                const m = document.createElement("div");
                m.classList.add("csub-ct-msg");
                m.innerHTML = `
                ${isJSON(func) ? JSON.stringify(func) : func}
                <span class="csub-ct-from">VM${vmNm}:1</span>`
                consoleTab.insertBefore(m, document.getElementById("csub-fl-inputcodiv"));
                scrollBottom(consoleTab);
            } catch (err) {
                const m = document.createElement("div");
                m.classList.add("csub-ct-msg");
                m.style.color = "red"
                m.innerHTML = `
                ${err}
                <span class="csub-ct-from">VM${vmNm}:1</span>`
                consoleTab.insertBefore(m, document.getElementById("csub-fl-inputcodiv"));
                scrollBottom(consoleTab);
            } finally {
                document.getElementById("csub-fl-inputco").value = '';
            }
        }
    })

    const networkTab = document.createElement("div");
    networkTab.classList.add("csub-fl-nwt")
    networkTab.classList.add("csub-fl-child")
    networkTab.classList.add("csub-fl-hidden")
    consoleEle.appendChild(networkTab)

    const settingsGear = document.createElement("div");
    settingsGear.classList.add("csub-fl-sg")
    settingsGear.innerHTML = `
    <svg height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <path style="fill:#000000;" d="M501.801,313.316V198.684h-52.94c-4.002-13.486-9.367-26.387-15.958-38.527l37.434-37.434 l-81.059-81.058l-37.434,37.434c-12.14-6.592-25.041-11.956-38.527-15.958V10.199H198.684v52.94 c-13.486,4.002-26.387,9.367-38.527,15.958l-37.434-37.433l-81.058,81.058l37.434,37.434c-6.592,12.14-11.956,25.041-15.958,38.527 H10.199v114.634h52.94c4.002,13.486,9.367,26.387,15.958,38.527l-37.433,37.433l81.058,81.058l37.434-37.434 c12.14,6.592,25.041,11.956,38.527,15.958v52.941h114.634v-52.94c13.486-4.002,26.387-9.367,38.527-15.958l37.434,37.434 l81.058-81.058l-37.434-37.434c6.592-12.14,11.956-25.041,15.958-38.527h52.94V313.316z M256,348.038 c-50.831,0-92.038-41.207-92.038-92.038s41.207-92.038,92.038-92.038s92.038,41.207,92.038,92.038S306.831,348.038,256,348.038z"/> <path d="M313.316,512H198.684c-5.633,0-10.199-4.566-10.199-10.199v-45.473c-9.042-3.045-17.876-6.704-26.398-10.931l-32.153,32.153 c-3.982,3.983-10.441,3.983-14.424,0L34.451,396.49c-3.983-3.983-3.983-10.441,0-14.424l32.153-32.153 c-4.229-8.52-7.886-17.355-10.932-26.398H10.199C4.566,323.516,0,318.95,0,313.317V198.684c0-5.633,4.566-10.199,10.199-10.199 h45.473c3.045-9.043,6.704-17.876,10.932-26.398l-32.153-32.153c-3.983-3.983-3.983-10.441,0-14.424l81.059-81.059 c3.982-3.983,10.441-3.983,14.424,0l32.153,32.153c8.521-4.229,17.356-7.886,26.398-10.932V10.199 C188.484,4.566,193.051,0,198.684,0h114.634c5.633,0,10.199,4.566,10.199,10.199v45.473c9.042,3.045,17.876,6.704,26.398,10.932 l32.153-32.153c3.982-3.983,10.441-3.983,14.424,0l81.059,81.059c3.983,3.983,3.983,10.441,0,14.424l-32.153,32.153 c4.229,8.52,7.886,17.354,10.931,26.398h45.472c5.633,0,10.199,4.566,10.199,10.199v114.634c0,5.633-4.566,10.199-10.199,10.199 h-45.473c-3.045,9.044-6.704,17.877-10.931,26.398l32.153,32.153c3.983,3.983,3.983,10.441,0,14.424L396.49,477.55 c-3.982,3.983-10.441,3.983-14.424,0l-32.153-32.153c-8.521,4.229-17.356,7.886-26.398,10.931v45.472 C323.516,507.434,318.949,512,313.316,512z M208.883,491.602h94.236v-42.741c0-4.515,2.969-8.493,7.298-9.778 c12.688-3.766,24.989-8.861,36.563-15.144c3.969-2.155,8.883-1.443,12.079,1.751l30.222,30.222l66.634-66.634l-30.222-30.222 c-3.193-3.194-3.906-8.109-1.751-12.079c6.283-11.57,11.377-23.871,15.144-36.563c1.285-4.329,5.263-7.298,9.778-7.298h42.739 v-94.236h-42.741c-4.515,0-8.493-2.969-9.778-7.298c-3.767-12.691-8.861-24.992-15.144-36.563c-2.155-3.97-1.443-8.885,1.751-12.079 l30.222-30.222l-66.634-66.634l-30.222,30.222c-3.194,3.194-8.107,3.906-12.079,1.751c-11.573-6.284-23.874-11.378-36.563-15.144 c-4.329-1.285-7.298-5.263-7.298-9.778V20.398h-94.236v42.741c0,4.515-2.969,8.493-7.298,9.778 c-12.688,3.766-24.989,8.861-36.563,15.144c-3.97,2.154-8.885,1.442-12.079-1.751l-30.222-30.222l-66.634,66.634l30.222,30.222 c3.193,3.194,3.906,8.109,1.751,12.079c-6.283,11.572-11.378,23.873-15.144,36.563c-1.285,4.329-5.263,7.298-9.778,7.298H20.398 v94.236h42.741c4.515,0,8.493,2.969,9.778,7.298c3.766,12.689,8.861,24.99,15.144,36.563c2.155,3.97,1.443,8.885-1.751,12.079 l-30.222,30.222l66.634,66.634l30.222-30.222c3.195-3.193,8.109-3.905,12.079-1.751c11.573,6.284,23.874,11.378,36.563,15.144 c4.329,1.285,7.298,5.263,7.298,9.778v42.738H208.883z M256,358.237c-56.373,0-102.237-45.863-102.237-102.237 S199.627,153.763,256,153.763S358.237,199.627,358.237,256S312.373,358.237,256,358.237z M256,174.162 c-45.125,0-81.838,36.713-81.838,81.838c0,45.125,36.713,81.838,81.838,81.838c45.126,0,81.838-36.713,81.838-81.838 S301.126,174.162,256,174.162z"/> <path d="M256,394.954c-5.633,0-10.199-4.566-10.199-10.199c0-5.633,4.566-10.199,10.199-10.199 c50.206,0,95.15-31.792,111.838-79.111c1.873-5.312,7.697-8.099,13.011-6.226c5.312,1.874,8.099,7.698,6.226,13.011 C367.515,357.69,314.84,394.954,256,394.954z"/> <path d="M384.62,272.319c-0.16,0-0.321-0.003-0.483-0.011c-5.627-0.262-9.975-5.036-9.713-10.664 c0.088-1.875,0.132-3.774,0.132-5.643c0-5.633,4.566-10.199,10.199-10.199c5.633,0,10.199,4.566,10.199,10.199 c0,2.186-0.052,4.404-0.154,6.595C394.545,268.06,390.034,272.319,384.62,272.319z"/> </g>

</svg>`
    navbar.appendChild(settingsGear);

    console.log = function (/**/) {
        const error = new Error();
        const stackTrace = error.stack.split('\n');
        const callSite = stackTrace[2].trim();
        const callLocation = callSite.slice(callSite.lastIndexOf("/") + 1);

        var ms = arguments;
        var isjso;
        var message = '';
        for (var i = 0; i < ms.length; i++) {
            const msg = ms[i];
            isjso = isJSON(msg);
            message += " " + isjso ? JSON.stringify(msg) : msg;
        };

        const m = document.createElement("div");
        m.classList.add("csub-ct-msg");
        m.innerHTML = `
        ${isjso ? message : message.substring(1, message.length - 1)}    
        <a class="csub-ct-from" href="${window.location.href.replace(window.location.href.slice(window.location.href.lastIndexOf("/") + 1), "")}/${callLocation.replaceAll(":", "").replace(/[0-9]/g, '')}" target="_blank">${callLocation}</a>`
        consoleTab.insertBefore(m, document.getElementById("csub-fl-inputcodiv"));
        scrollBottom(consoleTab);
    }

    function scrollBottom(t) { var e; (e = t).scrollTop = e.scrollHeight }

    console.warn = function (message) {
        const error = new Error();
        const stackTrace = error.stack.split('\n');
        const callSite = stackTrace[2].trim();
        const callLocation = callSite.slice(callSite.lastIndexOf("/") + 1);

        const m = document.createElement("div");
        m.classList.add("csub-ct-msg");
        m.innerHTML = `
        ${message}    
        <span class="csub-ct-from">${callLocation}</span>`
        consoleTab.appendChild(m);
    }

    function isJSON(str) {
        return str.toString() == "[object Object]";
    }

    Object.prototype.scrollBottom = function () { var t; (t = this).scrollTop = t.scrollHeight };

    // Display Handler
    document.addEventListener("keyup", (e) => {
        if (e.key == "\\") {
            // e.preventDefault();
            switch (consoleEle.style.display) {
                case "none":
                    consoleEle.style.display = "block"
                    break;
                case "block":
                    consoleEle.style.display = "none"
            }
        }
    })

    function visualizeDOM() {
        const h = createNodeElement(document.querySelector("html"), 0);
        const dt = document.createElement("div");
        dt.innerText = `<!DOCTYPE html>`
        dt.classList.add("dt-identify")

        domTree.appendChild(dt);
        domTree.appendChild(h);

        document.querySelectorAll(".ubc-domtree-ele").forEach(dom => {
            dom.addEventListener("click", (e) => {
                if (e.detail == 2) {
                    console.log("Double clicked dom element", dom)
                    e.preventDefault();
                    console.log(dom.contentEditable)
                    dom.contentEditable == "true" ? dom.contentEditable = false : dom.contentEditable = true;
                    dom.classList.toggle("ubc-domtree-editing");
                    dom.focus();
                }
            })

            dom.addEventListener("keydown", (e) => {
                if (e.key == "Enter") {
                    e.preventDefault();
                    dom.contentEditable = "False"
                    dom.classList.toggle("ubc-domtree-editing");
                }
            })
        })
        document.querySelectorAll(".ubc-domtree-ele-gray").forEach(dom => {
            dom.addEventListener("click", (e) => {
                if (e.detail == 2) {
                    console.log("Double clicked dom element", dom)
                    e.preventDefault();
                    console.log(dom.contentEditable)
                    dom.contentEditable == "true" ? dom.contentEditable = false : dom.contentEditable = true;
                    dom.classList.toggle("ubc-domtree-editing");
                    dom.focus();
                }
            })
            dom.addEventListener("keydown", (e) => {
                if (e.key == "Enter") {
                    e.preventDefault();
                    dom.contentEditable = "False"
                    dom.classList.toggle("ubc-domtree-editing");
                }
            })
        })

    }

    function createNodeElement(node, depth) {
        const element = document.createElement("div");

        element.style.paddingLeft = `${depth * 10}px`;

        var tagText = `<span class="ubc-domtree-ele"><span class="tag">&lt;${node.nodeName.toLowerCase()}</span>`;

        const attrs = node.attributes;
        for (let i = 0; i < attrs.length; i++) {
            const attr = attrs[i];
            tagText += ` <span class="attrName">${attr.nodeName}="</span><span class="attr-value">${attr.nodeValue}</span><span class="attrName">"</span>`;
        }

        if (node.childNodes.length === 0) {
            tagText += '<span class="ubc-domtree-ele"><span class="tag">/&gt;</span></span>';
            element.innerHTML = tagText
        } else {
            tagText += '<span class="tag">&gt;</span>';
            const tagElement = document.createElement("span");
            tagElement.innerHTML = tagText
            element.appendChild(tagElement);

            if (node.childNodes.length > 0) {
                for (let i = 0; i < node.childNodes.length; i++) {
                    const childNode = node.childNodes[i];
                    if (childNode.nodeType === Node.ELEMENT_NODE) {
                        const childElement = createNodeElement(childNode, depth + 1);
                        element.appendChild(childElement);
                    } else if (childNode.nodeType === Node.TEXT_NODE) {
                        const textElement = document.createElement("span");
                        textElement.style.color = "lightgray";
                        const a = document.createElement("span");
                        a.classList.add("ubc-domtree-ele-gray");
                        textElement.textContent = childNode.textContent;
                        a.appendChild(textElement)
                        element.appendChild(a);
                    }
                }
            }

            const closingTag = `<span class="tag">&lt;/${node.nodeName.toLowerCase()}&gt;</span>`;
            const closingTagElement = document.createElement("span");
            closingTagElement.innerHTML = closingTag + "</span>";

            const lastChild = element.lastChild;
            if (lastChild && lastChild.nodeType === Node.TEXT_NODE && /^\s*$/.test(lastChild.textContent)) {
                element.removeChild(lastChild);
            }

            element.appendChild(closingTagElement);
        }

        if (depth > 0) {
            element.appendChild(document.createElement("br"));
        }

        return element;
    }
    visualizeDOM();

    // Network Logging

    const originalFetch = fetch;
    const proxied = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function(...args) {
        return proxied.apply(this, ...args)
    }

    fetch = (...args) => {
        console.log('Fetch request initiated with args:', ...args); // Change to logging to network tab when added
        const mt = document.createElement("div");
        mt.classList.add("csub-fl-dft-nwmsg");
        mt.innerHTML = `
        <span class="dftnmsg-url">${JSON.stringify(args[0])}</span>
        <span class="dftmsg-status">(pending)</span>
        <span class="dftmsg-type">fetch</span>
        <span class="dftmsg-time">(pending)</span>
        <span class="dftmsg-headers">${JSON.stringify(args[1])}</span>
        `
        // mt.innerHTML = args[0] + " " + JSON.stringify(args[1]);
        networkTab.appendChild(mt);
        networkTab.scrollBottom(mt);
        var startDate = new Date();
        return originalFetch(...args).then((res) => {
            const endDate = new Date();
            const seconds = (endDate.getTime() - startDate.getTime()) / 1000;

            mt.innerHTML = `
              <span class="dftnmsg-url">${JSON.stringify(args[0])}</span>
              <span class="dftmsg-status">${res.status}</span>
              <span class="dftmsg-type">fetch</span>
              <span class="dftmsg-time">${seconds * 1000}ms</span>
              <span class="dftmsg-headers">${JSON.stringify(args[1])}</span>
            `;
            networkTab.scrollBottom(mt);

            return res;
        })
            .catch((err) => {
                const endDate = new Date();
                const seconds = (endDate.getTime() - startDate.getTime()) / 1000;
                mt.innerHTML = `
                <span style="color: red">(failed)</span>
              <span class="dftnmsg-url" style="color: red">${args[0]}</span>
              <span class="dftmsg-status" style="color: red">unknown</span>
              <span class="dftmsg-type" style="color: red">fetch</span>
              <span class="dftmsg-time" style="color: red">${seconds * 1000}ms</span>
              <span class="dftmsg-headers" style="color: red">${JSON.stringify(args[1])}</span>
            `;
                throw err;
            })
    };

    // Pannel Handler
    function openPannel(name) {
        document.querySelectorAll(".csub-fl-child").forEach(ele => ele.classList.add("csub-fl-hidden"));
        document.querySelectorAll(".csub-fl-navbar-btnop-selected").forEach(ele => ele.classList.remove("csub-fl-navbar-btnop-selected"))
        switch (name) {
            case "elements":
                domTree.classList.remove("csub-fl-hidden");
                document.getElementById("csub-fl-elementsbtn").classList.add("csub-fl-navbar-btnop-selected")
                break;
            case "console":
                consoleTab.classList.remove("csub-fl-hidden");
                document.getElementById("csub-fl-consolebtn").classList.add("csub-fl-navbar-btnop-selected")
                break;
            case "network":
                networkTab.classList.remove("csub-fl-hidden");
                document.getElementById("csub-fl-networkbtn").classList.add("csub-fl-navbar-btnop-selected")
                break;
        }
    }
})();
