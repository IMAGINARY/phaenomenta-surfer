const fullscreenButton = document.getElementById('fullscreen-button');
const fullscreenElement = document.body;

if (document.fullscreenEnabled) {
    fullscreenButton.addEventListener(
        'pointerdown',
        (e) => {
            e.stopImmediatePropagation();
        },
        true,
    );
    fullscreenButton.addEventListener(
        'click',
        () => {
            if (document.fullscreenElement === fullscreenElement) {
                document.exitFullscreen().catch(() => {});
            } else {
                fullscreenElement.requestFullscreen().catch(() => {});
            }
        },
        true,
    );

    const updateFullscreenButton = () => {
        fullscreenButton.classList.remove('expand', 'compress');
        if (document.fullscreenElement === fullscreenElement) {
            fullscreenButton.classList.add('compress');
        } else {
            fullscreenButton.classList.add('expand');
        }
    };

    updateFullscreenButton();
    document.addEventListener('fullscreenchange', updateFullscreenButton);
} else {
    fullscreenButton.style.display = 'none';
}
