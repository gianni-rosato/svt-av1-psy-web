class VideoComparer {
  constructor(containerId, leftImage, rightImages, labels) {
    this.container = document.getElementById(containerId);
    this.leftImage = leftImage;
    this.rightImages = rightImages;
    this.labels = labels;
    this.currentRightIndex = 0;
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="comparison-slider">
        <img src="${this.rightImages[0]}" alt="${this.labels[0]}" />
        <img src="${this.leftImage}" alt="SVT-AV1-PSY" class="overlay" />
        <div class="slider-line"></div>
        <div class="slider-button"></div>
      </div>
      <div class="comparison-controls">
        <span class="label">SVT-AV1-PSY</span>
        <div class="codec-buttons">
          ${
      this.labels.map((label, index) => `
            <button class="codec-button ${
        index === 0 ? "active" : ""
      }" data-index="${index}">
              ${label}
            </button>
          `).join("")
    }
        </div>
        <span class="label">${this.labels[0]}</span>
      </div>
    `;

    const slider = this.container.querySelector(".comparison-slider");
    const sliderButton = this.container.querySelector(".slider-button");
    const sliderLine = this.container.querySelector(".slider-line");
    const overlay = this.container.querySelector(".overlay");
    const buttons = this.container.querySelectorAll(".codec-button");

    let isDragging = false;

    const move = (e) => {
      if (!isDragging) return;

      const rect = slider.getBoundingClientRect();
      const x = Math.min(Math.max(0, e.pageX - rect.left), rect.width);
      const percentage = (x / rect.width) * 100;

      overlay.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
      sliderButton.style.left = `${percentage}%`;
      sliderLine.style.left = `${percentage}%`; // Move the line with the button
    };

    sliderButton.addEventListener("mousedown", () => {
      isDragging = true;
      document.addEventListener("mousemove", move);
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      document.removeEventListener("mousemove", move);
    });

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = parseInt(button.dataset.index);
        const baseImage = slider.querySelector("img:not(.overlay)");
        baseImage.src = this.rightImages[index];

        buttons.forEach((b) => b.classList.remove("active"));
        button.classList.add("active");
      });
    });
  }
}
