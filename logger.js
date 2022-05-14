const DECORATION = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
}
const COLOR = {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
}
const BACKGROUND_COLOR = {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
}

/**
 * @typedef {keyof DECORATION} DecorationMap
 * @typedef {keyof COLOR} ColorMap
 * @typedef {keyof BACKGROUND_COLOR} BackgroundColorMap
 * @typedef {{
 *  text: string,
 *  decoration?: keyof DECORATION,
 *  color?: keyof COLOR,
 *  backgroundColor?: keyof BACKGROUND_COLOR,
 *  pre?: string,
 * }} StyledLogType
 * @param {StyledLogType} param
 * @returns
 */
function getStyledLogString({
    text,
    decoration,
    color,
    backgroundColor,
    pre = " "
}) {
    if (!text) {
        return ""
    }
    let styleStr = ""
    if (decoration) {
        styleStr += DECORATION[decoration]
    }
    if (color) {
        styleStr += COLOR[color]
    }
    if (backgroundColor) {
        styleStr += BACKGROUND_COLOR[backgroundColor]
    }
    return `${styleStr}${pre}${text}${DECORATION.reset}`
}

/**
 * @typedef {{[text: string]: Omit<StyledLogType, "text">}} StyledLogMapType
 * @param {StyledLogMapType} logs
 */
module.exports = function logGracefully(logs = {}) {
    const logStr = Object.keys(logs).map(text => getStyledLogString({ text, ...logs[text] }));
    console.log(logStr.join(""));
}
