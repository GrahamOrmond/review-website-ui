
export const AppButton = (props) => {

    const {
        handleOnClick,
        children,
        className,
    } = props

    return (
        <div onClick={handleOnClick} 
            className={`app-button ${className? className : ""}`}>
            {children}
        </div>
    )
} 
