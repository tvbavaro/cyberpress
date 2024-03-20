export function debounce(func, delay = 500, context) {
    return function perform(...args) {
        let previousCall = context.lastCall;
        context.lastCall = Date.now()
        if (previousCall && context.lastCall - previousCall <= delay) {
            clearTimeout(context.lastCallTimer)
        }
        context.lastCallTimer = setTimeout(() => func(...args), delay)
    }
}

export function getImgSize(img, indx, old = false, paper = false) {
    const ultraWideIndx = [0, 7, 8, 9, 10];
    if(old) {
        return {
            width: img.old.width,
            height: img.old.height
        } 
    }
    if(paper) {
        return {
            width: img.width,
            height: img.height
        }
    }
    if (ultraWideIndx.includes(indx)) {
        return {
            width: img.category.width,
            height: img.category.height
        }
    } else {
        return {
            width: img.category_small.width,
            height: img.category_small.height
        }
    }
}

export function handleRedirect(pageName) {
    console.log(pageName)
    if (pageName === 'Contacts') {
        showContacts();
    } else this.$router.push({ name: pageName.toLowerCase() });
}

export function closeAllModals() {
    for (let key in this.togglers) {
        if (this.togglers[key]) {
            this.togglers[key] = false;
        }
    }
}

function showContacts() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}