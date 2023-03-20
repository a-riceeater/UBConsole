/*
    Elijah Bantugan 2023
    MIT License
*/

// Function to prevent naming collisions
(() => {
    const consoleStyles = `
    @import url("https://fonts.googleapis.com/css?family=Google%20Sans");
    .csub-fl-container {
        position: fixed;
        z-index: 999999999999999999;
        left: 0%;
        bottom: 0%;
        height: 25%;
        width: 100%;
        background-color: #202124;
        font-family: monospace;
    }
    .csub-fl-navbar {
        position: absolute;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 15%;
        background-color: #333436;
    }
    
    .csub-fl-domtree {
        position: absolute;
        top: 15%;
        left: 0%;
        height: calc(100% - 15%);
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

    .ubc-domtree-ele {
        cursor: default;
    }
    .ubc-domtree-ele:hover {
        background-color: gray;
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
    consoleEle.appendChild(navbar)

    const domTree = document.createElement("div");
    domTree.classList.add("csub-fl-domtree");
    consoleEle.appendChild(domTree)

    /*console.log = function (message) {
        document.write(message);
    }*/

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
      }

      function createNodeElement(node, depth) {
        const element = document.createElement("div");
      
        element.style.paddingLeft = `${depth * 10}px`;
      
        var tagText = `<span class="tag">&lt;${node.nodeName.toLowerCase()}</span>`;
      
        const attrs = node.attributes;
        for (let i = 0; i < attrs.length; i++) {
          const attr = attrs[i];
          tagText += ` <span class="attrName">${attr.nodeName}="</span><span class="attr-value">${attr.nodeValue}"</span>`;
        }
      
        if (node.childNodes.length === 0) {
          tagText += '<span class="ubc-domtree-ele"><span class="tag">/&gt;</span></span>';
          element.innerHTML = `<span class="ubc-domtree-ele">${tagText}</span>`;
        } else {
          tagText += '<span class="tag">&gt;</span>';
          const tagElement = document.createElement("span");
          tagElement.innerHTML = `<span class="ubc-domtree-ele">${tagText}</span>`;
          element.appendChild(tagElement);
      
          if (node.childNodes.length > 0) {
            for (let i = 0; i < node.childNodes.length; i++) {
              const childNode = node.childNodes[i];
              if (childNode.nodeType === Node.ELEMENT_NODE) {
                const childElement = createNodeElement(childNode, depth + 1);
                element.appendChild(childElement);
              } else if (childNode.nodeType === Node.TEXT_NODE) {
                const textElement = document.createElement("span");
                textElement.style.color = "gray";
                textElement.textContent = childNode.textContent;
                element.appendChild(textElement);
              }
            }
          }
      
          const closingTag = `<span class="tag">&lt;/${node.nodeName.toLowerCase()}&gt;</span>`;
          const closingTagElement = document.createElement("span");
          closingTagElement.innerHTML = `<span class="ubc-domtree-ele">${closingTag}</span>`;
      
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
})();