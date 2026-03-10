addListeners();

function addListeners() {
    const animaster_instance = animaster();
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster_instance.fadeIn(block, 5000);
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster_instance.move(block, 1000, {x: 100, y: 10});
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster_instance.scale(block, 1000, 1.25);
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster_instance.fadeOut(block, 1000);
        });

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            animaster_instance.moveAndHide(block, 1000);
        });

    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animaster_instance.showAndHide(block, 1000);
        });

    document.getElementById('resetFadeinPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('resetFadeinBlock');
            animaster_instance.resetFadein(block, 1000);
        });

    document.getElementById('resetFadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('resetFadeOutBlock');
            animaster_instance.resetFadeOut(block, 1000);
        })
    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            animaster_instance.heartBeating(block, 1000);
        })

}

function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}

function scale(element, duration, ratio) {
    element.style.transitionDuration = `${duration}ms`;
    element.style.transform = getTransform(null, ratio);
}

function move(element, duration, translation) {
    element.style.transitionDuration = `${duration}ms`;
    element.style.transform = getTransform(translation, null);
}

function fadeIn(element, duration) {
    element.style.transitionDuration = `${duration}ms`;
    element.classList.remove('hide');
    element.classList.add('show');
}

function fadeOut(element, duration) {
    element.style.transitionDuration = `${duration}ms`;
    element.classList.remove('show');
    element.classList.add('hide');
}

function moveAndHide(element, duration) {
    const moveTime = duration * 2 / 5;
    const fadeTime = duration - moveTime;
    const translation = {
        x: 100,
        y: 20
    }
    move(element, moveTime, translation);
    fadeOut(element, fadeTime);
}

function showAndHide(element, duration){
    fadeIn(element, duration / 3);
    setTimeout(() => fadeOut(element,duration / 3), duration * 2 / 3);
}

function resetFadein(element){
    element.style.transitionDuration = null;
    element.classList.remove('show');
    element.classList.add('hide');
}

function resetFadeOut(element){
    element.style.transitionDuration = null;
    element.classList.remove('hide');
    element.classList.add('show');
}

function heartBeating(element) {
    let isActive = true;

    function beat() {
        if (!isActive) return;

        scale(element, 500, 1.4);

        setTimeout(() => {
            if (!isActive) return;

            scale(element, 500, 1);

            setTimeout(() => {
                if (!isActive) return;
                beat();
            }, 500);
        }, 500);
    }

    beat();

    return {
        stop: function() {
            isActive = false;
        }
    };
}


function animaster() {
    return {
        scale: scale,
        move: move,
        fadeIn: fadeIn,
        fadeOut: fadeOut,
        moveAndHide: moveAndHide,
        showAndHide: showAndHide,
        resetFadein: resetFadein,
        resetFadeOut: resetFadeOut,
        heartBeating: heartBeating
    };
}
