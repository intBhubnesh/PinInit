// // content-panel.js

// // Create and inject floating panel HTML
// const injectFloatingPanel = () => {
//     const panel = document.createElement('div');
//     panel.id = 'pinterest-downloader-panel';
//     panel.innerHTML = `
//         <div class="pd-panel-header">
//             <h2>Pinterest Image Downloader</h2>
//             <button id="pd-minimize-btn" title="Minimize">−</button>
//             <button id="pd-close-btn" title="Close">×</button>
//         </div>
//         <div class="pd-panel-content">
//             <div id="pd-preview-container"></div>
//             <button id="pd-download-btn" disabled>Download All Images</button>
//         </div>
//     `;
//     document.body.appendChild(panel);

//     // Add drag functionality
//     makeElementDraggable(panel);
//     setupPanelControls();
//     return panel;
// };

// // Make the panel draggable
// const makeElementDraggable = (element) => {
//     const header = element.querySelector('.pd-panel-header');
//     let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

//     header.onmousedown = dragMouseDown;

//     function dragMouseDown(e) {
//         e.preventDefault();
//         pos3 = e.clientX;
//         pos4 = e.clientY;
//         document.onmouseup = closeDragElement;
//         document.onmousemove = elementDrag;
//     }

//     function elementDrag(e) {
//         e.preventDefault();
//         pos1 = pos3 - e.clientX;
//         pos2 = pos4 - e.clientY;
//         pos3 = e.clientX;
//         pos4 = e.clientY;

//         // Set new position
//         element.style.top = (element.offsetTop - pos2) + "px";
//         element.style.left = (element.offsetLeft - pos1) + "px";
//     }

//     function closeDragElement() {
//         document.onmouseup = null;
//         document.onmousemove = null;
//     }
// };

// // Setup panel controls
// const setupPanelControls = () => {
//     const panel = document.getElementById('pinterest-downloader-panel');
//     const minimizeBtn = document.getElementById('pd-minimize-btn');
//     const closeBtn = document.getElementById('pd-close-btn');
//     const content = panel.querySelector('.pd-panel-content');

//     // Minimize functionality
//     minimizeBtn.addEventListener('click', () => {
//         content.classList.toggle('pd-minimized');
//         minimizeBtn.textContent = content.classList.contains('pd-minimized') ? '+' : '−';
//     });

//     // Close functionality
//     closeBtn.addEventListener('click', () => {
//         panel.remove();
//     });
// };

// // Update preview container
// const updatePreview = () => {
//     chrome.runtime.sendMessage({ action: 'get_images' }, (response) => {
//         const container = document.getElementById('pd-preview-container');
//         const downloadBtn = document.getElementById('pd-download-btn');

//         if (!container) return;

//         container.innerHTML = '';
//         const images = response.images || [];

//         if (images.length === 0) {
//             container.innerHTML = '<div class="pd-no-images">Click on images to add them here</div>';
//             downloadBtn.disabled = true;
//             return;
//         }

//         images.forEach(url => {
//             const previewItem = document.createElement('div');
//             previewItem.className = 'pd-preview-item';
//             previewItem.innerHTML = `
//                 <img src="${url}" alt="Preview">
//                 <button class="pd-remove-btn" data-url="${url}">×</button>
//             `;
//             container.appendChild(previewItem);
//         });

//         downloadBtn.disabled = false;

//         // Add remove functionality
//         container.querySelectorAll('.pd-remove-btn').forEach(btn => {
//             btn.onclick = () => {
//                 chrome.runtime.sendMessage({
//                     action: 'remove_image',
//                     url: btn.dataset.url
//                 }, updatePreview);
//             };
//         });
//     });
// };

// // Initialize panel
// const initializePanel = () => {
//     injectFloatingPanel();
//     updatePreview();

//     // Setup download button
//     document.getElementById('pd-download-btn').addEventListener('click', () => {
//         chrome.runtime.sendMessage({ action: 'get_images' }, (response) => {
//             if (response.images?.length) {
//                 chrome.runtime.sendMessage({
//                     action: 'download_images',
//                     images: response.images
//                 }, updatePreview);
//             }
//         });
//     });
// };

// // Listen for new images being added
// chrome.runtime.onMessage.addListener((message) => {
//     if (message.action === 'image_added') {
//         updatePreview();
//     }
// });

// // Initialize when the extension button is clicked
// chrome.runtime.onMessage.addListener((message) => {
//     if (message.action === 'show_panel') {
//         const existingPanel = document.getElementById('pinterest-downloader-panel');
//         if (!existingPanel) {
//             initializePanel();
//         }
//     }
// });
