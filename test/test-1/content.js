// content.js

// Utility functions for image URL processing
const imageUtils = {
    // Get the highest quality version of an image URL
    getHighQualityUrl(url) {
        if (!url) return null;

        // For Pinterest, try to get original quality
        if (url.includes('pinterest.com')) {
            // Remove existing size parameters
            url = url.replace(/\/\d+x\//, '/');
            // Try to upgrade to original quality
            return url.replace(/\/\d+x\//, '/originals/');
        }

        return url;
    },

    // Extract the best image URL from an element
    extractBestImageUrl(element) {
        // If element is an image, check its attributes
        if (element.tagName === 'IMG') {
            // Check various image source attributes in order of preference
            const possibleSources = [
                element.dataset.highresSource,
                element.dataset.pinMediaUrl,
                element.dataset.src,
                element.src
            ];

            // Return the first valid URL found
            for (const source of possibleSources) {
                if (source) {
                    return this.getHighQualityUrl(source);
                }
            }
        }
        return null;
    },

    // Find the best image URL from an element or its parents/children
    findBestImageUrl(element) {
        // First check if the clicked element is an image
        let imageUrl = this.extractBestImageUrl(element);
        if (imageUrl) return imageUrl;

        // Check if there's an image in the immediate children
        const childImg = element.querySelector('img');
        if (childImg) {
            imageUrl = this.extractBestImageUrl(childImg);
            if (imageUrl) return imageUrl;
        }

        // Look for parent elements that might contain the image
        let parent = element.closest('[data-test-id="pin-container"], [data-test-id="pinrep-image"], .pinWrapper');
        if (parent) {
            const parentImg = parent.querySelector('img');
            if (parentImg) {
                imageUrl = this.extractBestImageUrl(parentImg);
                if (imageUrl) return imageUrl;
            }
        }

        return null;
    }
};

// Click handler for image selection
document.addEventListener('click', (event) => {
    // Find the clicked element
    let target = event.target;
    let imageUrl = null;

    // Try to find an image URL from the clicked element or its context
    imageUrl = imageUtils.findBestImageUrl(target);

    // If we found a valid image URL, send it to the background script
    if (imageUrl) {
        chrome.runtime.sendMessage({
            action: "add_image",
            url: imageUrl
        });
    }
}, true); // Use capturing to ensure we get the click first
