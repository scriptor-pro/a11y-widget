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
    #decrease-text { background-color: #28a745; color: white; }
    #invert-colors { background-color: #ffc107; color: white; }
    #high-contrast { background-color: #dc3545; color: white; }
    #check-images { background-color: #17a2b8; color: white; }
    #highlight-links-button { background-color: #6c757d; color: white; }
    #hide-images { background-color: #343a40; color: white; }
    #increase-saturation { background-color: #e83e8c; color: white; }
    #decrease-saturation { background-color: #fd7e14; color: white; }
    #line-height { background-color: #6610f2; color: white; }
    #dyslexic-font { background-color: #20c997; color: white; }
    #letter-spacing { background-color: #6f42c1; color: white; }
    #voice-over { background-color: #ff5722; color: white; }

    /* Accessibility Body Classes */
    body.inverted-colors {
      filter: invert(1);
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

    @font-face {
      font-family: 'OpenDyslexic3';
      src: url("https://website-widgets.pages.dev/fonts/OpenDyslexic3-Regular.woff") format("woff"), url("https://website-widgets.pages.dev/fonts/OpenDyslexic3-Regular.ttf") format("truetype");
    }
  `;

  document.head.appendChild(style);

  // Create the toggle button
  const toggleButton = document.createElement("div");
  toggleButton.id = "accessibility-toggle";
  toggleButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"  fill="#e8eaed"><path d="M480-720q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720ZM360-80v-520H120v-80h720v80H600v520h-80v-240h-80v240h-80Z"/></svg>`
  toggleButton.style.cursor = "default";
  toggleButton.style.padding = "4px"
  document.body.appendChild(toggleButton);

  // Create the widget
  const widget = document.createElement("div");
  widget.id = "accessibility-widget";
  widget.innerHTML = `
    <h2>Accessibility Options</h2>
    <div class="button-group">
      <button id="increase-text">A+</button>
      <button id="decrease-text">A-</button>
      <button id="invert-colors">Invert Colors</button>
      <button id="high-contrast">High Contrast</button>
      <button id="check-images">Check Images</button>
      <button id="highlight-links">Highlight Links</button>
      <button id="hide-images">Hide Images</button>
      <button id="increase-saturation">Increase Saturation</button>
      <button id="decrease-saturation">Decrease Saturation</button>
      <button id="line-height">Line Height</button>
      <button id="dyslexic-font">Dyslexic Font</button>
      <button id="letter-spacing">Letter Spacing</button>
      <button id="voice-over">Voice Over</button>
    </div>
    <div class="footer">Developed by <a href="https://mariancollege.org" target="_blank">mariancollege.org</a></div>
  `;
  document.body.appendChild(widget);

  // Utility Functions
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

  function enableDyslexicFont(load = false) {
    let isDyslexicFontEnabled = parseInt(localStorage.getItem('isDyslexicFontEnabled'));
    if (load) {
      isDyslexicFontEnabled = !isDyslexicFontEnabled;
    }
    if (!isDyslexicFontEnabled) {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          if (!el.classList.contains('material-icons')) {
            orgFontFamily = el.style['font-family'];
            el.setAttribute('data-asw-orgFontFamily', orgFontFamily);
            el.style['font-family'] = 'OpenDyslexic3';
          }
        });

      localStorage.setItem('isDyslexicFontEnabled', 1);
    } else {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          if (!el.classList.contains('material-icons')) {
            orgFontFamily = el.getAttribute('data-asw-orgFontFamily');
            if (orgFontFamily) {
              el.style['font-family'] = orgFontFamily;
              el.removeAttribute('data-asw-orgFontFamily');
            }
            else {
              el.style.removeProperty('font-family');
            }
          }
        });

      localStorage.setItem('isDyslexicFontEnabled', 0);
    }
  }
  function adjustLetterSpacing(increment = 0) {
    let isLetterSpacingEnabled = parseInt(localStorage.getItem('isLetterSpacingEnabled'));
    if (!increment) {
      isLetterSpacingEnabled = !isLetterSpacingEnabled;
      increment = 0.1;
    }
    if (!isLetterSpacingEnabled) {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          if (!el.classList.contains('material-icons')) {

            let orgLetterSpacing = el.getAttribute('data-asw-orgLetterSpacing');

            if (!orgLetterSpacing) {
              orgLetterSpacing = el.style['letter-spacing'];
              el.setAttribute('data-asw-orgLetterSpacing', orgLetterSpacing);
              if (!(orgLetterSpacing)) {
                orgLetterSpacing = 0;
              }
              orgLetterSpacing = parseFloat(orgLetterSpacing);
              let newLetterSpacing = orgLetterSpacing + increment;
              el.style['letter-spacing'] = newLetterSpacing + 'em';
            }
          }
        });

      localStorage.setItem('isLetterSpacingEnabled', 1);
    } else {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          if (!el.classList.contains('material-icons')) {
            let orgLetterSpacing = el.getAttribute('data-asw-orgLetterSpacing');
            if (orgLetterSpacing) {
              el.style['letter-spacing'] = orgLetterSpacing;
              el.removeAttribute('data-asw-orgLetterSpacing');
            }
            else {
              el.style.removeProperty('letter-spacing');
            }
          }
        });

      localStorage.setItem('isLetterSpacingEnabled', 0);
    }
  }
  function adjustLineHeight(increment = 0) {
    let isLineHeightEnabled = parseInt(localStorage.getItem('isLineHeightEnabled'));
    if (!increment) {
      isLineHeightEnabled = !isLineHeightEnabled;
      increment = 1;
    }
    if (!isLineHeightEnabled) {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          if (!el.classList.contains('material-icons')) {
            let orgLineHeight = el.getAttribute('data-asw-orgLineHeight');

            if (!orgLineHeight) {
              orgLineHeight = el.style['line-height'];
              el.setAttribute('data-asw-orgLineHeight', orgLineHeight);
              if (!orgLineHeight) {
                orgLineHeight = 1.1;
              }
              orgLineHeight = parseFloat(orgLineHeight);
              let newLineHeight = orgLineHeight + increment;
              el.style['line-height'] = newLineHeight;
            }
          }
        });

      localStorage.setItem('isLineHeightEnabled', 1);
    } else {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          if (!el.classList.contains('material-icons')) {
            let orgLineHeight = el.getAttribute('data-asw-orgLineHeight');
            if (orgLineHeight) {
              el.style['line-height'] = orgLineHeight;
              el.removeAttribute('data-asw-orgLineHeight');
            }
            else {
              el.style.removeProperty('line-height');
            }

          }
        });

      localStorage.setItem('isLineHeightEnabled', 0);
    }
  }

  function readText(text) {
    // Check if the browser supports speech synthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text); // Create a new speech synthesis instance

      utterance.pitch = 1; // Range is 0 to 2 (default is 1)
      utterance.rate = 1; // Range is 0.1 to 10 (default is 1)
      utterance.volume = 1; // Range is 0 to 1 (default is 1)

      // Speak the text
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  }

  function adjustContrast(load = false) {
    let isContrastEnabled = parseInt(localStorage.getItem('isContrastEnabled'));
    if (load) {
      isContrastEnabled = !isContrastEnabled;
    }
    if (!isContrastEnabled) {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          let orgColor = el.getAttribute('data-asw-orgContrastColor');
          let orgBgColor = el.getAttribute('data-asw-orgContrastBgColor');

          if (!orgColor) {
            orgColor = el.style.color;
            el.setAttribute('data-asw-orgContrastColor', orgColor);
          }
          if (!orgBgColor) {
            orgBgColor = window.getComputedStyle(el).getPropertyValue('background-color');
            el.setAttribute('data-asw-orgContrastBgColor', orgBgColor);
          }

          el.style["color"] = '#ffff00';
          el.style["background-color"] = '#0000ff';
        });

      localStorage.setItem('isContrastEnabled', 1);
    } else {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          let orgContrastColor = el.getAttribute('data-asw-orgContrastColor');
          let orgContrastBgColor = el.getAttribute('data-asw-orgContrastBgColor');
          if (orgContrastColor) {
            el.style.color = orgContrastColor;
          } else {
            el.style.removeProperty('color');
          }
          if (orgContrastBgColor) {
            el.style.backgroundColor = orgContrastBgColor;
          } else {
            el.style.removeProperty('background-color');
          }
          el.removeAttribute('data-asw-orgContrastColor');
          el.removeAttribute('data-asw-orgContrastBgColor');
        });
      localStorage.setItem('isContrastEnabled', 0);
    }
  }

  function adjustFontSize(multiply = 0) {
    const storedPercentage = parseFloat(localStorage.getItem('fontPercentage'));
    if (multiply) {
      if (storedPercentage) {
        const newPercentage = storedPercentage + multiply;
        localStorage.setItem('fontPercentage', newPercentage);
      } else {
        const newPercentage = 1 + multiply;
        localStorage.setItem('fontPercentage', newPercentage);
      }
    }
    document
      .querySelectorAll("*")
      .forEach((el) => {
        if (!el.classList.contains('material-icons')) {
          let orgFontSize = parseFloat(el.getAttribute('data-asw-orgFontSize'));

          if (!orgFontSize) {
            orgFontSize = parseFloat(window.getComputedStyle(el).getPropertyValue('font-size'));
            el.setAttribute('data-asw-orgFontSize', orgFontSize);
          }
          let adjustedFontSize = orgFontSize * (parseFloat(localStorage.getItem('fontPercentage')) || 1);
          el.style['font-size'] = adjustedFontSize + 'px';
        }
      });
  }


  function enableHighlightLinks(load = false) {
    let isHighlightLinks = parseInt(localStorage.getItem('isHighlightLinks'));
    if (load) {
      isHighlightLinks = !isHighlightLinks;
    }
    if (!isHighlightLinks) {
      document.body.classList.add('highlight-links');

      localStorage.setItem('isHighlightLinks', 1);
    } else {
      document.body.classList.remove('highlight-links');

      localStorage.setItem('isHighlightLinks', 0);
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
    adjustFontSize(0.1);
  });

  document.getElementById("decrease-text").addEventListener("click", () => {
    adjustFontSize(-0.1);
  });

  document.getElementById("line-height").addEventListener("click", () => {
    adjustLineHeight(1)
  });

  document.getElementById("dyslexic-font").addEventListener("click", () => {
    enableDyslexicFont()
  });

  document.getElementById("invert-colors").addEventListener("click", () => {
    toggleClassOnBody("inverted-colors");
  });

  document.getElementById("high-contrast").addEventListener("click", () => {
    adjustContrast()
  });

  document.getElementById("check-images").addEventListener("click", validateImages);

  document.getElementById("highlight-links").addEventListener("click", () => {
    enableHighlightLinks()
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

  document.getElementById("letter-spacing").addEventListener("click", () => {
    adjustLetterSpacing(0.1)
  });

  document.getElementById("voice-over").addEventListener("click", () => {
    const elements = document.body.querySelectorAll("*:not(#accessibility-widget):not(#accessibility-widget *)");
    let text = "";
    elements.forEach((el) => {
      if (el.tagName.toLowerCase() === "img" && el.alt) {
        text += ` ${el.alt}`;
      } else if (el.innerText) {
        text += ` ${el.innerText}`;
      }
    });
    readText(text);
  });

  adjustFontSize();
  adjustLetterSpacing();
  enableDyslexicFont(true);
  // enableBigCursor(true);
  enableHighlightLinks(true);
  // enableHighlightHeadings(true);
  adjustLineHeight();
  // adjustFontWeight();
  adjustContrast(true);

})();
