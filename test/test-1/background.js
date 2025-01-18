// background.js
let selectedImages = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.action) {
        case "add_image":
            if (!selectedImages.includes(message.url)) {
                selectedImages.push(message.url);
            }
            break;

        case "get_images":
            sendResponse({ images: selectedImages });
            break;

        case "remove_image":
            selectedImages = selectedImages.filter(url => url !== message.url);
            break;

        case "download_images":
            message.images.forEach(url => {
                chrome.downloads.download({ url: url });
            });
            selectedImages = []; // Clear after download
            sendResponse({ success: true });
            break;
    }
    return true; // Keep message channel open for async responses
});

// In background.js, add:
// chrome.action.onClicked.addListener((tab) => {
//     chrome.tabs.sendMessage(tab.id, { action: 'show_panel' });
// });
