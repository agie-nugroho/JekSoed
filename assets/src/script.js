// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll(".nav-menu li a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Header scroll effect
const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Active menu item based on scroll position
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu li"); // Added missing variable

window.addEventListener("scroll", function () {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((li) => {
    const link = li.querySelector("a");
    li.classList.remove("active");
    if (link && link.getAttribute("href") === "#" + current) {
      li.classList.add("active");
    }
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
});

// Typing effect
const text =
  "Layanan ojek online terpercaya yang mengutamakan kenyamanan dan keselamatan penumpang dengan harga terjangkau.";
let index = 0;
function typeWriter() {
  const typingElement = document.getElementById("typing-effect");
  if (typingElement && index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, 50);
  }
}
window.onload = typeWriter;

document.addEventListener("DOMContentLoaded", function () {
  // Testimonial slider functionality
  const testimonialWrapper = document.querySelector(".testimonial-wrapper");
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-testimonial");
  const nextBtn = document.querySelector(".next-testimonial");

  // Check if testimonial elements exist before initializing
  if (testimonials.length && dots.length && prevBtn && nextBtn) {
    let currentIndex = 0;
    const totalTestimonials = testimonials.length;

    // Initialize testimonials
    function initTestimonials() {
      testimonials.forEach((testimonial, index) => {
        if (index === 0) {
          testimonial.classList.add("active");
          testimonial.style.opacity = "1";
          testimonial.style.transform = "scale(1)";
        } else {
          testimonial.classList.remove("active");
          testimonial.style.opacity = "0";
          testimonial.style.transform = "scale(0.9)";
          testimonial.style.display = "none";
        }
      });

      dots[0].classList.add("active");
    }

    // Function to show testimonial by index
    function showTestimonial(index) {
      // Hide all testimonials
      testimonials.forEach((testimonial) => {
        testimonial.classList.remove("active");
        testimonial.style.opacity = "0";
        testimonial.style.transform = "scale(0.9)";

        setTimeout(() => {
          testimonial.style.display = "none";
        }, 300);
      });

      // Update dots
      dots.forEach((dot) => {
        dot.classList.remove("active");
      });

      // Show selected testimonial after a brief delay
      setTimeout(() => {
        testimonials[index].style.display = "block";
        testimonials[index].offsetHeight; // Trigger reflow
        testimonials[index].classList.add("active");
        testimonials[index].style.opacity = "1";
        testimonials[index].style.transform = "scale(1)";
        dots[index].classList.add("active");
      }, 300);

      currentIndex = index;
    }

    // Next testimonial function
    function nextTestimonial() {
      let nextIndex = (currentIndex + 1) % totalTestimonials;
      showTestimonial(nextIndex);
    }

    // Previous testimonial function
    function prevTestimonial() {
      let prevIndex =
        (currentIndex - 1 + totalTestimonials) % totalTestimonials;
      showTestimonial(prevIndex);
    }

    // Set up event listeners
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      prevTestimonial();
    });

    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      nextTestimonial();
    });

    // Set up dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener("click", function () {
        showTestimonial(index);
      });
    });

    // Auto rotate testimonials every 5 seconds
    let autoRotate = setInterval(nextTestimonial, 5000);

    // Pause auto rotation when hovering over testimonials
    if (testimonialWrapper) {
      testimonialWrapper.addEventListener("mouseenter", function () {
        clearInterval(autoRotate);
      });

      testimonialWrapper.addEventListener("mouseleave", function () {
        autoRotate = setInterval(nextTestimonial, 5000);
      });
    }

    // Initialize the testimonials on page load
    initTestimonials();
  }

  // Contact section functions
  function initializeContactFeatures() {
    // Add copy buttons to contact info items
    addCopyButtons();

    // Initialize Google Map
    initializeMap();

    // Add floating action buttons
    addFloatingButtons();

    // Add WhatsApp button
    addWhatsAppButton();

    // Add Instagram class to Instagram icon
    const instagramIcon = document.querySelector(
      ".social-icon i.fab.fa-instagram"
    );
    if (instagramIcon) {
      instagramIcon.parentElement.classList.add("instagram");
    }

    // Add scroll reveal effect
    initScrollReveal();
  }

  // Function to add copy buttons to phone and address
  function addCopyButtons() {
    const phoneItem = document.querySelector(".contact-item:nth-child(1)");
    const addressItem = document.querySelector(".contact-item:nth-child(2)");

    // Add copy button to phone
    if (phoneItem && phoneItem.querySelector("p")) {
      addCopyButton(phoneItem, phoneItem.querySelector("p").innerText);
    }

    // Add copy button to address
    if (addressItem && addressItem.querySelector("p")) {
      addCopyButton(addressItem, addressItem.querySelector("p").innerText);
    }
  }

  // Function to create and add copy button to an element
  function addCopyButton(element, textToCopy) {
    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.innerHTML = '<i class="far fa-copy"></i>';

    const tooltip = document.createElement("span");
    tooltip.className = "copy-tooltip";
    tooltip.innerText = "Disalin!";

    copyBtn.appendChild(tooltip);

    copyBtn.addEventListener("click", function () {
      // Copy text to clipboard
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          // Show tooltip
          tooltip.classList.add("show");

          // Hide tooltip after 2 seconds
          setTimeout(() => {
            tooltip.classList.remove("show");
          }, 2000);
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    });

    element.style.position = "relative";
    element.appendChild(copyBtn);
  }

  // Function to initialize Google Map
  function initializeMap() {
    const contactInfo = document.querySelector(".contact-info");
    if (!contactInfo) return;

    // Create map container
    const mapContainer = document.createElement("div");
    mapContainer.className = "map-container";

    // Create map iframe
    const mapIframe = document.createElement("iframe");
    mapIframe.setAttribute(
      "src",
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.520086826164!2d109.25346390000001!3d-7.407542899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655ee8ca35359f%3A0x30daaf02efe8428f!2sFaculty%20of%20Mathematics%20and%20Natural%20Science%20Unsoed!5e0!3m2!1sen!2sid!4v1745484055605!5m2!1sen!2sid"
    );
    mapIframe.setAttribute("allowfullscreen", "");
    mapIframe.setAttribute("loading", "lazy");

    // Add load event to remove loading effect
    mapIframe.addEventListener("load", function () {
      mapContainer.classList.add("loaded");
    });

    mapContainer.appendChild(mapIframe);
    contactInfo.appendChild(mapContainer);
  }

  // Function to add floating action buttons
  function addFloatingButtons() {
    const floatActions = document.createElement("div");
    floatActions.className = "float-actions";

    // WhatsApp button
    const whatsappBtn = createFloatButton(
      "whatsapp",
      "fab fa-whatsapp",
      "Chat WhatsApp",
      "https://wa.me/6287838013523"
    );

    // Phone button
    const phoneBtn = createFloatButton(
      "phone",
      "fas fa-phone",
      "Telepon Kami",
      "tel:+6281234567890"
    );

    // Back to top button
    const topBtn = createFloatButton(
      "top",
      "fas fa-arrow-up",
      "Kembali ke Atas",
      "#"
    );
    topBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Append buttons to float-actions
    floatActions.appendChild(whatsappBtn);
    floatActions.appendChild(phoneBtn);
    floatActions.appendChild(topBtn);

    // Add float-actions to body
    document.body.appendChild(floatActions);
  }

  // Helper function to create floating buttons
  function createFloatButton(className, iconClass, tooltipText, linkHref) {
    const btn = document.createElement("a");
    btn.className = `float-btn ${className}`;
    btn.href = linkHref;

    const icon = document.createElement("i");
    icon.className = iconClass;
    btn.appendChild(icon);

    const tooltip = document.createElement("span");
    tooltip.className = "tooltip";
    tooltip.innerText = tooltipText;
    btn.appendChild(tooltip);

    return btn;
  }

  // Function to add WhatsApp button
  function addWhatsAppButton() {
    const socialMedia = document.querySelector(".social-media");
    if (!socialMedia) return;

    const whatsappBtn = document.createElement("a");
    whatsappBtn.className = "whatsapp-btn";
    whatsappBtn.href = "https://wa.me/6287838013523";
    whatsappBtn.target = "_blank";
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Chat dengan Kami';

    // Add button after social media section
    socialMedia.appendChild(whatsappBtn);
  }

  // Add scroll reveal effect
  function initScrollReveal() {
    if (!window.IntersectionObserver) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    // Observe contact section elements
    const elementsToAnimate = [
      document.querySelector(".section-title"),
      document.querySelector(".contact-info"),
      ...(document.querySelectorAll(".contact-item") || []),
      document.querySelector(".social-media"),
    ].filter(Boolean);

    elementsToAnimate.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });

    // Add CSS for the animation
    const style = document.createElement("style");
    style.textContent = `
      .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize contact features if contact section exists
  if (
    document.querySelector(".contact-info") ||
    document.querySelector(".social-media")
  ) {
    initializeContactFeatures();
  }
});
