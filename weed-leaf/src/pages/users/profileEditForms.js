
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

const profileShowcaseForm = (profileShowcases) =>
{
    let formData = {
        'options': {
            '': {
                label: "-- select --"
            },
            'MULTIPLE-IMAGES': {
                type: 'MULTIPLE',
                data: {
                    'type': 'IMAGES',
                    'items': []
                }
            },
            'SINGLE-PRODUCTS': {
                type: 'SINGLE',
                data: {
                    'type': 'PRODUCTS',
                    'items': []
                }
            },
            'SINGLE-BRANDS': {
                type: 'SINGLE',
                data: {
                    'type': 'BRANDS',
                    'items': []
                }
            },
            'MULTIPLE-PRODUCTS': {
                type: 'MULTIPLE',
                data: {
                    'type': 'PRODUCTS',
                    'items': []
                }
            },
            'SINGLE-POSTS': {
                type: 'SINGLE',
                data: {
                    'type': 'POSTS',
                    'items': []
                }
            },
            'MULTIPLE-COLLECTIONS': {
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
        "general": profileGeneralForm(profile),
        "showcases": profileShowcaseForm(profile.showcases),
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
