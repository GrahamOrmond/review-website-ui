import { AppCard } from './AppCard';

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
