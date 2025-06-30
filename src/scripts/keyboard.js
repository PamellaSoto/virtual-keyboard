let keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener(('mousedown'), () => {
        playNote(key);      
        key.classList.add('pressed');
    });
    key.addEventListener('mouseup', () => {
        key.classList.remove('pressed');
    });
    key.addEventListener('mouseenter', () => {
        key.classList.remove('pressed');
    });
});
const toggleKeysTags = document.querySelector('#toggle');
const toggleLabel = document.querySelector('.mode label');
const keysValues = [
    ['C#', '2'],
    ['D#', '3'],
    ['F#', '5'],
    ['G#', '6'],
    ['A#', '7'],
    ['C#', '9'],
    ['D#', '0'],

    ['C', 'Q'],
    ['D', 'W'],
    ['E', 'E'],
    ['F', 'R'],
    ['G', 'T'],
    ['A', 'Y'],
    ['B', 'U'],
    ['C', 'I'],
    ['D', 'O'],
    ['E', 'P']
];

toggleKeysTags.addEventListener('input', () => {
    const mode = toggleKeysTags.checked;
    toggleLabel.firstElementChild.textContent = mode ? 'YES' : 'NO';
    keys.forEach((key, index) => {
        key.firstElementChild.textContent = mode ? keysValues[index][0] : keysValues[index][1];
    });
});

function playWithKeyboard(key) {
    
    
}

function playNote(key) {
    let isPlaying = true;
    let note = key.querySelector('.note');
    if (key.click && !isPlaying) {
        key.classList.remove('pressed');
        note.pause();
    } else if (key.click && isPlaying) {
        note.currentTime = 0;
        note.play();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const dial = document.querySelector('.dial');
    const volumeMeter = document.querySelector('#volume');    

    let isDragging = false;
    let startAngle = 0;
    let currentAngle = 270;
    let minAngle = 0;
    let maxAngle = 270;
    
    dial.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;
        startAngle = getAngle(e, dial);
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const angle = getAngle(e, dial);
        const diff = angle - startAngle;
        currentAngle += diff;
        
        currentAngle = Math.max(minAngle, Math.min(maxAngle, currentAngle));
        dial.style.transform = `rotate(${currentAngle}deg)`;
        
        let percent = Math.round((currentAngle / maxAngle) * 100);
        percent = Math.max(0, Math.min(100, percent));
        volumeMeter.textContent = String(percent).padStart(2, '0') + '%';
        
        startAngle = angle;

        
        let audioTags = document.querySelectorAll('audio');
        audioTags.forEach((audio) => {
            audio.volume = (percent / 100);
        });
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    function getAngle(e, element) {
        const rect = element.getBoundingClientRect();
        const center = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
        return Math.atan2(e.clientY - center.y, e.clientX - center.x) * 180 / Math.PI;
    }
});