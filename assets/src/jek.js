document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Debug: Log what we're finding for testimonial elements
    console.log('Testimonials found:', document.querySelectorAll('.testimonial').length);
    console.log('Prev button found:', document.querySelector('.prev-testimonial'));
    console.log('Next button found:', document.querySelector('.next-testimonial'));
    
    // Testimonial slider functionality - Try alternative selectors
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    // Try multiple possible selectors for navigation buttons
    const prevBtn = document.querySelector('.prev-testimonial') || 
                   document.querySelector('.prev') || 
                   document.querySelector('[data-slide="prev"]') ||
                   document.querySelector('.testimonial-prev');
                   
    const nextBtn = document.querySelector('.next-testimonial') || 
                   document.querySelector('.next') || 
                   document.querySelector('[data-slide="next"]') ||
                   document.querySelector('.testimonial-next');
    
    // Debug: Log what we found with alternative selectors
    console.log('Prev button (alternatives):', prevBtn);
    console.log('Next button (alternatives):', nextBtn);
    
    let currentTestimonial = 0;
    
    // Make sure we have testimonials
    if (testimonials.length > 0) {
        console.log('Testimonial system initializing...');
        
        // Hide all testimonials except the first one
        function hideAllTestimonials() {
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            
            if (dots && dots.length) {
                dots.forEach(dot => {
                    dot.classList.remove('active');
                });
            }
        }
        
        // Show the current testimonial
        function showTestimonial(index) {
            hideAllTestimonials();
            testimonials[index].style.display = 'block';
            if (dots && dots.length && dots[index]) {
                dots[index].classList.add('active');
            }
            console.log('Showing testimonial', index);
        }
        
        // Initial display
        showTestimonial(currentTestimonial);
        
        // Next testimonial
        function nextTestimonial() {
            currentTestimonial++;
            if (currentTestimonial >= testimonials.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
            console.log('Next clicked, now showing', currentTestimonial);
        }
        
        // Previous testimonial
        function prevTestimonial() {
            currentTestimonial--;
            if (currentTestimonial < 0) {
                currentTestimonial = testimonials.length - 1;
            }
            showTestimonial(currentTestimonial);
            console.log('Prev clicked, now showing', currentTestimonial);
        }
        
        // Direct function calls for debugging
        window.nextTestimonial = nextTestimonial;
        window.prevTestimonial = prevTestimonial;
        
        // Event listeners for testimonial controls - with direct function attachment
        if (prevBtn) {
            console.log('Adding event listener to prev button');
            prevBtn.onclick = function(e) {
                e.preventDefault();
                prevTestimonial();
                return false;
            };
        } else {
            console.error('Previous button not found!');
        }
        
        if (nextBtn) {
            console.log('Adding event listener to next button');
            nextBtn.onclick = function(e) {
                e.preventDefault();
                nextTestimonial();
                return false;
            };
        } else {
            console.error('Next button not found!');
        }
        
        // Click on dots
        if (dots && dots.length) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentTestimonial = index;
                    showTestimonial(currentTestimonial);
                });
            });
        }
        
        // Auto slide testimonials (optional)
        // Comment this out temporarily for debugging
        // const autoSlideInterval = setInterval(nextTestimonial, 5000);
    } else {
        console.error('No testimonials found!');
    }
    
    // Form submission and other code continues...
    // [Rest of your code remains unchanged]
});