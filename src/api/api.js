import { DEVDOMAIN } from "@constants"

export const getNewsPapers = (sort = 'desc') => {
    return fetch(`http://${DEVDOMAIN}/api/newspapers?fields=title&fields=text_preview&fields=time_to_read&fields=createdAt&sort=createdAt:${sort}&populate[image_ultrawide][fields]=formats&populate[image_sq][fields]=formats&populate[image_wide][fields]=formats`)
}

export const getPaper = (id) => {
    return fetch(`http://${DEVDOMAIN}/api/newspapers/${id}?fields=title&fields=text_article&fields=time_to_read&fields=createdAt&populate[image_ultrawide][fields]=formats&populate[image_ultrawide][fields]=url&populate=tags`)
}

export const getRecommended = () => {
    return fetch(`http://${DEVDOMAIN}/api/newspapers?fields=title&fields=text_preview&fields=time_to_read&fields=createdAt&sort=createdAt:desc&populate[image_sq][fields]=formats&pagination[page]=1&pagination[pageSize]=2`);
}

export const getSimilar = (id) => {
    return fetch(`http://${DEVDOMAIN}/api/newspapers/${id}?fields=title&fields=text_preview&fields=time_to_read&fields=createdAt&populate[image_wide][fields]=formats&populate[image_wide][fields]=url`)
}

