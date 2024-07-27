chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const player = document.getElementById("my-player");
    const originalPlayerStyle = player.style.cssText;

    function enterFullscreen() {
        const wrapper = document.querySelector(".main.wrapper");
        if (wrapper) {
            wrapper.style.zIndex = "9999";
        }

        player.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 999;
            width: 100vw;
            height: 100vh;
            border: none;
            background: #1f1f1f;
        `;

        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        const processVideo = async () => {
            const progresBar = document.querySelector(".vjs-play-progress.vjs-slider-bar");
            const skipIntroButton = document.querySelector(".vjs-overlay-skip-intro");

            if (progresBar && progresBar.style.width === "0%") {
                const playButton = document.querySelector(".vjs-play-control");
                if (playButton) {
                    playButton.click();
                }
            }

            if (skipIntroButton && !skipIntroButton.classList.contains("vjs-hidden")) {
                skipIntroButton.click();
            }
        
            if (progresBar && progresBar.style.width === "100%") {
                const skipButton = document.querySelector(".vjs-next-episode button");
                if (skipButton) {
                    skipButton.click();
                }
            }
        
            await new Promise(resolve => setTimeout(resolve, 4000));
        
            processVideo(); 
        };
        processVideo();
    }

    function exitFullscreen() {
        player.style.cssText = originalPlayerStyle;
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
    }

    if (request.action === "runScript") {
        enterFullscreen();
    }

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'F11':
                // Optionally handle F11 key if needed
                break;
            case 'Escape':
                exitFullscreen();
                break;
        }
    });
});