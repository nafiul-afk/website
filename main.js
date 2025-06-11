// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Try multiple selectors to find form elements
    const form = document.querySelector('form') || document.querySelector('.contact-form');
    const nameInput = document.querySelector('input[placeholder="Your Name"]') || 
                     document.querySelector('input[name="name"]') || 
                     document.querySelector('#name');
    const emailInput = document.querySelector('input[placeholder="you@example.com"]') || 
                      document.querySelector('input[type="email"]') || 
                      document.querySelector('input[name="email"]') || 
                      document.querySelector('#email');
    const subjectInput = document.querySelector('input[placeholder="Subject"]') || 
                        document.querySelector('input[name="subject"]') || 
                        document.querySelector('#subject');
    const messageInput = document.querySelector('textarea[placeholder="Your message"]') || 
                        document.querySelector('textarea') || 
                        document.querySelector('textarea[name="message"]') || 
                        document.querySelector('#message');
    const submitButton = document.querySelector('button[type="submit"]') || 
                     document.querySelector('button') || 
                     document.querySelector('input[type="submit"]');

    // Debug: Log what elements were found
    console.log('Form elements found:', {
        form: !!form,
        nameInput: !!nameInput,
        emailInput: !!emailInput,
        subjectInput: !!subjectInput,
        messageInput: !!messageInput,
        submitButton: !!submitButton
    });

    // Add IDs to form elements for better targeting
    if (nameInput) nameInput.id = 'name';
    if (emailInput) emailInput.id = 'email';
    if (subjectInput) subjectInput.id = 'subject';
    if (messageInput) messageInput.id = 'message';

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Real-time validation
    function validateField(field, validator, errorMessage) {
        const isValid = validator(field.value);
        field.style.borderColor = isValid ? '#10b981' : '#ef4444';
        return isValid;
    }

    // Validation functions
    const validators = {
        name: (value) => value.trim().length >= 2,
        email: (value) => emailRegex.test(value.trim()),
        subject: (value) => value.trim().length >= 3,
        message: (value) => value.trim().length >= 10
    };

    // Add real-time validation listeners
    if (nameInput) {
        nameInput.addEventListener('blur', () => {
            validateField(nameInput, validators.name);
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            validateField(emailInput, validators.email);
        });
    }

    if (subjectInput) {
        subjectInput.addEventListener('blur', () => {
            validateField(subjectInput, validators.subject);
        });
    }

    if (messageInput) {
        messageInput.addEventListener('blur', () => {
            validateField(messageInput, validators.message);
        });
    }

    // Character counter for message
    if (messageInput) {
        const charCounter = document.createElement('div');
        charCounter.style.cssText = `
            text-align: right;
            font-size: 0.8em;
            color: #6b7280;
            margin-top: 5px;
        `;
        messageInput.parentNode.appendChild(charCounter);

        messageInput.addEventListener('input', function() {
            const count = this.value.length;
            charCounter.textContent = `${count}/500 characters`;
            if (count > 500) {
                charCounter.style.color = '#ef4444';
            } else {
                charCounter.style.color = '#6b7280';
            }
        });
    }

    // Show notification function
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            font-family: inherit;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        `;

        // Add animation keyframes
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        notification.textContent = message;
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Button loading state
    function setButtonLoading(loading) {
        if (!submitButton) return;
        
        if (loading) {
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <span style="display: inline-flex; align-items: center; gap: 8px;">
                    <span style="
                        width: 16px; 
                        height: 16px; 
                        border: 2px solid #6366f1; 
                        border-top: 2px solid transparent; 
                        border-radius: 50%; 
                        animation: spin 1s linear infinite;
                    "></span>
                    Sending...
                </span>
            `;
            
            // Add spin animation if not exists
            if (!document.querySelector('#spin-styles')) {
                const style = document.createElement('style');
                style.id = 'spin-styles';
                style.textContent = `
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
            }
        } else {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
        }
    }

    // Form submission handler
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: nameInput?.value.trim() || '',
                email: emailInput?.value.trim() || '',
                subject: subjectInput?.value.trim() || '',
                message: messageInput?.value.trim() || ''
            };

            // Validate all fields
            const validationResults = {
                name: validators.name(formData.name),
                email: validators.email(formData.email),
                subject: validators.subject(formData.subject),
                message: validators.message(formData.message)
            };

            // Update field styles based on validation
            if (nameInput) nameInput.style.borderColor = validationResults.name ? '#10b981' : '#ef4444';
            if (emailInput) emailInput.style.borderColor = validationResults.email ? '#10b981' : '#ef4444';
            if (subjectInput) subjectInput.style.borderColor = validationResults.subject ? '#10b981' : '#ef4444';
            if (messageInput) messageInput.style.borderColor = validationResults.message ? '#10b981' : '#ef4444';

            // Check if all fields are valid
            const isFormValid = Object.values(validationResults).every(result => result);

            if (!isFormValid) {
                showNotification('Please fill in all fields correctly.', 'error');
                return;
            }

            // Show loading state
            setButtonLoading(true);

            try {
                // Check if EmailJS is loaded
                if (typeof emailjs !== 'undefined') {
                    // Method 1: Using EmailJS (Primary method)
                    const templateParams = {
                        from_name: formData.name,
                        from_email: formData.email,
                        subject: formData.subject,
                        message: formData.message,
                        to_email: 'nafiulislammmm@gmail.com'
                    };

                    // Send email using EmailJS
                    await emailjs.send('service_synug1d', 'YOUR_TEMPLATE_ID', templateParams);
                    showNotification('Message sent successfully!', 'success');
                    
                } else {
                    // Fallback: Using mailto (opens email client)
                    console.warn('EmailJS not loaded, falling back to mailto');
                    const mailtoLink = `mailto:nafiulislammmm@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
                    )}`;

                    // Simulate API call delay
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Open email client
                    window.location.href = mailtoLink;
                    showNotification('Message sent successfully! Your email client should open shortly.', 'success');
                }

                // Reset form
                form.reset();
                
                // Reset field border colors
                [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
                    if (field) field.style.borderColor = '';
                });

            } catch (error) {
                console.error('Error sending message:', error);
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                setButtonLoading(false);
            }
        });
    }

    // Additional functionality: Auto-save form data to prevent data loss
    const STORAGE_KEY = 'contact_form_data';

    function saveFormData() {
        const data = {
            name: nameInput?.value || '',
            email: emailInput?.value || '',
            subject: subjectInput?.value || '',
            message: messageInput?.value || ''
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function loadFormData() {
        try {
            const savedData = localStorage.getItem(STORAGE_KEY);
            if (savedData) {
                const data = JSON.parse(savedData);
                if (nameInput && data.name) nameInput.value = data.name;
                if (emailInput && data.email) emailInput.value = data.email;
                if (subjectInput && data.subject) subjectInput.value = data.subject;
                if (messageInput && data.message) messageInput.value = data.message;
            }
        } catch (error) {
            console.log('No saved form data found');
        }
    }

    function clearFormData() {
        localStorage.removeItem(STORAGE_KEY);
    }

    // Load saved data on page load
    loadFormData();

    // Save data as user types
    [nameInput, emailInput, subjectInput, messageInput].forEach(field => {
        if (field) {
            field.addEventListener('input', saveFormData);
        }
    });

    // Clear saved data on successful submission
    form?.addEventListener('submit', () => {
        setTimeout(clearFormData, 2000); // Clear after successful submission
    });

    // Smooth scroll to form if there's a hash
    if (window.location.hash === '#contact') {
        form?.scrollIntoView({ behavior: 'smooth' });
    }

    console.log('Contact form functionality loaded successfully!');
});

// Additional utility functions

// Copy email address to clipboard
function copyEmailToClipboard() {
    const email = 'nafiulislammmm@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        showNotification('Email address copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Email address copied to clipboard!', 'success');
    });
}

// Social sharing functionality
function shareOnSocial(platform) {
    const url = window.location.href;
    const text = 'Check out this awesome contact form!';
    
    const urls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    if (urls[platform]) {
        window.open(urls[platform], '_blank', 'width=600,height=400');
    }
}

// Export functions for global use
window.copyEmailToClipboard = copyEmailToClipboard;
window.shareOnSocial = shareOnSocial;
