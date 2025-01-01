(function () {
  const style = document.createElement("style");
  style.innerHTML = `
    /* Modern Accessibility Button */
    #accessibility-toggle {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: white;
      border: none;
      border-radius: 16px;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(37, 99, 235, 0.2);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    #accessibility-toggle:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(37, 99, 235, 0.3);
    }

    #accessibility-toggle svg {
      width: 28px;
      height: 28px;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
    }

    /* Modern Accessibility Widget */
    #accessibility-widget {
      display: none;
      position: fixed;
      bottom: 90px;
      right: 24px;
      z-index: 10000;
      width: 360px;
      max-width: 90vw;
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
      padding: 24px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    #accessibility-widget.open {
      display: block;
      animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    #accessibility-widget h2 {
      font-size: 24px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 2px solid #e5e7eb;
    }

    .button-category {
      margin-bottom: 20px;
    }

    .category-title {
      font-size: 14px;
      font-weight: 600;
      color: #6b7280;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    #accessibility-widget .button-group {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 12px;
      margin-bottom: 20px;
    }

    #accessibility-widget button {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 12px;
      background: #f3f4f6;
      color: #374151;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    #accessibility-widget button:hover {
      background: #e5e7eb;
      transform: translateY(-1px);
    }

    #accessibility-widget button.active {
      background: #2563eb;
      color: white;
    }

    /* Modern Modal Design */
    .summary-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 600px;
      background: #ffffff;
      border-radius: 24px;
      padding: 32px;
      z-index: 1001;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 1000;
    }

    .modal-content {
      font-size: 16px;
      line-height: 1.6;
      color: #374151;
      margin-bottom: 24px;
      max-height: 60vh;
      overflow-y: auto;
      padding-right: 16px;
    }

    .modal-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }

    .modal-button {
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .modal-button.primary {
      background: #2563eb;
      color: white;
      border: none;
    }

    .modal-button.secondary {
      background: #f3f4f6;
      color: #374151;
      border: none;
    }

    /* Modern Loader */
    .loader-overlay {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(8px);
    }

    .loader {
      width: 40px;
      height: 40px;
      border: 3px solid #e5e7eb;
      border-radius: 50%;
      border-top-color: #2563eb;
      animation: loader-spin 0.8s linear infinite;
    }

    @keyframes loader-spin {
      to { transform: rotate(360deg); }
    }

    /* Tooltips */
    [data-tooltip] {
      position: relative;
    }

    [data-tooltip]:before {
      content: attr(data-tooltip);
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      padding: 8px 12px;
      background: #1f2937;
      color: white;
      font-size: 12px;
      border-radius: 8px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: all 0.2s ease;
    }

    [data-tooltip]:hover:before {
      opacity: 1;
      transform: translateX(-50%) translateY(-8px);
    }

    /* Hide Images */
    .hide-images img {
      opacity: 0 !important;
      visibility: hidden !important;
    }
    
    .hide-images *[style*="background-image"] {
      background-image: none !important;
    }
  `;

  document.head.appendChild(style);

  // Create the toggle button
  const toggleButton = document.createElement("div");
  toggleButton.id = "accessibility-toggle";
  toggleButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"  fill="#e8eaed"><path d="M480-720q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720ZM360-80v-520H120v-80h720v80H600v520h-80v-240h-80v240h-80Z"/></svg>`
  toggleButton.style.cursor = "default";
  toggleButton.style.position = "fixed";
  toggleButton.style.bottom = "20px";
  toggleButton.style.padding = "4px"
  document.body.appendChild(toggleButton);

  // Create the widget
  const widget = document.createElement("div");
  widget.id = "accessibility-widget";
  widget.innerHTML = `
    <h2>Accessibility Options</h2>
    
    <div class="button-category">
      <div class="category-title">Text Options</div>
      <div class="button-group">
        <button id="increase-text" data-tooltip="Increase text size">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2v12M2 8h12"/>
          </svg>
          Text Size
        </button>
        <button id="decrease-text" data-tooltip="Decrease text size">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 8h12"/>
          </svg>
          Text Size
        </button>
        <button id="dyslexic-font" data-tooltip="Toggle dyslexia-friendly font">Dyslexic Font</button>
        <button id="letter-spacing" data-tooltip="Adjust letter spacing">Letter Spacing</button>
        <button id="line-height" data-tooltip="Adjust line height">Line Height</button>
      </div>
    </div>

    <div class="button-category">
      <div class="category-title">Visual Adjustments</div>
      <div class="button-group">
        <button id="invert-colors" data-tooltip="Invert page colors">Invert Colors</button>
        <button id="high-contrast" data-tooltip="Enable high contrast">High Contrast</button>
        <button id="increase-saturation" data-tooltip="Increase color intensity">Saturate</button>
        <button id="decrease-saturation" data-tooltip="Decrease color intensity">Desaturate</button>
        <button id="hide-images" data-tooltip="Hide all images">Hide Images</button>
      </div>
    </div>

    <div class="button-category">
      <div class="category-title">Reading Aids</div>
      <div class="button-group">
        <button id="read-screen" data-tooltip="Read page content aloud">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2v12M4 6l4-4 4 4M4 10l4 4 4-4"/>
          </svg>
          Read Aloud
        </button>
        <button id="summarize" data-tooltip="Get page summary">Summarize</button>
        <button id="big-cursor" data-tooltip="Enable large cursor">Big Cursor</button>
        <button id="highlight-links" data-tooltip="Highlight all links">Highlight Links</button>
      </div>
    </div>

    <div class="footer">
      <a href="https://mariancollege.org" target="_blank" rel="noopener">mariancollege.org</a> |
      <a href="https://github.com/Jerit-Baiju/a11y-widget/" target="_blank" rel="noopener">Contribute</a>
    </div>
  `;
  document.body.appendChild(widget);

  // Utility Functions
  const toggleClassOnBody = (className) => {
    document.body.childNodes.forEach(child => {
      if (child.nodeType === 1) {
        child.classList.toggle(className)
      }
    })
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
      currentSaturation += 1;
    } else if (action === "decrease") {
      currentSaturation -= 1;
    }

    body.style.setProperty('--saturation', currentSaturation);
    document.body.childNodes.forEach(child => {
      if (child.nodeType === 1) {
        child.style.filter = `saturate(${currentSaturation})`;
      }
    })
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
    let isDyslexicFontEnabled = parseInt(localStorage.getItem('isDyslexicFontEnabled')) || 0;
    if (load) {
      isDyslexicFontEnabled = !isDyslexicFontEnabled;
    }
    if (!isDyslexicFontEnabled) {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          if (!el.classList.contains('material-icons')) {
            let orgFontFamily = el.style['font-family']; // Fixed undefined variable
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
    if (!text || typeof text !== 'string') {
      console.error('Invalid text provided for speech synthesis');
      return;
    }

    if ('speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onerror = (event) => {
          console.error('Speech synthesis error:', event);
        };
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('Speech synthesis failed:', error);
        alert('Speech synthesis failed. Please try again.');
      }
    } else {
      alert('Speech synthesis is not supported in your browser.');
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

  function adjustFontSize(step) {
    // Save the updated font size step in local storage
    let currentStep = parseFloat(localStorage.getItem("fontSizeStep")) || 0;
    currentStep += step;
    localStorage.setItem("fontSizeStep", currentStep);

    // Get all elements in the document
    const elements = document.querySelectorAll("*");

    elements.forEach(element => {
      // Get the computed style of the element
      const computedStyle = window.getComputedStyle(element);
      const fontSize = parseFloat(computedStyle.fontSize);

      // Adjust font size
      if (!isNaN(fontSize)) {
        element.style.fontSize = `${fontSize + step}px`;
      }
    });
  }


  function restoreFontSize() {
    const savedStep = parseFloat(localStorage.getItem("fontSizeStep"));
    if (!isNaN(savedStep) && savedStep !== 0) {
      try {
        const elements = document.querySelectorAll("*");
        elements.forEach(element => {
          const computedStyle = window.getComputedStyle(element);
          const fontSize = parseFloat(computedStyle.fontSize);
          if (!isNaN(fontSize)) {
            const newSize = Math.max(fontSize + savedStep, 8); // Prevent too small fonts
            element.style.fontSize = `${newSize}px`;
          }
        });
      } catch (error) {
        console.error('Error restoring font size:', error);
        localStorage.removeItem("fontSizeStep"); // Reset on error
      }
    }
  }
  restoreFontSize()

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

  function showOverlay(paragraphs) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'summary-modal';

    const content = document.createElement('div');
    content.className = 'modal-content';
    paragraphs.forEach(text => {
      const para = document.createElement('p');
      para.textContent = text;
      content.appendChild(para);
    });

    const actions = document.createElement('div');
    actions.className = 'modal-actions';

    const readButton = document.createElement('button');
    readButton.className = 'modal-button primary';
    readButton.textContent = 'Read Aloud';
    readButton.onclick = () => {
      const summaryText = paragraphs.join(' ');
      readText(summaryText);
    };

    const closeButton = document.createElement('button');
    closeButton.className = 'modal-button secondary';
    closeButton.textContent = 'Close';
    closeButton.onclick = () => {
      document.body.removeChild(modalOverlay);
    };

    actions.appendChild(readButton);
    actions.appendChild(closeButton);

    modal.appendChild(content);
    modal.appendChild(actions);
    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);
  }

  // Event Listeners
  toggleButton.addEventListener("click", toggleWidgetVisibility);

  document.addEventListener('click', function (event) {
    if (!widget.contains(event.target) && !toggleButton.contains(event.target)) {
      widget.style.display = 'none';
    }
  });

  function initializeEventListeners() {
    const elements = {
      "increase-text": () => adjustFontSize(2),
      "decrease-text": () => adjustFontSize(-2),
      "line-height": () => adjustLineHeight(1),
      "dyslexic-font": () => enableDyslexicFont(),
      "invert-colors": () => toggleClassOnBody("inverted-colors"),
      "high-contrast": () => adjustContrast(),
      "check-images": validateImages,
      "highlight-links": () => enableHighlightLinks(),
      "hide-images": () => toggleClassOnBody("hide-images"),
      "increase-saturation": () => adjustSaturation("increase"),
      "decrease-saturation": () => adjustSaturation("decrease"),
      "letter-spacing": () => adjustLetterSpacing(0.1),
      "summarize": () => {
        widget.style.display = 'none'; // Hide the widget before showing summary
        summarizeText(extractUniqueDocumentText()).then(summary => {
          showOverlay([summary]);
        })
      },
      "read-screen": () => {
        const text = extractUniqueDocumentText();
        readText(text);
      },
      "big-cursor": () => enableBigCursor()
    };

    Object.entries(elements).forEach(([id, handler]) => {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener("click", handler);
      }
    });
  }

  initializeEventListeners();

  function extractUniqueDocumentText() {
    const uniqueTexts = new Set();
    const elements = document.body.querySelectorAll(
      "*:not(#accessibility-widget):not(#accessibility-widget *)"
    );

    // Process each element
    elements.forEach(element => {
      if (element.tagName.toLowerCase() === "img") {
        // Handle images - add alt text if available
        const altText = element.getAttribute("alt");
        if (altText && altText.trim()) {
          uniqueTexts.add(`[Image: ${altText.trim()}]`);
        } else {
          uniqueTexts.add("[Image without description]");
        }
      } else {
        // Handle text elements
        const text = element.innerText;
        if (text && text.trim() &&
          !Array.from(uniqueTexts).some(t => t.includes(text.trim()))) {
          uniqueTexts.add(text.trim());
        }
      }
    });

    // Convert Set to string
    return Array.from(uniqueTexts)
      .filter(text => text.length > 0)
      .join('\n');
  }

  function enableBigCursor(load = false) {
    let isBigCursorEnabled = parseInt(localStorage.getItem('isBigCursorEnabled'));
    if (load) {
      isBigCursorEnabled = !isBigCursorEnabled;
    }
    if (!isBigCursorEnabled) {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          el.style.cursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 512 512'%3E%3Cpath d='M429.742 319.31L82.49 0l-.231 471.744 105.375-100.826 61.89 141.083 96.559-42.358-61.89-141.083 145.549-9.25zM306.563 454.222l-41.62 18.259-67.066-152.879-85.589 81.894.164-333.193 245.264 225.529-118.219 7.512 67.066 152.878z' xmlns='http://www.w3.org/2000/svg'/%3E%3C/svg%3E"), default`;;
        });
      localStorage.setItem('isBigCursorEnabled', 1);
    } else {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          el.style.cursor = 'default';
        });

      localStorage.setItem('isBigCursorEnabled', 0);
    }
  }

  function showLoader() {
    const loaderOverlay = document.createElement('div');
    loaderOverlay.className = 'loader-overlay';
    loaderOverlay.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loaderOverlay);
    return loaderOverlay;
  }

  async function summarizeText(text) {
    const loader = showLoader();
    try {
      const formData = new FormData();
      formData.append('data', text)
      const response = await fetch('https://a11y-widget.jerit.in/summarize', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.summary;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    } finally {
      loader.remove();
    }
  }

  (async function handleImagesWithoutAlt() {
    try {
      const images = document.querySelectorAll('img:not([alt]), img[alt=""]');

      for (const img of images) {
        try {
          // Skip invalid image sources
          if (!img.src || img.src === '') continue;

          const isExternal = new URL(img.src, location.href).origin !== location.origin;

          if (isExternal) {
            img.crossOrigin = 'anonymous';
          }

          // Add timeout to image loading
          await Promise.race([
            new Promise((resolve, reject) => {
              if (img.complete && img.naturalHeight !== 0) {
                resolve();
              } else {
                img.onload = resolve;
                img.onerror = reject;
              }
            }),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Image load timeout')), 5000)
            )
          ]);

          // Create a canvas to extract image data
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Set canvas dimensions to match the image
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;

          // Draw the image onto the canvas
          ctx.drawImage(img, 0, 0);

          // Convert the canvas content to a Blob
          const imageBlob = await new Promise((resolve, reject) =>
            canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Blob conversion failed'))), 'image/jpeg')
          );

          // Create FormData and append the image Blob
          const formData = new FormData();
          formData.append('image', imageBlob, 'image.jpg');

          // Send POST request with FormData
          const response = await fetch('https://a11y-widget.jerit.in/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          // Get alt text from response and set it
          const altText = await response.json();
          img.setAttribute('alt', altText['alt']);
        } catch (error) {
          console.error(`Error processing image ${img.src}:`, error);
          // Set a fallback alt text
          img.setAttribute('alt', 'Image description unavailable');
        }
      }
    } catch (error) {
      console.error('Error handling images:', error);
    }
  }
  )();

})();