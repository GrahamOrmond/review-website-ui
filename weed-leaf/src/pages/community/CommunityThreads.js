import AppThreadDisplay from "../../components/AppThreadDisplay";

export const CommunityThreads = (props) =>  {

    const {
        postType,
        sortBy,
        searchValue
    } = props

    return (
        <div className="app-content">
            <AppThreadDisplay
                postType={postType}
                sortBy={sortBy}
                searchValue={searchValue}
                urlBase="/community/"
            />
        </div>
    );
}
