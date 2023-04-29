export const whiteSpace = (message) => {
    return {
        required: true,
        message,
        whitespace: true
    }
}
export const noWhitespace = (message) => {
    return {
        required: true,
        message,
    }
}