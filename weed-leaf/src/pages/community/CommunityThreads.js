import AppThreadDisplay from "../../components/AppThreadDisplay";

export const CommunityThreads = (props) =>  {

    const {
        postType
    } = props

    return (
        <div className="app-content">
            <AppThreadDisplay
                postType={postType}
                urlBase={`/community/`}
            />
        </div>
    );
}
