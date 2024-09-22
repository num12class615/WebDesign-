// Function to load the external template
async function loadTemplate() {
  const scriptTag = document.getElementById("use-navbar-script");
  const src = scriptTag.getAttribute("src");
  const path = src.replaceAll("/use-navbar-script.js", "");

  try {
    const response = await fetch(`${path}/navbar.html`);
    const templateText = await response.text();

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = templateText;

    // Extract and clone the template content
    const template = tempDiv.querySelector("template");
    const clone = template.content.cloneNode(true);
    document.getElementById("NavbarComponent").appendChild(clone);

    // Find and add all <link> elements from the template to the document head
    const links = tempDiv.querySelectorAll("link");
    links.forEach((link) => {
      console.log(link);
      const href = link.getAttribute("href");
      if (href === "./styles.css") {
        const newHref = href.replace(".", path);
        link.setAttribute("href", newHref);
      }

      document.head.appendChild(link.cloneNode(true));
    });

    // Find and execute the script within the template
    const script = tempDiv.querySelector("script");
    if (script) {
      eval(script.innerText); // This executes the script inside the template
    }
  } catch (error) {
    console.error("Error loading template:", error);
  }
}

// Load the template when the DOM is ready
document.addEventListener("DOMContentLoaded", loadTemplate);
