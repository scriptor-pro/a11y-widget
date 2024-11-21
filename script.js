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
      width: 300px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
      padding: 15px;
      font-family: Arial, sans-serif;
      font-size: 14px;
    }

    #accessibility-widget.open {
      display: block;
    }

    #accessibility-widget h2 {
      font-size: 18px;
      margin-bottom: 10px;
      color: #333;
    }

    #accessibility-widget .button-group {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }

    #accessibility-widget button {
      flex: 1;
      padding: 8px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
    }

    #accessibility-widget button:hover {
      opacity: 0.9;
    }

    #increase-text { background-color: #007acc; color: white; }
    #decrease-text { background-color: #007acc; color: white; }
    #invert-colors { background-color: #28a745; color: white; }
    #high-contrast { background-color: #ffc107; color: white; }
    #check-images { background-color: #dc3545; color: white; }

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
  `;
  document.head.appendChild(style);

  // Create the toggle button
  const toggleButton = document.createElement("button");
  toggleButton.id = "accessibility-toggle";
  toggleButton.innerText = "A";
  document.body.appendChild(toggleButton);

  // Create the widget
  const widget = document.createElement("div");
  widget.id = "accessibility-widget";
  widget.innerHTML = `
    <h2>Accessibility Options</h2>
    <div class="button-group">
      <button id="increase-text">A+</button>
      <button id="decrease-text">A-</button>
    </div>
    <button id="invert-colors">Invert Colors</button>
    <button id="high-contrast">High Contrast</button>
    <button id="check-images">Check Images</button>
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

  // Event Listeners
  toggleButton.addEventListener("click", () => {
    widget.classList.toggle("open");
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
})();
