window.addEventListener('keydown', (e) => {
    const key = document.querySelector(`[data-key="${e.key}"]`);
    if(key === null) return;
    playSound(key);
})

const keyboard = document.querySelector('.keyboard-body');
keyboard.addEventListener('click', (e) => {
    const key = e.target.closest('.key');
    if(key === null) return;
    playSound(key);
})

const playSound = (key) => {
    const audio = document.querySelector(`[data-key-audio="${key.dataset.key}"]`);
    audio.play();
    audio.currentTime = 0;

    key.classList.add('pressed');
    key.addEventListener('transitionend', () => {
        key.classList.remove('pressed');
    })
}

const toggleKeynotes = document.querySelector('#toggle');
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

toggleKeynotes.addEventListener('input', () => {
    const isToggled = toggleKeynotes.checked;
    console.log(isToggled)
    toggleLabel.firstElementChild.textContent = isToggled ? 'YES' : 'NO';
    document.querySelectorAll('.key').forEach((key, index) => {
        key.firstElementChild.textContent = isToggled ? keysValues[index][0] : keysValues[index][1];
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const getAngle = (e, element) => {
        const rect = element.getBoundingClientRect();
        const center = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
        return Math.atan2(e.clientY - center.y, e.clientX - center.x) * 180 / Math.PI;
    };

    const dial = document.querySelector('.dial');
    const volumeMeter = document.querySelector('#volume');
    const audioTags = document.querySelectorAll('audio');

    let isDragging = false;
    let currentAngle = 360;
    const minAngle = 80;
    const maxAngle = 360;

    const updateDial = (angle) => {
        currentAngle = Math.max(minAngle, Math.min(maxAngle, angle));
        dial.style.transform = `rotate(${currentAngle}deg)`;

        let percent = Math.round(((currentAngle - minAngle) / (maxAngle - minAngle)) * 100);
        percent = Math.max(0, Math.min(100, percent));
        volumeMeter.textContent = String(percent).padStart(2, '0') + '%';

        audioTags.forEach(audio => {
            audio.volume = percent / 100;
        });
    };

    dial.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const angle = getAngle(e, dial);
        let normalizedAngle = (angle + 360) % 360;

        if (normalizedAngle >= minAngle && normalizedAngle <= maxAngle) {
            updateDial(normalizedAngle);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    updateDial(360);
});

const tabs = [
    {
        title: 'Megalovania',
        tab: `WWOY 6TR WRT QQOY 6TR WRT`
    },
    {
        title: 'Happy Birthday',
        tab: `QQWQ RE QQWQ TR<br>QQIYREW 77YRTR`
    },
    {
        title: 'Twinkle Twinkle Little Star',
        tab: 'QQ TT YY T RR EE WW Q'
    },
    {
        title: 'Sound of Silence',
        tab: `WWRRYYT QQQEETTR<br>RRRYYIO OI RRRYYIO O`
    },
    {
        title: 'Tetris Theme',
        tab: `PUIOIUY YIPOIU UIOPIY`
    },
    {
        title: 'Zelda\'s Lullaby',
        tab: `ETW QWETW ETO IT REWE`
    },
    {
        title: 'Blue Bird',
        tab: `EYUI UY EYUI OIOP<br>EYUI UY YPOYPO TTYY`
    },
    {
        title: 'Bella Ciao',
        tab: `EYUIY EYUIY EYUI UYI UYPPP`
    },
    {
        title: 'Gravity Falls Theme',
        tab: `WERE YTYQ WERE TYTR<br>RRRYYTR YYYTYTR RRRYYTR<br>YYY 999 RRRYYTR 777TIY9`
    },
    {
        title: 'Once Upon a December',
        tab: `ERE TRW RWEQWE ERE EYW RWEQWE<br>UIU OIY IYUTYU UIU UPY IYUTYU`
    },
    {
        title: 'Ode To Joy',
        tab: `EERTTREW QQWEE WW<br>EERTTREW QQWEW QQ<br>WWEQW ERE QW EREWQW<br>EERTTREW QQWEW QQ`
    },
    {
        title: 'Harry Potter Theme',
        tab: `EYIUYPOU YIU67E`
    },
    {
        title: 'Saria’s Song',
        tab: `RYU RYU RYU PO UIU TE WETE<br>RYU RYU RYU PO UIP UT UTWE`
   }
]

const tabSheets = document.querySelector('.tabs');
const toggleTabs = document.querySelector('#toggle-modal');
tabSheets.innerHTML = tabs.map((tab) => {
    return `
            <div class="tab">
                <h3>${tab.title}</h3>
                <p>${tab.tab}</p>
            </div>
           `
}).join('');

toggleTabs.addEventListener('click', () => {
    toggleTabs.classList.toggle('pressed');
    tabSheets.classList.toggle('closed');
})