// JavaScript code for the image slider with autoplay and navigation controls
        document.addEventListener('DOMContentLoaded', function () {
            // Configuration
            const images = [
                'assets/images/img1.jpeg',
                'assets/images/img2.jpeg',
                'assets/images/img3.jpeg',
                'assets/images/img4.jpeg',
                'assets/images/img5.jpeg',
                'assets/images/img6.jpeg'
            ];

            const altText = "Faculté des Sciences Semlalia Marrakech";
            const autoplayInterval = 4000; // 4 seconds between slides
            const mobileBreakpoint = 760; // Breakpoint for mobile view

            // Get DOM elements
            const sliderContainer = document.getElementById('imageSlider');
            const dotsContainer = document.getElementById('sliderDots');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const heroSection = document.querySelector('.hero-content');

            let currentIndex = 0;
            let slideInterval;

            // Create mobile image element
            function createMobileImage() {
                const mobileImg = document.createElement('img');
                mobileImg.src = 'assets/images/img1.jpeg'; // Use a mobile-specific image
                mobileImg.alt = altText;
                mobileImg.className = 'mobile-hero-image';
                heroSection.appendChild(mobileImg);
            }

            // Create and add images to the slider
            function setupSlider() {
                // Add mobile image
                createMobileImage();

                // Add slider images
                images.forEach((src, index) => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = `${altText} ${index + 1}`;
                    img.className = `slider-image ${index === 0 ? 'active' : ''}`;
                    sliderContainer.appendChild(img);

                    // Add dot
                    const dot = document.createElement('div');
                    dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
                    dot.addEventListener('click', () => goToSlide(index));
                    dotsContainer.appendChild(dot);
                });
            }

            // Go to specific slide
            function goToSlide(index) {
                if (window.innerWidth <= mobileBreakpoint) return; // Don't slide on mobile

                // Remove active class from all images and dots
                const allImages = sliderContainer.querySelectorAll('.slider-image');
                const allDots = dotsContainer.querySelectorAll('.slider-dot');

                allImages.forEach(img => img.classList.remove('active'));
                allDots.forEach(dot => dot.classList.remove('active'));

                // Add active class to current image and dot
                allImages[index].classList.add('active');
                allDots[index].classList.add('active');

                currentIndex = index;

                // Reset the autoplay timer
                resetInterval();
            }

            // Navigate to next slide
            function nextSlide() {
                if (window.innerWidth <= mobileBreakpoint) return; // Don't slide on mobile
                const newIndex = (currentIndex + 1) % images.length;
                goToSlide(newIndex);
            }

            // Navigate to previous slide
            function prevSlide() {
                if (window.innerWidth <= mobileBreakpoint) return; // Don't slide on mobile
                const newIndex = (currentIndex - 1 + images.length) % images.length;
                goToSlide(newIndex);
            }

            // Reset autoplay interval
            function resetInterval() {
                if (window.innerWidth <= mobileBreakpoint) return; // Don't autoplay on mobile
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, autoplayInterval);
            }

            // Setup event listeners
            function setupEventListeners() {
                prevBtn.addEventListener('click', () => {
                    prevSlide();
                });

                nextBtn.addEventListener('click', () => {
                    nextSlide();
                });

                // Pause autoplay on hover
                sliderContainer.addEventListener('mouseenter', () => {
                    clearInterval(slideInterval);
                });

                sliderContainer.addEventListener('mouseleave', () => {
                    resetInterval();
                });

                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (window.innerWidth <= mobileBreakpoint) return; // Disable keyboard nav on mobile
                    if (e.key === 'ArrowLeft') {
                        prevSlide();
                    } else if (e.key === 'ArrowRight') {
                        nextSlide();
                    }
                });

                // Handle window resize
                window.addEventListener('resize', () => {
                    if (window.innerWidth <= mobileBreakpoint) {
                        clearInterval(slideInterval); // Stop autoplay on mobile
                    } else {
                        resetInterval(); // Resume autoplay on desktop
                    }
                });
            }

            // Initialize the slider
            function initSlider() {
                setupSlider();
                setupEventListeners();
                if (window.innerWidth > mobileBreakpoint) {
                    resetInterval(); // Start autoplay only on desktop
                }
            }

            initSlider();
        });
    