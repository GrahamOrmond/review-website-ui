
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
        'bio': {
            'label': 'Add Showcase',
            'type': 'dynamicSelect',
            'placeholder': '',
            'value': '',
            'options': {
                '': {
                    label: "-- select --"
                },
                'images': {
                    label: "Image Showcase"
                },
                'strain': {
                    label: "Favourite Strain"
                },
                'brand': {
                    label: "Favourite Brand"
                },
                'products': {
                    label: "Product Showcase"
                },
                'review': {
                    label: "Review Showcase"
                },
                'collection': {
                    label: "Collection Showcase"
                },
            }
        }
    }
}

const profilePrivacyForm = (profile) =>
{
    return {
        'account': {
            'label': 'Account',
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
