
import "styles.css";
export class ImageCarousel {
    constructor(targetMain) {
        this.main = document.querySelector(targetMain);
        this.slider = this.main.querySelector(".slider");
        this.previousButton = this.main.querySelector(".previous");
        this.nextButton = this.main.querySelector(".next");
        this.circleBar = this.main.querySelector(".row-two");
        this.imgWidths = [];
        this.circles = [];
        this.currentImage = 1;
        this.initializeCarousel();
        this.moveToXImage(this.currentImage);
    };

    initializeCarousel() {
        let index = 1;
        for (let image of this.slider.children) {
            this.imgWidths.push(image.offsetWidth);
            let newCircle = document.createElement("div");
            newCircle.classList.add("carousel-circle");
            this.circleBar.appendChild(newCircle);
            this.circles.push(newCircle);
            index++;
        }

        this.previousButton.addEventListener("click", () => this.previousImage());
        this.nextButton.addEventListener("click", () => this.nextImage());
        this.renderCircleColors();
        this.startTimer();
    }

    moveToXImage(amountToMove) {
        amountToMove -= 1;
        let amountToMovePx = 0;
        for (let i = 0; i <= amountToMove; i++) {
            amountToMovePx += this.imgWidths[i];
        }
        amountToMovePx = amountToMovePx - this.imgWidths[amountToMove]/2;
        this.slider.style.left = "-" + amountToMovePx + "px";
    }

    nextImage() {
        this.currentImage += 1;
        if (this.currentImage > this.imgWidths.length) {
            this.currentImage = 1;
        }
        this.moveToXImage(this.currentImage);
        this.renderCircleColors();
    }

    previousImage() {
        this.currentImage -= 1;
        if (this.currentImage < 1) {
            this.currentImage = this.imgWidths.length;
        }
        this.moveToXImage(this.currentImage);
        this.renderCircleColors();
    }

    renderCircleColors() {
        for (let circle of this.circles) {
            circle.classList.remove("active");
        }
        this.circles[this.currentImage - 1].classList.add("active");
    }

    startTimer() {
        setTimeout(() => this.nextImage(), 5000);
        setTimeout(() => this.startTimer(), 5000);
    }
}
