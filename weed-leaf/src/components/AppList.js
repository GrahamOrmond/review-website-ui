import { AppCard } from './AppCard';


export const ListSection = (props) => {

    const {
        title,
        children
    } = props

    return (
        <div className="list-section">
            <div className="section-title">
                <h2>{title}</h2>
            </div>
            <div className="section-content">
                {children}
            </div>
        </div>
    )
}


export const AppList = (props) => {

    const {
        title,
        children
    } = props

    return (
        <AppCard>
            <div className="app-list">
                <div className="list-title">
                    {title}
                </div>
                <div className="list-display">
                    {children}
                </div>
            </div>
        </AppCard>
    );
}
