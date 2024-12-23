class ImageSwitcher {
  constructor(containerID, images, subtitles, args) {
    this.container = document.getElementById(containerID);
    this.images = images;
    this.subtitles = subtitles;
    this.args = args;
    this.currentIndex = 0;
    this.init();
  }
  switchImage(index) {
    this.currentIndex = index;
    this.imgElement.src = this.images[index];
    this.subtitleElement.textContent = this.subtitles[index];
  }
  init() {
    this.imgElement = document.createElement("img");
    this.imgElement.src = this.images[0];
    this.imgElement.alt = "Codec comparison";
    this.imgElement.style.width = "100%";
    this.imgElement.style.height = "auto";
    this.imgElement.style.borderRadius = "8px";
    this.imgElement.loading = "lazy";
    this.subtitleElement = document.createElement("p");
    this.subtitleElement.className = "image-caption";
    this.subtitleElement.textContent = this.subtitles[0];
    this.buttonContainer = document.createElement("div");
    this.buttonContainer.style.display = "flex";
    this.buttonContainer.style.justifyContent = "center";
    this.buttonContainer.style.marginTop = "1rem";
    this
      .args
      .forEach((codec, index) => {
        const button = document.createElement("button");
        button.textContent = codec;
        button.style.margin = "0 0.5rem";
        button.style.padding = "0.5rem 1rem";
        button.style.backgroundColor = "transparent";
        button.style.color = "oklch(100% 0 0)";
        button.style.boxShadow = "0 0 10px oklch(88.52% 0.2002 194.77 / 30%)";
        button.style.border = "1px solid oklch(40% 0 0)";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";
        button.style.fontFamily = "'Apfel Grotezk', Inter, sans-serif";
        button.style.fontSize = "1.2rem";
        button.addEventListener("click", () => this.switchImage(index));
        button.addEventListener("mouseover", () => {
          button.style.background = "oklch(20% 0 0)";
          button.style.color = "oklch(88.52% 0.2002 194.77)";
        });
        button.addEventListener("mouseout", () => {
          button.style.background = "oklch(0% 0 0)";
          button.style.color = "oklch(100% 0 0)";
        });
        this
          .buttonContainer
          .appendChild(button);
      });
    this
      .container
      .appendChild(this.imgElement);
    this
      .container
      .appendChild(this.subtitleElement);
    this
      .container
      .appendChild(this.buttonContainer);
  }
}
