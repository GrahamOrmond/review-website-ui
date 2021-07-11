
const profileGeneralForm = (profile) =>
{
    return {
        'displayName': {
            'label': 'Display Name',
            'type': 'text',
            'placehoder': '',
            'required': true,
            'value': profile.displayName
        },
        'bio': {
            'label': 'Bio',
            'type': 'textEditor',
            'placehoder': '',
            'required': false,
            'value': profile.bio
        }
    }
}

const profileShowcaseForm = (profile) =>
{
    return {
        'options': {
            '': {
                label: "-- select --"
            },
            'images': {
                label: "Image Showcase",
                type: 'multiple',
                data: {
                    'type': 'images',
                    'items': []
                }
            },
            'product': {
                label: "Favourite Product",
                type: 'single',
                data: {
                    'type': 'products',
                    'item': null
                }
            },
            'brand': {
                label: "Favourite Brand",
                type: 'single',
                data: {
                    'type': 'brands',
                    'item': null
                }
            },
            'products': {
                label: "Product Showcase",
                type: 'multiple',
                data: {
                    'type': 'products',
                    'items': []
                }
            },
            'review': {
                label: "Review Showcase",
                type: 'single',
                data: {
                    'type': 'posts',
                    'item': null
                }
            },
            'collection': {
                label: "Collection Showcase",
                type: 'multiple',
                data: {
                    'type': 'collections',
                    'items': []
                }
            },
        },
        'selected': [
        ]
    }
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
        "general": profileGeneralForm(profile),
        "showcases": profileShowcaseForm(profile),
        "privacy": profilePrivacyForm(profile),
    }
}


export const profileMenuOptions = {
    "general": {
        "id": "general",
        "label": "General",
    },
    "showcase": {
        "id": "showcases",
        "label": "Showcase",
    },
    "support": {
        "id": "support",
        "label": "Support",
    },
    "privacy": {
        "id": "privacy",
        "label": "Privacy",
    },
}
