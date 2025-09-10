let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

// Gradient backgrounds for each slide
const gradients = [
    'linear-gradient(135deg, #6750A4, #625B71)',
    'linear-gradient(135deg, #1976D2, #42A5F5)',
    'linear-gradient(135deg, #388E3C, #66BB6A)',
    'linear-gradient(135deg, #F57C00, #FFB74D)',
    'linear-gradient(135deg, #7B1FA2, #BA68C8)',
    'linear-gradient(135deg, #D32F2F, #F44336)',
    'linear-gradient(135deg, #00796B, #4DB6AC)',
    'linear-gradient(135deg, #5D4037, #8D6E63)',
    'linear-gradient(135deg, #303F9F, #5C6BC0)',
    'linear-gradient(135deg, #455A64, #78909C)'
];

function updateSlide() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev');
        
        if (index === currentSlide) {
            slide.classList.add('active');
            slide.style.background = gradients[index];
        } else if (index < currentSlide) {
            slide.classList.add('prev');
        }
    });
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
    
    // Add entrance animation
    const activeSlide = slides[currentSlide];
    const contentElements = activeSlide.querySelectorAll('.content-box, .image-shape, .title-content');
    
    contentElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
}

// Auto-play functionality removed - manual navigation only
function startAutoPlay() {
    // Auto-play disabled
}

function stopAutoPlay() {
    // Auto-play disabled
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});

// Touch/swipe support
let startX = 0;
let endX = 0;

document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const threshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// Mouse wheel navigation
document.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > 50) {
        if (e.deltaY > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}, { passive: true });

// Auto-play removed - no hover events needed

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateSlide();
    
    // Add loading animation
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Progress indicator
// function createProgressBar() {
//     const progressBar = document.createElement('div');
//     progressBar.className = 'progress-bar';
//     progressBar.innerHTML = '<div class="progress-fill"></div>';
    
//     const nav = document.querySelector('.carousel-nav');
//     nav.appendChild(progressBar);
    
//     return progressBar.querySelector('.progress-fill');
// }

// Add progress bar styles
const progressStyles = `
.progress-bar {
    width: 200px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    overflow: hidden;
    margin: 0 20px;
}

.progress-fill {
    height: 100%;
    background: white;
    width: 0%;
    transition: width 0.3s ease;
    border-radius: 2px;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = progressStyles;
document.head.appendChild(styleSheet);

// Update progress bar
function updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        progressFill.style.width = progress + '%';
    }
}

// Add progress bar to update function
const originalUpdateSlide = updateSlide;
updateSlide = function() {
    originalUpdateSlide();
    updateProgress();
};

// Initialize progress bar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        createProgressBar();
        updateProgress();
    }, 500);
});