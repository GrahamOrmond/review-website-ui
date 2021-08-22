import AppThreadDisplay from "../../components/AppThreadDisplay";

export const CommunityThreads = (props) =>  {

    const {
        postType,
        sortBy
    } = props

    return (
        <div className="app-content">
            <AppThreadDisplay
                postType={postType}
                sortBy={sortBy}
                urlBase="/community/"
            />
        </div>
    );
}
