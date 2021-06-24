
export const sortListByName = (list, key) => {
    let sortedList = [...list];
    sortedList.sort(function(a, b){
        let nameA = a[key].toLowerCase()
        let nameB = b[key].toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1;
        if (nameA > nameB)
            return 1;
        return 0; //default return value (no sorting)
    });
    return sortedList;
}

// checks two search param objects to see if they are equal
export const isSearchParamsEqual = (params1, params2) => {
    for (const [key, value] of Object.entries(params1)) {
        if (params2[key] !== value)
            return false
    }

    for (const [key, value] of Object.entries(params2)) {
        if (params1[key] !== value)
            return false
    }
    return true
}


export const closeAllDropDownMenus = (event) => {
    const target = event.target
    if(target.closest(".app-dropdown")
        && !target.classList.contains("dropdown-nav")){
        return;
    }
        
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('active')) {
        openDropdown.classList.remove('active');
        }
    }
}
