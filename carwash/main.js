
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Add 'visible' class when element is in view
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Stop observing after animation
            observer.unobserve(entry.target);
        }
    });
}, {
    // Options
    threshold: 0.1, // Trigger when at least 10% of the element is visible
    rootMargin: '0px' // Can be adjusted to trigger earlier/later
});

// Start observing all elements with class 'scroll-trigger'
document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-trigger');
    scrollElements.forEach(el => observer.observe(el));
});

document.querySelector('.ham-menu').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.off-screen-menu').classList.toggle('active');
});

let currentSlide = 0;

function slideReviews(direction) {
    const slider = document.querySelector('.reviews-grid');
    const cards = document.querySelectorAll('.review-card');
    const cardsPerView = window.innerWidth <= 768 ? 1 : 2;
    const totalSlides = Math.ceil(cards.length / cardsPerView);
    
    if (direction === 'next') {
        currentSlide = (currentSlide + 1) % totalSlides;
    } else {
        currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    }
    
    const slideWidth = (100 / cardsPerView);
    slider.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
}

// Reset position on window resize
window.addEventListener('resize', () => {
    currentSlide = 0;
    document.querySelector('.reviews-grid').style.transform = 'translateX(0)';
});


function openModal(modalId, pdfPath) {
    const modal = document.getElementById(modalId);
    const pdfViewer = modal.querySelector('embed');

    // Get viewer dimensions
    const viewerWidth = pdfViewer.offsetWidth;
    const viewerHeight = pdfViewer.offsetHeight;

    // Determine zoom level (fit width/height dynamically)
    const zoom = viewerWidth > viewerHeight ? "fit-width" : "fit-height";

    // Set the PDF path with zoom dynamically
    pdfViewer.src = `${pdfPath}#zoom=${zoom}`;

    // Display the modal
    modal.style.display = 'block';
}

function closeModal(modalId) {
    // Get the modal element
    const modal = document.getElementById(modalId);

    // Hide the modal
    modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    let modal = document.getElementById(modalId);
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
