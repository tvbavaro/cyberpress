import { PAGE_NAMES } from '@router/routes';
import { ICONS } from '@icons';

export const isString = (value) => {
    if (typeof value === 'string') {
        return true;
    }
}

export const isNumber = (value) => {
    if (typeof value === 'number') {
        return true;
    }
}

export const isBoolean = (value) => {
    if (typeof value === 'boolean') {
        return true;
    }
}

export const isArray = (value) => {
    if (Array.isArray(value)) {
        return true;
    }
}

export const isObject = (value) => {
    if (typeof value === 'object') {
        return true;
    }
}

export const isFunction = (fn) => {
    if (typeof fn === 'function') {
        return true;
    } 
}

export const isValidPage = (page) => {
    if(PAGE_NAMES.includes(page.toLowerCase())) {
        return true;
    }
}

export const isValidIcon = (icon) => {
    if(ICONS[icon]) {
        return true;
    }
}

