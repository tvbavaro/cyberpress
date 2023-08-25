import { DEVDOMAIN } from "@constants"

export const getNewsPapers = (sort = 'desc') => {
    return fetch(`http://${DEVDOMAIN}/api/newspapers?fields=title&fields=text_preview&fields=time_to_read&sort=createdAt:${sort}&populate[image_ultrawide][fields]=formats&populate[image_sq][fields]=formats&populate[image_wide][fields]=formats`)
}

//http://localhost:1337/api/newspapers?fields[0]=title&fields[1]=text_preview&fields[2]=time_to_read&sort[0]=createdAt:desc

