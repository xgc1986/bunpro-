(function () {
    window.addEventListener('keydown', (e) => {
        if (e.code === "Enter") {
            setTimeout(() => {
                const audio = document.querySelector('audio');
                if (audio) {
                    audio.play();
                }
            }, 200);
        }

        if (e.code === 'ControlRight') {
            const audio = document.querySelector('audio');
            if (audio) {
                audio.play();
            }
        }

        if (e.code === 'Backspace') {
            const retry = document.querySelector('.ignore_btn ');
            if (retry) {
                retry.click();
            }
        }
    });
})();