//=== sample for refactoring 
// async function fetchData(url) {
//     try {
//         let response = await fetch(url);
//         let data = await response.json();
//         return data;
//     } catch (error) {
//         throw new Error('Error loading data');
//     }
// }

// async function loadData() {
//     try {
//         let data = await fetchData('https://api.example.com/data');
//         console.log('Data loaded successfully:', data);
//     } catch (error) {
//         console.error('Error loading data:', error);
//     }
// }

// loadData();

//=========
// function fetchData() {
//     return fetch('https://api.example.com/data')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to fetch data');
//             }
//             return response.json();
//         });
// }

// async function processData() {
//     try {
//         const data = await fetchData();
//         console.log('Data loaded successfully:', data);
//     } catch (error) {
//         console.error('Error:', error.message);
//     }
// }

// processData();

import { END_POINT_DEVDOMAIN } from "@constants"
import qs from 'qs'

export const getNewsPapers = (searchPhrase = '', searchTag = [], categoryName = [], sort = 'desc') => {
    const query = qs.stringify(
        {
            fields: ['title', 'text_preview', 'time_to_read', 'createdAt'],
            sort: [`updatedAt:${sort}`],
            pagination: {
                pageSize: 23,
                //page: 1,
            },
            filters: {
                $or: [
                    {
                        title: {
                            $contains: searchPhrase,
                        },
                    },
                    {
                        text_article: {
                            $contains: searchPhrase,
                        },
                    },
                ],
                tags: {
                    value: {
                        $contains: searchTag
                    }
                },
                categories: {
                    categoryname: {
                        //$contains: categoryName,
                        $in: categoryName
                    }
                }
            },
            populate: {
                image_ultrawide: {
                    fields: ['formats']
                },
                image_sq: {
                    fields: ['formats']
                },
                image_wide: {
                    fields: ['formats']
                },
                //categories: true
            },
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    );
    return fetch(`${END_POINT_DEVDOMAIN}/api/newspapers?${query}`)
        .then(res => {
            if (res.status >= 200 && res.status <= 300) {
                return res.json();
            } else throw new Error(res.statusText)
        }).then(res => {
            const papers = [];
            const { data } = res;
            data.forEach((
                { id,
                    attributes: {
                        createdAt,
                        text_preview,
                        time_to_read,
                        title,
                        image_sq: {
                            data: {
                                attributes: {
                                    formats: {
                                        category_small: {
                                            url: category_small_url,
                                            width: category_small_width,
                                            height: category_small_height
                                        },
                                        category_small_tablet: {
                                            url: category_small_tablet_url,
                                            width: category_small_tablet_width,
                                            height: category_small_tablet_height
                                        },
                                        category_small_mobile: {
                                            url: category_small_mobile_url,
                                            width: category_small_mobile_width,
                                            height: category_small_mobile_height
                                        }
                                    }
                                }
                            }
                        },
                        image_ultrawide: {
                            data: {
                                attributes: {
                                    formats: {
                                        category: {
                                            url: category_url,
                                            width: category_width,
                                            height: category_height
                                        },
                                        category_tablet: {
                                            url: category_tablet_url,
                                            width: category_tablet_width,
                                            height: category_tablet_height
                                        },
                                        category_mobile: {
                                            url: category_mobile_url,
                                            width: category_mobile_width,
                                            height: category_mobile_height
                                        }
                                    }
                                }
                            }
                        },
                        image_wide: {
                            data: {
                                attributes: {
                                    formats: {
                                        old: {
                                            url: old_url,
                                            width: old_width,
                                            height: old_height
                                        },
                                        old_tablet: {
                                            url: old_tablet_url,
                                            width: old_tablet_width,
                                            height: old_tablet_height
                                        },
                                        old_mobile: {
                                            url: old_mobile_url,
                                            width: old_mobile_width,
                                            height: old_mobile_height
                                        }
                                    }
                                }
                            }
                        }
                    },
                }) => {
                const paperData = {
                    id,
                    createdAt,
                    time_to_read,
                    title,
                    text_preview,
                    img: {
                        desktop: {
                            category: {
                                url: category_url,
                                width: category_width,
                                height: category_height
                            },
                            category_small: {
                                url: category_small_url,
                                width: category_small_width,
                                height: category_small_height
                            },
                            old: {
                                url: old_url,
                                width: old_width,
                                height: old_height
                            },
                        },
                        tablet: {
                            category: {
                                url: category_tablet_url,
                                width: category_tablet_width,
                                height: category_tablet_height
                            },
                            category_small: {
                                url: category_small_tablet_url,
                                width: category_small_tablet_width,
                                height: category_small_tablet_height
                            },
                            old: {
                                url: old_tablet_url,
                                width: old_tablet_width,
                                height: old_tablet_height
                            },
                        },
                        mobile: {
                            category: {
                                url: category_mobile_url,
                                width: category_mobile_width,
                                height: category_mobile_height
                            },
                            category_small: {
                                url: category_small_mobile_url,
                                width: category_small_mobile_width,
                                height: category_small_mobile_height
                            },
                            old: {
                                url: old_mobile_url,
                                width: old_mobile_width,
                                height: old_mobile_height
                            }
                        }
                    },
                };
                papers.push(paperData);
            });
            return papers;
        })
        .catch(err => console.log(err))
}

export const getPaper = (id) => {
    const query = qs.stringify(
        {
            fields: ['title', 'text_article', 'time_to_read', 'createdAt'],
            populate: {
                image_ultrawide: {
                    fields: ['url', 'width', 'height', 'formats']
                },
                categories: {
                    fields: ['categoryname']
                },
                tags: true
            },
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    );
    return fetch(`${END_POINT_DEVDOMAIN}/api/newspapers/${id}?${query}`)
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
                            attributes: {
                                url,
                                width,
                                height,
                                formats: {
                                    article_tablet: {
                                        url: tablet_url,
                                        width: tablet_width,
                                        height: tablet_height
                                    },
                                    article_mobile: {
                                        url: mobile_url,
                                        width: mobile_width,
                                        height: mobile_height
                                    }
                                },
                            }
                        }
                    },
                    categories: {
                        data: categoriesData
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
                    desktop: {
                        url,
                        width,
                        height
                    },
                    tablet: {
                        url: tablet_url,
                        width: tablet_width,
                        height: tablet_height
                    },
                    mobile: {
                        url: mobile_url,
                        width: mobile_width,
                        height: mobile_height
                    }
                },
                categories: categoriesData.map(cat => cat.attributes.categoryname)
            }
            return paperData;
        })
        .catch(err => console.log(err));
}

export const getRecommended = (paperId = 0, searchTag = [], sort = 'desc') => {
    const query = qs.stringify(
        {
            fields: ['title', 'text_preview', 'time_to_read', 'createdAt'],
            sort: [`createdAt:${sort}`],
            pagination: {
                pageSize: 2,
                page: 1,
            },
            filters: {
                tags: {
                    value: {
                        $contains: searchTag
                    }
                },
                id: {
                    $ne: paperId
                }
            },
            populate: {
                image_sq: {
                    fields: ['formats', 'width', 'height']
                },
            },
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    );
    return fetch(`${END_POINT_DEVDOMAIN}/api/newspapers?${query}`)
        .then(res => {
            if (res.status >= 200 && res.status <= 300) {
                return res.json();
            } else throw new Error(res.statusText)
        })
        .then(res => {
            const papersRec = [];
            const { data } = res;
            data.forEach((
                { id,
                    attributes: {
                        createdAt,
                        text_preview,
                        time_to_read,
                        title,
                        image_sq: {
                            data: {
                                attributes: {
                                    formats: {
                                        aside: {
                                            url: aside_desktop_url,
                                            width: aside_desktop_width,
                                            height: aside_desktop_height
                                        },
                                        aside_tablet: {
                                            url: aside_tablet_url,
                                            width: aside_tablet_width,
                                            height: aside_tablet_height
                                        },
                                        aside_mobile: {
                                            url: aside_mobile_url,
                                            width: aside_mobile_width,
                                            height: aside_mobile_height
                                        }
                                    }
                                }
                            }
                        },
                    },
                }) => {
                const paperData = {
                    id,
                    createdAt,
                    time_to_read,
                    title,
                    text_preview,
                    img: {
                        desktop: {
                            url: aside_desktop_url,
                            width: aside_desktop_width,
                            height: aside_desktop_height
                        },
                        tablet: {
                            url: aside_tablet_url,
                            width: aside_tablet_width,
                            height: aside_tablet_height
                        },
                        mobile: {
                            url: aside_mobile_url,
                            width: aside_mobile_width,
                            height: aside_mobile_height
                        }
                    },
                };
                papersRec.push(paperData);
            });
            return papersRec;
        })
        .catch(err => console.log(err))
}

export const getSimilar = (excludeFromSearch = [], categoriesNames = [], sort = 'desc') => {
    const query = qs.stringify(
        {
            fields: ['title', 'text_preview', 'time_to_read', 'createdAt'],
            sort: [`createdAt:${sort}`],
            pagination: {
                pageSize: 1,
                page: 1,
            },
            filters: {
                categories: {
                    categoryname: {
                        $in: categoriesNames
                    }
                },
                id: {
                    $notIn: excludeFromSearch
                }
            },
            populate: {
                image_wide: {
                    fields: ['formats', 'width', 'height']
                },
            },
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    );
    return fetch(`${END_POINT_DEVDOMAIN}/api/newspapers?${query}`)
        .then(res => {
            if (res.status >= 200 && res.status <= 300) {
                return res.json();
            } else throw new Error(res.statusText)
        })
        .then(res => {
            const papersSim = [];
            const { data } = res;
            data.forEach((
                { id,
                    attributes: {
                        title,
                        createdAt,
                        time_to_read,
                        text_preview,
                        image_wide: {
                            data: {
                                attributes: {
                                    formats: {
                                        old: {
                                            url: old_desktop_url,
                                            width: old_desktop_width,
                                            height: old_desktop_height
                                        },
                                        old_tablet: {
                                            url: old_tablet_url,
                                            width: old_tablet_width,
                                            height: old_tablet_height
                                        },
                                        old_mobile: {
                                            url: old_mobile_url,
                                            width: old_mobile_width,
                                            height: old_mobile_height
                                        }
                                    }
                                }
                            }
                        }
                    }
                }) => {
                const paperData = {
                    id,
                    title,
                    text_preview,
                    createdAt,
                    time_to_read,
                    img: {
                        desktop: {
                            url: old_desktop_url,
                            width: old_desktop_width,
                            height: old_desktop_height
                        },
                        tablet: {
                            url: old_tablet_url,
                            width: old_tablet_width,
                            height: old_tablet_height
                        },
                        mobile: {
                            url: old_mobile_url,
                            width: old_mobile_width,
                            height: old_mobile_height
                        }
                    },
                };
                papersSim.push(paperData);
            });
            return papersSim;
        })
        .catch(err => console.log(err))
}

export const getProject = (type) => {
    return fetch(`${END_POINT_DEVDOMAIN}/api/${type}?fields=title&fields=text&fields=slogan&populate[image_desktop][fields]=url&populate[image_desktop][fields]=width&populate[image_desktop][fields]=height`)
        .then(res => {
            if (res.status >= 200 && res.status <= 300) {
                return res.json();
            } else throw new Error(res.statusText)
        })
        .then(res => {
            const { data } = res;
            const { attributes: { slogan, text, title, image_desktop: { data: { attributes: { url, width, height } } } } } = data
            const projectData = {
                title,
                slogan,
                text,
                img: {
                    desktop: url,
                    desktop_dementions: {
                        width,
                        height
                    }
                }
            }
            return projectData;
        })
        .catch(err => console.log(err))
}

export const getProjectPreview = (type) => {
    return fetch(`${END_POINT_DEVDOMAIN}/api/${type}?fields=text_preview&fields=heading_preview&fields=slogan&populate[image_desktop_wide][fields]=url`)
        .then(res => {
            if (res.status >= 200 && res.status <= 300) {
                return res.json();
            } else throw new Error(res.statusText)
        })
        .then(res => {
            const { data } = res;
            const { attributes: { slogan, text_preview, heading_preview, image_desktop_wide: { data: { attributes: { url,width,height } } } } } = data
            const projectData = {
                heading_preview,
                slogan,
                text_preview,
                img: {
                    desktop_wide: url,
                    desktop_dementions: {
                        width,
                        height
                    }
                }
            }
            return projectData;
        })
        .catch(err => console.log(err))
}

export const getPopularTags = () => {
    return fetch(`${END_POINT_DEVDOMAIN}/api/newspapers?populate=tags&fields=time_to_read&pagination[page]=1&pagination[pageSize]=23`)
        .then(res => {
            if (res.status >= 200 && res.status <= 300) {
                return res.json();
            } else throw new Error(res.statusText)
        })
        .then(res => {
            const { data } = res;
            const tags = [];
            data.forEach(({ attributes: { tags: { value: tagsList } } }) => {
                tagsList.split(/\s/).forEach(tag => {
                    tags.push(tag);
                })
            });
            let counted = {};
            //count tags
            tags.forEach(a => {
                counted[a] = counted[a] + 1 || 1;
            });
            //sort by count desc
            const sorted = Object.entries(counted).sort((a, b) => {
                return b[1] - a[1];
            });
            //return tags as array without count
            return sorted.map(tag => tag[0]);
        })
        .catch(err => console.log(err))
}



