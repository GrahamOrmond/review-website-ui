import { AppCard } from "./AppCard"

export const AppModal = (props) => {

    const {
        children
    } = props

    return (
        <div className="app-modal">
            <div className="modal-content">
                <AppCard>
                    { children }
                </AppCard>
            </div>
        </div>
    );
}
