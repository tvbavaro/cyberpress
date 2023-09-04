import { DEVDOMAIN } from "@constants"

export const getNewsPapers = (sort = 'desc') => {
    return fetch(`http://${DEVDOMAIN}/api/newspapers?fields=title&fields=text_preview&fields=time_to_read&fields=createdAt&sort=createdAt:${sort}&populate[image_ultrawide][fields]=formats&populate[image_sq][fields]=formats&populate[image_wide][fields]=formats`)
        .then(res => {
            if (res.status >= 200 && res.status <= 300) {
                return res.json();
            } else throw new Error(res.statusText)
        }).then(res => {
            const dataRes = res;
            const papers = [];
            const { data } = dataRes;
            data.forEach((
                { id,
                    attributes: {
                        createdAt,
                        text_preview,
                        time_to_read,
                        title,
                        image_sq: { data: { attributes: { formats: { category_small: { url: category_small } } } } },
                        image_ultrawide: { data: { attributes: { formats: { category: { url: category } } } } },
                        image_wide: { data: { attributes: { formats: { old: { url: old } } } } }
                    },
                }) => {
                const paperData = {
                    id,
                    createdAt,
                    time_to_read,
                    title,
                    text_preview,
                    img: {
                        category,
                        category_small,
                        old
                    }
                };
                papers.push(paperData);
            });
            return papers;
        })
        .catch(err => console.log(err))
}

export const getPaper = (id) => {
    return fetch(`http://${DEVDOMAIN}/api/newspapers/${id}?fields=title&fields=text_article&fields=time_to_read&fields=createdAt&populate[image_ultrawide][fields]=formats&populate[image_ultrawide][fields]=url&populate=tags`)
        .then(res => {
            if (res.status >= 200 && res.status <= 300) {
                return res.json();
            } else throw new Error(res.statusText)
        })
        .then(res => {
            const { data } = res;
            const { id,
                attributes: {
                    title,
                    createdAt,
                    time_to_read,
                    text_article,
                    tags: { 
                        value: tags 
                    },
                    image_ultrawide: {
                        data: {
                            attributes: { url }
                        }
                    }
                }
            } = data;
            const paperData = {
                id,
                title,
                text_article,
                createdAt,
                time_to_read,
                tags,
                img: {
                    desktop: url
                }
            }
            return paperData;
        })
        .catch(err => console.log(err))
}

export const getRecommended = () => {
    return fetch(`http://${DEVDOMAIN}/api/newspapers?fields=title&fields=text_preview&fields=time_to_read&fields=createdAt&sort=createdAt:desc&populate[image_sq][fields]=formats&pagination[page]=1&pagination[pageSize]=2`);
}

export const getSimilar = (id) => {
    return fetch(`http://${DEVDOMAIN}/api/newspapers/${id}?fields=title&fields=text_preview&fields=time_to_read&fields=createdAt&populate[image_wide][fields]=formats&populate[image_wide][fields]=url`)
}

