const {green, yellow, red} = require("colors/safe");

module.exports = (n) => {
    switch (n % 3) {
        case 0:
            return green;
        case 1:
            return yellow;
        case 2:
            return red;
    }
};