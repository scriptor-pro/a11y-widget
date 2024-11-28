(function () {
  const style = document.createElement("style");
  style.innerHTML = `
    /* Accessibility Button */
    #accessibility-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      background-color: #007acc;
      color: white;
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      font-size: 18px;
      text-align: center;
      line-height: 50px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: transform 0.2s ease-in-out;
    }
    #accessibility-toggle:hover {
      transform: scale(1.1);
    }

    /* Accessibility Widget */
    #accessibility-widget {
      display: none;
      position: fixed;
      bottom: 80px;
      right: 20px;
      z-index: 10000;
      width: 320px;
      background: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 14px;
      transition: all 0.3s ease-in-out;
    }

    #accessibility-widget.open {
      display: block;
    }

    #accessibility-widget h2 {
      font-size: 20px;
      margin-bottom: 15px;
      color: #333;
    }

    #accessibility-widget .button-group {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 15px;
    }

    #accessibility-widget button {
      flex: 1 1 calc(50% - 10px);
      padding: 10px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }

    #accessibility-widget button:hover {
      opacity: 0.9;
    }

    #increase-text { background-color: #007acc; color: white; }
    #decrease-text { background-color: #007acc; color: white; }
    #invert-colors { background-color: #28a745; color: white; }
    #high-contrast { background-color: #ffc107; color: white; }
    #check-images { background-color: #dc3545; color: white; }
    #highlight-links-button { background-color: #17a2b8; color: white; }
    #hide-images { background-color: #6c757d; color: white; }

    /* Accessibility Body Classes */
    body.inverted-colors {
      filter: invert(1);
      background-color: #000;
      color: #fff;
    }
    body.high-contrast {
      background-color: #000;
      color: #fff;
    }
    body.hide-images img {
      display: none;
    }

    /* Highlight Links */
    .highlight-links a {
      background-color: black;
      color: white;
      padding: 1rem;
    }

    /* Developed By Section */
    #accessibility-widget .footer {
      margin-top: 20px;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
  `;
  document.head.appendChild(style);

  // Create the toggle button
  const toggleButton = document.createElement("span");
  toggleButton.id = "accessibility-toggle";
  toggleButton.className = "material-symbols-outlined";
  toggleButton.innerText = "blind";
  toggleButton.style.fontSize = "32px"
  toggleButton.style.cursor = "default";
  document.body.appendChild(toggleButton);

  // Create the widget
  const widget = document.createElement("div");
  widget.id = "accessibility-widget";
  widget.innerHTML = `
    <h2>Accessibility Options</h2>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=blind" />
    <div class="button-group">
      <button id="increase-text">A+</button>
      <button id="decrease-text">A-</button>
      <button id="invert-colors">Invert Colors</button>
      <button id="high-contrast">High Contrast</button>
      <button id="check-images">Check Images</button>
      <button id="highlight-links-button">Highlight Links</button>
      <button id="hide-images">Hide Images</button>
      <button id="increase-saturation">Increase Saturation</button>
      <button id="decrease-saturation">Decrease Saturation</button>
    </div>
    <div class="footer">Developed by <a href="https://mariancollege.org" target="_blank">mariancollege.org</a></div>
  `;
  document.body.appendChild(widget);

  // Utility Functions
  let textSize = 1;
  const adjustTextSize = (direction) => {
    textSize += direction === "increase" ? 0.1 : -0.1;
    document.body.style.fontSize = `${textSize}em`;
  };

  const toggleClassOnBody = (className) => {
    document.body.classList.toggle(className);
  };

  const validateImages = () => {
    const images = document.querySelectorAll("img");
    const missingAltImages = [];

    images.forEach((img, index) => {
      if (!img.hasAttribute("alt") || img.alt.trim() === "") {
        missingAltImages.push({
          index: index + 1,
          src: img.src || "Unknown Source",
        });
      }
    });

    if (missingAltImages.length > 0) {
      const errorMessage = missingAltImages
        .map(
          (img) =>
            `Image ${img.index}: ${img.src.length > 50 ? img.src.substring(0, 50) + "..." : img.src
            }`
        )
        .join("\n");
      alert(
        `Accessibility Issue:\nThe following images are missing 'alt' attributes:\n\n${errorMessage}`
      );
    } else {
      alert("All images have proper 'alt' attributes. Great job!");
    }
  };

  function adjustSaturation(action) {
    const body = document.body;
    let currentSaturation = parseFloat(getComputedStyle(body).getPropertyValue('--saturation') || 1);

    if (action === "increase") {
      currentSaturation += 0.1;
    } else if (action === "decrease") {
      currentSaturation -= 0.1;
    }

    body.style.setProperty('--saturation', currentSaturation);
    body.style.filter = `saturate(${currentSaturation})`;
  }

  // Function to toggle widget visibility
  function toggleWidgetVisibility() {
    if (widget.style.display === 'none' || widget.style.display === '') {
      widget.style.display = 'block';
    } else {
      widget.style.display = 'none';
    }
  }

  // Event Listeners
  toggleButton.addEventListener("click", toggleWidgetVisibility);

  document.addEventListener('click', function (event) {
    if (!widget.contains(event.target) && !toggleButton.contains(event.target)) {
      widget.style.display = 'none';
    }
  });

  document.getElementById("increase-text").addEventListener("click", () => {
    adjustTextSize("increase");
  });

  document.getElementById("decrease-text").addEventListener("click", () => {
    adjustTextSize("decrease");
  });

  document.getElementById("invert-colors").addEventListener("click", () => {
    toggleClassOnBody("inverted-colors");
  });

  document.getElementById("high-contrast").addEventListener("click", () => {
    toggleClassOnBody("high-contrast");
  });

  document.getElementById("check-images").addEventListener("click", validateImages);

  const highlightLinksButton = document.getElementById("highlight-links-button");
  highlightLinksButton.addEventListener("click", () => {
    document.body.classList.toggle("highlight-links");
  });

  document.getElementById("hide-images").addEventListener("click", () => {
    toggleClassOnBody("hide-images");
  });

  document.getElementById("increase-saturation").addEventListener("click", () => {
    adjustSaturation("increase");
  });

  document.getElementById("decrease-saturation").addEventListener("click", () => {
    adjustSaturation("decrease");
  });
})();
