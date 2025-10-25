const ic_dic = {
    '⸢': [90, 180],
    '⸣': [270, 180],
    '⸤': [0, 90],
    '⸥': [0, 270],
    '|': [0, 180],
    '--': [90, 270],
    '<-': [315, 315],
    '->': [90, 90]
}

const oc_dic = {
    '0': [
        '⸢', '--', '⸣',
        '|', '<-', '|',
        '|', '<-', '|',
        '⸤', '--', '⸥'
    ], 

    '1': [
        '<-', '--', '⸣',
        '<-', '<-', '|',
        '<-', '<-', '|',
        '<-', '<-', '|',
    ],

    '2': [
        '⸢', '--', '⸣',
        '<-', '<-', '|',
        '⸢', '--', '⸥',
        '⸤', '--', '--'
    ],

    '3': [
        '⸢', '--', '⸣',
        '<-', '<-', '|',
        '->', '--', '|',
        '⸤', '--', '⸥'
    ],

    '4': [
        '|', '<-', '|',
        '|', '<-', '|',
        '⸤', '--', '|',
        '<-', '<-', '|'
    ],

    '5': [
        '⸢', '--', '--',
        '⸤', '--', '⸣',
        '<-', '<-', '|',
        '⸤', '--', '⸥'
    ],

    '6': [
        '⸢', '--', '--',
        '|', '<-', '<-',
        '|', '--', '⸣',
        '⸤', '--', '⸥'
    ],

    '7': [
        '⸢', '--', '⸣',
        '<-', '<-', '|',
        '<-', '<-', '|',
        '<-', '<-', '|',
    ],

    '8': [
        '⸢', '--', '⸣',
        '|', '--', '|',
        '|', '<-', '|',
        '⸤', '--', '⸥'
    ],

    '9': [
        '⸢', '--', '⸣',
        '|', '<-', '|',
        '⸤', '--', '|',
        '⸤', '--', '⸥'
    ],
}

function returnClockHands(num) {
    let value_pairs = [];

    let symbols = oc_dic[num];
    symbols.forEach(element => {
        let value_pair = ic_dic[element];
        value_pairs.push(value_pair);
    });
    return value_pairs;
}

function setClockhands(clocks, value_pairs) {
    clocks.forEach((clock, index) => {
        const hands = clock.querySelectorAll('.clockhand');
        const pair = value_pairs[index] || [];

        hands.forEach((hand, i) => {
            const deg_value = pair[i];
            if (deg_value == null) return;
            hand.style.setProperty('--deg', `${deg_value}deg`);
        });
    });
}

function GetCurrentTime() {
    const now = new Date();
    return {
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds()
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const outerClocks = document.querySelectorAll('.num');

    function updateAll() {
        const { hours, minutes, seconds } = GetCurrentTime();
        const h = String(hours).padStart(2, '0');
        const m = String(minutes).padStart(2, '0');
        const s = String(seconds).padStart(2, '0');

        const digits = (h + m + s).split(''); // ["H1","H2","M1","M2","S1","S2"]

        outerClocks.forEach((outerClock, i) => {
            const digit = digits[i];
            if (digit == null) return; // ignore extra .oc elements
            const clocks = outerClock.querySelectorAll('.ic');
            const value_pairs = returnClockHands(digit);
            setClockhands(clocks, value_pairs);
        });
    }

    updateAll(); // initial render
    setInterval(updateAll, 1000); // update every second
});