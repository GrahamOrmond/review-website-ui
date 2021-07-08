import { useHistory } from 'react-router-dom'

export const AppCard = (props) => {

    const history = useHistory()

    const {
        url
    } = props

    const viewCard = () => {
        if(url)
        history.push(url)
    }

    return (
        <div className="app-card" onClick={viewCard}>
            {props.children}
        </div>
    )
}
