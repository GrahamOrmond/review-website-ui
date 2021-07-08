import { Link } from 'react-router-dom'
import { AppCard } from './AppCard';

const ShowcaseItem = (props) => {

    const {
        item
    } = props

    return (
        <div className="showcase-item">
            <p>{item}</p>
        </div>
    );

}

export const AppShowcase = (props) => {

    const {
        title,
        actionTitle, 
        actionLink,
    } = props

    const items = []

    const renderItems = () => {
        return items.map(i => {
            return <ShowcaseItem item={i}/>
        })
    }

    return (
        <AppCard>
            <div className="app-showcase">
                <div className="showcase-title">
                    <h4>{title}</h4>
                </div>
                <div className="showcase-display">
                    {renderItems()}
                </div>
            </div>
            <Link to={actionLink}>
                <div className="showcase-action app-button">
                    {actionTitle}
                </div>
            </Link>
        </AppCard>
    );
}
