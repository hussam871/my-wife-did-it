const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldSwipe = `        let touchstartX = 0;
        let touchendX = 0;
        
        function handleSwipe() {
            const swipeThreshold = 50; // Minimum distance to be considered a swipe
            if (touchstartX - touchendX > swipeThreshold) {
                // Swipe left = Next
                nextPage();
            }
            if (touchendX - touchstartX > swipeThreshold) {
                // Swipe right = Previous
                prevPage();
            }
        }

        document.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
        }, { passive: true });

        document.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });`;

const newSwipe = `        let touchstartX = 0;
        let touchendX = 0;
        let touchstartY = 0;
        let touchendY = 0;
        
        function handleSwipe() {
            const swipeThresholdX = 50; // Minimum horizontal distance
            const swipeThresholdY = 50; // Maximum vertical distance to still count as horizontal swipe

            const diffX = touchstartX - touchendX;
            const diffY = Math.abs(touchstartY - touchendY);

            // Check if horizontal swipe is greater than threshold and vertical swipe is small
            if (Math.abs(diffX) > swipeThresholdX && diffY < swipeThresholdY) {
                if (diffX > 0) {
                    // Swipe left = Next
                    nextPage();
                } else {
                    // Swipe right = Previous
                    prevPage();
                }
            }
        }

        document.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
            touchstartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            touchendY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });`;

html = html.replace(oldSwipe, newSwipe);
fs.writeFileSync('index.html', html);
console.log('Swipe patched.');
