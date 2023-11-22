export function debounce(func, delay, context) {
    return function perform(...args) {
        let previousCall = context.lastCall;
        context.lastCall = Date.now()
        if (previousCall && context.lastCall - previousCall <= delay) {
            clearTimeout(context.lastCallTimer)
        }
        context.lastCallTimer = setTimeout(() => func(...args), delay)
    }
}