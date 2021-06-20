
export const postProperties = (props) => {

    const reviewParams = {
        "rating": {
            'label': 'Rating',
            'type': 'select',
            'options': {
                '': {
                    label: "-- select --"
                },
                '1': {
                    label: "1 Star"
                },
                '2': {
                    label: "2 Stars"
                },
                '3': {
                    label: "3 Stars"
                },
                '4': {
                    label: "4 Stars"
                },
                '5': {
                    label: "5 Stars"
                }
            },
            'placeholder': '',
            'required': true,
            'value': 'public',
        },
        "properties": {
            'label': 'Properties',
            'type': 'properties',
            'options': {
                '': {
                    label: "-- select --"
                },
                'thc': {
                    label: "THC",
                    type: 'text',
                    placeholder: '',
                    value: ''
                },
                'cbd': {
                    label: "CBD",
                    type: 'text',
                    placeholder: '',
                    value: ''
                },
                'terps': {
                    label: "TERPS",
                    type: 'text',
                    placeholder: '',
                    value: ''
                },
                'batchDate': {
                    label: "Batch Date",
                    type: 'text',
                    placeholder: '',
                    value: ''
                },
                'price': {
                    label: "Price",
                    type: 'text',
                    placeholder: '',
                    value: ''
                },
                'store': {
                    label: "Store",
                    type: 'text',
                    placeholder: '',
                    value: ''
                },
                'count': {
                    label: "Count",
                    type: 'text',
                    placeholder: '',
                    value: ''
                },
            },
            'placeholder': '',
            'value': '',
        },
    }
    

    return reviewParams;
}