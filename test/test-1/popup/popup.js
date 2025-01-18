// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const previewContainer = document.getElementById('preview-container');
    const downloadAllButton = document.getElementById('download-all-button');
    let currentImages = [];

    // Function to update the preview container
    const updatePreview = () => {
        chrome.runtime.sendMessage({ action: 'get_images' }, (response) => {
            currentImages = response.images || [];
            previewContainer.innerHTML = '';

            if (currentImages.length === 0) {
                const noImages = document.createElement('div');
                noImages.className = 'no-images';
                noImages.textContent = 'Click on images in Pinterest to add them here';
                previewContainer.appendChild(noImages);
                downloadAllButton.disabled = true;
                return;
            }

            currentImages.forEach((url, index) => {
                const previewItem = createPreviewItem(url, index);
                previewContainer.appendChild(previewItem);
            });

            downloadAllButton.disabled = false;
        });
    };

    // Function to create a preview item
    const createPreviewItem = (url, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';

        // Create image element
        const img = document.createElement('img');
        img.src = url;
        img.loading = 'lazy';
        img.onerror = () => {
            img.src = 'placeholder.png'; // Add a placeholder image in your extension
            img.alt = 'Failed to load image';
        };

        // Create close button
        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '×';
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            removeImage(url);
        });

        previewItem.appendChild(img);
        previewItem.appendChild(closeButton);

        return previewItem;
    };

    // Function to remove an image
    const removeImage = (url) => {
        chrome.runtime.sendMessage(
            { action: 'remove_image', url },
            () => updatePreview()
        );
    };

    // Handle download all button click
    downloadAllButton.addEventListener('click', () => {
        if (currentImages.length === 0) return;

        downloadAllButton.disabled = true;
        downloadAllButton.textContent = 'Downloading...';

        chrome.runtime.sendMessage(
            { action: 'download_images', images: currentImages },
            (response) => {
                if (response.success) {
                    updatePreview();
                    downloadAllButton.textContent = 'Download All Images';
                }
            }
        );
    });

    // Listen for messages from content script
    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === 'image_added') {
            updatePreview();
        }
    });

    // Initialize preview
    updatePreview();

    // Refresh preview every few seconds to catch new images
    setInterval(updatePreview, 3000);
});
