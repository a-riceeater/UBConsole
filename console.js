/*
    Elijah Bantugan 2023
    MIT License
*/

// Function to prevent naming collisions
(() => {
    const consoleStyles = `
    .csub-fl-container {
        position: fixed;
        z-index: 999999999999999999;
        left: 0%;
        bottom: 0%;
        height: 25%;
        width: 100%;
        background-color: #202124;
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
        const body = document.body;
        const rootNode = createNodeElement(body);
        domTree.appendChild(rootNode);
      }

      function createNodeElement(node) {
        const element = document.createElement('span');
        const tagElement = document.createElement('span');
        tagElement.textContent = `<${node.nodeName.toLowerCase()}`;
      
        // Add attributes to the element
        const attrs = node.attributes;
        for (let i = 0; i < attrs.length; i++) {
          const attr = attrs[i];
          tagElement.textContent += ` ${attr.nodeName}="${attr.nodeValue}"`;
        }
      
        tagElement.textContent += '>';
      
        element.appendChild(tagElement);
      
        if (node.childNodes.length > 0) {
          for (let i = 0; i < node.childNodes.length; i++) {
            const childNode = node.childNodes[i];
            if (childNode.nodeType === Node.ELEMENT_NODE) {
              const childElement = createNodeElement(childNode);
              element.appendChild(document.createElement('br'));
              element.appendChild(childElement);
            } else if (childNode.nodeType === Node.TEXT_NODE) {
              const textElement = document.createElement('span');
              textElement.textContent = childNode.textContent;
              element.appendChild(textElement);
            }
          }
        }
      
        const closingTag = document.createElement('span');
        closingTag.textContent = `</${node.nodeName.toLowerCase()}>`;
      
        if (node.nextSibling && node.nextSibling.nodeType === Node.ELEMENT_NODE) {
          element.appendChild(closingTag);
          element.appendChild(document.createElement('br'));
        } else {
          element.appendChild(document.createElement('br'));
          element.appendChild(closingTag);
        }
      
        return element;
      }
      
      // Call the visualizeDOM function to create the visual representation
      visualizeDOM();
      

})();