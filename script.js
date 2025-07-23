// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeCounters();
    initializeCountdown();
    initializeMobileMenu();
    initializeModal();
    initializeForms();
    initializeSmoothScroll();
    initializeMandelaDay();
    
    // Animate stats on page load
    setTimeout(animateStats, 500);
});

// Mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animated counters for statistics
function initializeCounters() {
    const wasteCollected = document.getElementById('waste-collected');
    const communityMembers = document.getElementById('community-members');
    
    // Simulate real data - in a real application, this would come from an API
    const wasteTarget = 2450; // kg collected this month
    const membersTarget = 187; // community members participating
    
    wasteCollected.textContent = wasteTarget;
    communityMembers.textContent = membersTarget;
}

function animateStats() {
    const wasteElement = document.getElementById('waste-collected');
    const membersElement = document.getElementById('community-members');
    
    animateCounter(wasteElement, 0, 2450, 2000);
    animateCounter(membersElement, 0, 187, 1500);
}

function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= end) {
            element.textContent = end;
            clearInterval(timer);
        }
    }, 16);
}

// Countdown to next collection
function initializeCountdown() {
    function updateCountdown() {
        const now = new Date();
        let nextCollection = new Date();
        
        // Set next Tuesday
        const daysUntilTuesday = (2 + 7 - now.getDay()) % 7 || 7;
        nextCollection.setDate(now.getDate() + daysUntilTuesday);
        nextCollection.setHours(8, 0, 0, 0); // 8:00 AM
        
        // If it's already past Tuesday 8 AM this week, set for next Tuesday
        if (now.getDay() === 2 && now.getHours() >= 8) {
            nextCollection.setDate(nextCollection.getDate() + 7);
        }
        
        const timeDiff = nextCollection.getTime() - now.getTime();
        
        if (timeDiff > 0) {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            
            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

// Modal functionality
function initializeModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}

function openModal(content) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Donation form for dustbins
function openDonationForm(type) {
    let content = '';
    
    if (type === 'dustbins') {
        content = `
            <h2 style="color: var(--primary-color); margin-bottom: 2rem;">Donate Dustbins</h2>
            <form id="donation-form">
                <div style="margin-bottom: 1rem;">
                    <label for="donor-name" style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Full Name:</label>
                    <input type="text" id="donor-name" name="name" required style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px;">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label for="donor-contact" style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Contact Number:</label>
                    <input type="tel" id="donor-contact" name="contact" required style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px;">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label for="dustbin-quantity" style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Number of Dustbins:</label>
                    <select id="dustbin-quantity" name="quantity" required style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px;">
                        <option value="">Select quantity...</option>
                        <option value="1">1 Dustbin</option>
                        <option value="2-5">2-5 Dustbins</option>
                        <option value="6-10">6-10 Dustbins</option>
                        <option value="10+">More than 10 Dustbins</option>
                    </select>
                </div>
                <div style="margin-bottom: 1rem;">
                    <label for="preferred-location" style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Preferred Placement Location:</label>
                    <textarea id="preferred-location" name="location" rows="3" placeholder="Describe where you'd like the dustbins placed..." style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px;"></textarea>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Submit Donation</button>
            </form>
        `;
    }
    
    openModal(content);
    
    // Handle form submission
    setTimeout(() => {
        const form = document.getElementById('donation-form');
        if (form) {
            form.addEventListener('submit', handleDonationSubmit);
        }
    }, 100);
}

function handleDonationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate form submission
    showNotification('Thank you for your generous donation! We will contact you within 24 hours to arrange collection and placement.', 'success');
    closeModal();
    
    // In a real application, you would send this data to a server
    console.log('Donation data:', data);
}

// Volunteer form
function openVolunteerForm() {
    const content = `
        <h2 style="color: var(--primary-color); margin-bottom: 2rem;">Volunteer Registration</h2>
        <form id="volunteer-form">
            <div style="margin-bottom: 1rem;">
                <label for="volunteer-name" style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Full Name:</label>
                <input type="text" id="volunteer-name" name="name" required style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px;">
            </div>
            <div style="margin-bottom: 1rem;">
                <label for="volunteer-email" style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Email Address:</label>
                <input type="email" id="volunteer-email" name="email" required style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px;">
            </div>
            <div style="margin-bottom: 1rem;">
                <label for="volunteer-phone" style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Phone Number:</label>
                <input type="tel" id="volunteer-phone" name="phone" required style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px;">
            </div>
            <div style="margin-bottom: 1rem;">
                <label for="availability" style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Availability:</label>
                <select id="availability" name="availability" required style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px;">
                    <option value="">Select your availability...</option>
                    <option value="weekends">Weekends only</option>
                    <option value="weekdays">Weekday evenings</option>
                    <option value="flexible">Flexible schedule</option>
                    <option value="monthly">Monthly events only</option>
                </select>
            </div>
            <div style="margin-bottom: 1rem;">
                <label for="volunteer-areas" style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Areas of Interest:</label>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;">
                    <label style="display: flex; align-items: center; font-weight: normal;">
                        <input type="checkbox" name="interests" value="cleanup" style="margin-right: 0.5rem;">
                        Clean-up drives
                    </label>
                    <label style="display: flex; align-items: center; font-weight: normal;">
                        <input type="checkbox" name="interests" value="education" style="margin-right: 0.5rem;">
                        Community education
                    </label>
                    <label style="display: flex; align-items: center; font-weight: normal;">
                        <input type="checkbox" name="interests" value="organizing" style="margin-right: 0.5rem;">
                        Event organizing
                    </label>
                    <label style="display: flex; align-items: center; font-weight: normal;">
                        <input type="checkbox" name="interests" value="monitoring" style="margin-right: 0.5rem;">
                        Area monitoring
                    </label>
                </div>
            </div>
            <button type="submit" class="btn btn-secondary" style="width: 100%; margin-top: 1rem;">Register as Volunteer</button>
        </form>
    `;
    
    openModal(content);
    
    setTimeout(() => {
        const form = document.getElementById('volunteer-form');
        if (form) {
            form.addEventListener('submit', handleVolunteerSubmit);
        }
    }, 100);
}

function handleVolunteerSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const interests = formData.getAll('interests');
    
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        availability: formData.get('availability'),
        interests: interests
    };
    
    showNotification('Thank you for volunteering! We will contact you with upcoming opportunities.', 'success');
    closeModal();
    
    console.log('Volunteer data:', data);
}

// Share message functionality
function shareMessage() {
    const message = "Join our Community Clean Initiative! Together we can stop dumping and create a cleaner, healthier environment for everyone. 🌱♻️ #CleanCommunity #StopDumping";
    
    if (navigator.share) {
        navigator.share({
            title: 'Clean Community Initiative',
            text: message,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        copyToClipboard(message);
        showNotification('Message copied to clipboard! Share it on your social media.', 'success');
    }
}

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// Form handling
function initializeForms() {
    const reportForm = document.getElementById('report-form');
    
    if (reportForm) {
        reportForm.addEventListener('submit', handleReportSubmit);
    }
}

function handleReportSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const location = formData.get('location') || e.target.querySelector('input').value;
    const description = formData.get('description') || e.target.querySelector('textarea').value;
    
    // Simulate report submission
    showNotification('Thank you for reporting! We will investigate the dumping site within 48 hours.', 'success');
    
    // Reset form
    e.target.reset();
    
    // In a real application, send data to server
    console.log('Report data:', { location, description });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--primary-color)' : 'var(--danger-color)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        max-width: 400px;
        transform: translateX(420px);
        transition: transform 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(420px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.problem-card, .solution-card, .contribute-card');
    animateElements.forEach(el => observer.observe(el));
});

// Dynamic collection day updates
function updateCollectionDay() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const collectionDayElement = document.getElementById('collection-day');
    
    if (collectionDayElement) {
        // You can make this dynamic based on different areas or schedules
        collectionDayElement.textContent = 'Every Tuesday';
    }
}

// Initialize collection day updates
document.addEventListener('DOMContentLoaded', updateCollectionDay);

// Handle window resize for responsive design
window.addEventListener('resize', function() {
    // Close mobile menu if open when resizing to larger screen
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('modal');
        if (modal && modal.style.display === 'block') {
            closeModal();
        }
    }
    
    // Mobile menu toggle with Enter/Space on hamburger
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('hamburger')) {
        e.preventDefault();
        e.target.click();
    }
});

// Focus management for accessibility
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Mandela Day functionality
function initializeMandelaDay() {
    animateMandelaMinutes();
    checkMandelaDay();
}

function animateMandelaMinutes() {
    const minutesElement = document.getElementById('mandela-minutes');
    if (minutesElement) {
        let count = 0;
        const target = 67;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 50); // Update every 50ms
        
        const timer = setInterval(() => {
            count += increment;
            minutesElement.textContent = Math.floor(count);
            
            if (count >= target) {
                minutesElement.textContent = target;
                clearInterval(timer);
            }
        }, 50);
    }
}

function checkMandelaDay() {
    const today = new Date();
    const mandelaDay = new Date(today.getFullYear(), 6, 18); // July 18
    
    // If today is Mandela Day, add special effects
    if (today.getMonth() === mandelaDay.getMonth() && today.getDate() === mandelaDay.getDate()) {
        document.body.classList.add('mandela-day-active');
        showMandelaDayNotification();
    }
}

function showMandelaDayNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #FF8C00, #4A90E2);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        z-index: 4000;
        text-align: center;
        max-width: 400px;
        border: 3px solid #FFD700;
    `;
    
    notification.innerHTML = `
        <h3 style="margin-bottom: 1rem; color: #FFD700;">🎉 Happy Mandela Day! 🎉</h3>
        <p style="margin-bottom: 1rem;">Today is Nelson Mandela International Day!</p>
        <p style="margin-bottom: 2rem;">Join us in 67 minutes of community service to honor Madiba's legacy.</p>
        <button onclick="this.parentNode.remove()" style="background: #FFD700; color: #1a4c80; border: none; padding: 10px 20px; border-radius: 25px; font-weight: bold; cursor: pointer;">
            Let's Make a Difference!
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 10 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 10000);
}

function pledgeService() {
    const content = `
        <div style="text-align: center;">
            <h2 style="color: #FF8C00; margin-bottom: 2rem;">Pledge Your 67 Minutes</h2>
            <img src="mandela-day.png" alt="Mandela Day" style="width: 100px; height: 100px; border-radius: 50%; margin-bottom: 2rem; border: 3px solid #FFD700;">
            <form id="mandela-pledge-form">
                <div style="margin-bottom: 1rem;">
                    <label for="pledge-name" style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Full Name:</label>
                    <input type="text" id="pledge-name" name="name" required style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px;">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label for="pledge-email" style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Email Address:</label>
                    <input type="email" id="pledge-email" name="email" required style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px;">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label for="service-type" style="display: block; margin-bottom: 0.5rem; font-weight: bold;">How will you serve?</label>
                    <select id="service-type" name="serviceType" required style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px;">
                        <option value="">Choose your service...</option>
                        <option value="cleanup">Community Clean-Up</option>
                        <option value="education">Environmental Education</option>
                        <option value="organizing">Organizing Events</option>
                        <option value="monitoring">Area Monitoring</option>
                        <option value="other">Other Community Service</option>
                    </select>
                </div>
                <div style="margin-bottom: 1rem;">
                    <label for="pledge-message" style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Your Commitment Message:</label>
                    <textarea id="pledge-message" name="message" rows="3" placeholder="Describe how you will spend your 67 minutes making a difference..." style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px;"></textarea>
                </div>
                <button type="submit" style="width: 100%; background: linear-gradient(135deg, #FF8C00, #4A90E2); color: white; border: none; padding: 15px; border-radius: 25px; font-size: 1.1rem; font-weight: bold; cursor: pointer; margin-top: 1rem;">
                    Make My Pledge
                </button>
            </form>
        </div>
    `;
    
    openModal(content);
    
    setTimeout(() => {
        const form = document.getElementById('mandela-pledge-form');
        if (form) {
            form.addEventListener('submit', handlePledgeSubmit);
        }
    }, 100);
}

function handlePledgeSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Create a celebration effect
    createConfettiEffect();
    
    showNotification('Thank you for pledging your 67 minutes! Together we honor Mandela\'s legacy of service. 🌟', 'success');
    closeModal();
    
    // In a real application, save the pledge to a database
    console.log('Mandela Day Pledge:', data);
}

function createConfettiEffect() {
    const colors = ['#FF8C00', '#4A90E2', '#FFD700', '#2E8B57', '#FF6347'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}vw;
                border-radius: 50%;
                pointer-events: none;
                z-index: 5000;
                animation: confetti-fall 3s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 3000);
        }, i * 100);
    }
}

// Add confetti animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti-fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
