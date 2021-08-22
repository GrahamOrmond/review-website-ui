

const profileShowcaseForm = (profileShowcases) =>
{
    let formData = {
        'options': {
            '': {
                label: "-- select --"
            },
            'MULTIPLE-IMAGES': {
                label: "Image Showcase",
                type: 'MULTIPLE',
                data: {
                    'type': 'IMAGES',
                    'items': []
                }
            },
            'SINGLE-PRODUCTS': {
                label: "Favourite Product",
                type: 'SINGLE',
                data: {
                    'type': 'PRODUCTS',
                    'items': []
                }
            },
            'SINGLE-BRANDS': {
                label: "Favourite Brand",
                type: 'SINGLE',
                data: {
                    'type': 'BRANDS',
                    'items': []
                }
            },
            'MULTIPLE-PRODUCTS': {
                label: "Product Showcase",
                type: 'MULTIPLE',
                data: {
                    'type': 'PRODUCTS',
                    'items': []
                }
            },
            'SINGLE-POSTS': {
                label: "Review Showcase",
                type: 'SINGLE',
                data: {
                    'type': 'POSTS',
                    'items': []
                }
            },
            'MULTIPLE-COLLECTIONS': {
                label: "Collection Showcase",
                type: 'MULTIPLE',
                data: {
                    'type': 'COLLECTIONS',
                    'items': []
                }
            },
        },
        'selected': [
        ]
    }

    profileShowcases.forEach(s => {
        let optionId = `${s.type}-${s.data.type}`
        formData.options[optionId].data.items = [...s.data.items]
        formData.selected.push(optionId)
    });
    return formData
}

const profilePrivacyForm = (profile) =>
{
    return {
        'visability': {
            'label': 'Visability',
            'type': 'select',
            'options': {
                'public': {
                    'label': "Public"
                },
                'private': {
                    'label': "Private"
                }
            },
            'placehoder': '',
            'required': true,
            'value': ''
        }
    }
}

export const profileEditForms = (profile) =>  {

    return {
        "showcases": profileShowcaseForm(profile.showcases),
        "privacy": profilePrivacyForm(profile),
    }
}
