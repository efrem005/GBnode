const { yellow, red } = require("colors/safe")
const isPrime = require("./modules/isPrime.js")
const getColor = require("./modules/getColor.js")

let count = 0;
const from = process.argv[2];
const to = process.argv[3];

if (!(isFinite(from) && isFinite(to))) {
    console.error(red("Входные параметры должны быть числами!!!"));
    process.exit(1);
}

for (let i = from; i <= to; i++) {
    if (isPrime(i)) {
        const paint = getColor(count);
        console.log(paint(i));
        count++;
    }
}

if (!count) {
    console.log(yellow(`В диапазоне ${from} - ${to} нет простых чисел!`));
}