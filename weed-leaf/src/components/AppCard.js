import { Link } from 'react-router-dom'

export const AppCard = (props) => {
    
    const cardContent = (
        <div className="app-card">
            {props.children}
        </div>
    )

    if(props.url){ // url included
        return (
            <Link to={props.url}>
                {cardContent}
            </Link>
        )
    }
    return cardContent
}
