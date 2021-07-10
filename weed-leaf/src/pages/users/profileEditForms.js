
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
            'required': true,
            'value': profile.bio
        }
    }
}

const profileShowcaseForm = (profile) =>
{
    return {
        'showcase': {
            'label': 'Add Showcase',
            'type': 'dynamicSelect',
            'options': {
                '': {
                    label: "-- select --"
                },
                'images': {
                    label: "Image Showcase",
                    type: 'showcase',
                    data: {
                        'items': []
                    }
                },
                'product': {
                    label: "Favourite Product",
                    type: 'showcase',
                    data: {
                        'items': []
                    }
                },
                'brand': {
                    label: "Favourite Brand",
                    type: 'showcase',
                    data: {
                        'items': []
                    }
                },
                'products': {
                    label: "Product Showcase",
                    type: 'showcase',
                    data: {
                        'items': []
                    }
                },
                'review': {
                    label: "Review Showcase",
                    type: 'showcase',
                    data: {
                        'items': []
                    }
                },
                'collection': {
                    label: "Collection Showcase",
                    type: 'showcase',
                    data: {
                        'items': []
                    }
                },
            },
            'selected': [
            ]
        }
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
        "showcase": profileShowcaseForm(profile),
        "privacy": profilePrivacyForm(profile),
    }
}


export const profileMenuOptions = {
    "general": {
        "id": "general",
        "label": "General",
    },
    "showcase": {
        "id": "showcase",
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
