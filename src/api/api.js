import { DEVDOMAIN } from "@constants"
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
    // return fetch(`${DEVDOMAIN}/api/newspapers?fields=title&fields=text_preview&fields=time_to_read&fields=createdAt&sort=createdAt:${sort}&pagination[pageSize]=23&populate[image_ultrawide][fields]=formats&populate[image_sq][fields]=formats&populate[image_wide][fields]=formats&filters[$or][0][title][$contains]=${searchPhrase}&filters[$or][1][text_article][$contains]=${searchPhrase}&filters[tags][value][$contains]=${searchTag}&filters[categories][categoryname][$contains]=${categoryName}`)
    return fetch(`${DEVDOMAIN}/api/newspapers?${query}`)
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
                                        category_small: { url: category_small },
                                        category_small_tablet: { url: category_small_tablet },
                                        category_small_mobile: { url: category_small_mobile }
                                    }
                                }
                            }
                        },
                        image_ultrawide: {
                            data: {
                                attributes: {
                                    formats: {
                                        category: { url: category },
                                        category_tablet: { url: category_tablet },
                                        category_mobile: { url: category_mobile }
                                    }
                                }
                            }
                        },
                        image_wide: {
                            data: {
                                attributes: {
                                    formats: {
                                        old: { url: old },
                                        old_tablet: { url: old_tablet },
                                        old_mobile: { url: old_mobile }
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
                            category,
                            category_small,
                            old
                        },
                        tablet: {
                            category: category_tablet,
                            category_small: category_small_tablet,
                            old: old_tablet
                        },
                        mobile: {
                            category: category_mobile,
                            category_small: category_small_mobile,
                            old: old_mobile
                        }
                    }
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
                    fields: ['url', 'formats']
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
    // return fetch(`${DEVDOMAIN}/api/newspapers/${id}?fields=title&fields=text_article&fields=time_to_read&fields=createdAt&populate[image_ultrawide][fields]=formats&populate[image_ultrawide][fields]=url&populate=tags`)
    return fetch(`${DEVDOMAIN}/api/newspapers/${id}?${query}`)
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
                                formats: {
                                    article_tablet: {
                                        url: tablet_url
                                    },
                                    article_mobile: {
                                        url: mobile_url
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
                    desktop: url,
                    tablet: tablet_url,
                    mobile: mobile_url
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
                    fields: ['formats']
                },
                // image_wide: {
                //     fields: ['formats']
                // },
                //categories: true
            },
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    );
    // return fetch(`${DEVDOMAIN}/api/newspapers?fields=title&fields=text_preview&fields=time_to_read&fields=createdAt&sort=createdAt:desc&populate[image_sq][fields]=formats&pagination[page]=1&pagination[pageSize]=2`)
    return fetch(`${DEVDOMAIN}/api/newspapers?${query}`)
        .then(res => {
            if (res.status >= 200 && res.status <= 300) {
                return res.json();
            } else throw new Error(res.statusText)
        })
        .then(res => {
            //const dataRes = res;
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
                                            url: aside_desktop
                                        },
                                        aside_tablet: {
                                            url: aside_tablet
                                        },
                                        aside_mobile: {
                                            url: aside_mobile
                                        }
                                    }
                                }
                            }
                        },
                        // image_wide: {
                        //     data: {
                        //         attributes: {
                        //             formats: {
                        //                 old: { url },
                        //                 old_tablet: {
                        //                     url: tablet_url
                        //                 },
                        //                 old_mobile: {
                        //                     url: old_mobile
                        //                 }
                        //             }
                        //         }
                        //     }
                        // }
                    },
                }) => {
                const paperData = {
                    id,
                    createdAt,
                    time_to_read,
                    title,
                    text_preview,
                    img: {
                        desktop: aside_desktop,
                        tablet: aside_tablet,
                        mobile: aside_mobile,
                    },
                    // img_old: {
                    //     desktop: url,
                    //     tablet: tablet_url,
                    //     mobile: old_mobile
                    // }
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
                        //$contains: categoryName,
                        $in: categoriesNames
                    }
                },
                id: {
                    $notIn: excludeFromSearch
                }
            },
            populate: {
                image_wide: {
                    fields: ['formats']
                },
            },
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    );
    // return fetch(`${DEVDOMAIN}/api/newspapers/${id}?fields=title&fields=text_preview&fields=time_to_read&fields=createdAt&populate[image_wide][fields]=formats&populate[image_wide][fields]=url`)
    return fetch(`${DEVDOMAIN}/api/newspapers?${query}`)
        .then(res => {
            if (res.status >= 200 && res.status <= 300) {
                return res.json();
            } else throw new Error(res.statusText)
        })
        .then(res => {
            //const dataRes = res;
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
                                        old: { url },
                                        old_tablet: {
                                            url: tablet_url
                                        },
                                        old_mobile: {
                                            url: old_mobile
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
                        desktop: url,
                        tablet: tablet_url,
                        mobile: old_mobile
                    },
                    // img_old: {
                    //     desktop: url,
                    //     tablet: tablet_url,
                    //     mobile: old_mobile
                    // }
                };
                papersSim.push(paperData);
            });
            return papersSim;
        })
        .catch(err => console.log(err))
    // .then(res => {
    //     const { data } = res;
    //     const { id,
    //         attributes: {
    //             title,
    //             createdAt,
    //             time_to_read,
    //             text_preview,
    //             image_wide: {
    //                 data: {
    //                     attributes: {
    //                         formats: {
    //                             old: { url },
    //                             old_tablet: {
    //                                 url: tablet_url
    //                             },
    //                             old_mobile: {
    //                                 url: old_mobile
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     } = data;
    //     paperData = {
    //         id,
    //         title,
    //         text_preview,
    //         createdAt,
    //         time_to_read,
    //         img: {
    //             desktop: url,
    //             tablet: tablet_url,
    //             mobile: old_mobile
    //         }
    //     }
    //     return paperData;
    // })
    // .catch(err => console.log(err))
}

export const getProject = (type) => {
    return fetch(`${DEVDOMAIN}/api/${type}?fields=title&fields=text&fields=slogan&populate[image_desktop][fields]=url&populate[image_desktop][fields]=width&populate[image_desktop][fields]=height`)
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
    return fetch(`${DEVDOMAIN}/api/${type}?fields=text_preview&fields=heading_preview&fields=slogan&populate[image_desktop_wide][fields]=url`)
        .then(res => {
            if (res.status >= 200 && res.status <= 300) {
                return res.json();
            } else throw new Error(res.statusText)
        })
        .then(res => {
            const { data } = res;
            const { attributes: { slogan, text_preview, heading_preview, image_desktop_wide: { data: { attributes: { url } } } } } = data
            const projectData = {
                heading_preview,
                slogan,
                text_preview,
                img: {
                    desktop_wide: url
                }
            }
            return projectData;
        })
        .catch(err => console.log(err))
}

export const getPopularTags = () => {
    return fetch(`${DEVDOMAIN}/api/newspapers?populate=tags&fields=time_to_read&pagination[page]=1&pagination[pageSize]=23`)
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



