
// sort a list by given key
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

// closes all dropdown menus
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

// returns display string for the time posted
export const determineTimePosted = (date) => {
    if(date.charAt(date.length -1) === "Z")
        date = date.slice(0, -1)
    const givenDate = new Date(`${date}Z`);
    const timeNow = new Date();

    let timeBetween = timeNow.getTime() - givenDate.getTime()
    let minutes = timeBetween / 60000; // 1 min == 60000 milliseconds
    if(minutes < 1){ // less than minute ago
        return `less than a minute ago`
    }

    let hours = minutes/60
    let days = hours/24
    let months = days/30
    let years = days/365

    let count, message
    if(years >= 1){
        count = Math.round(years)
        message = `${count} year`
    }else if (months >= 1){
        count = Math.round(months)
        message = `${count} month`
    }else if (days >= 1){
        count = Math.round(days)
        message = `${count} day`
    }else if (hours >= 1){
        count = Math.round(hours)
        message = `${count} hour`
    }else {
        count = Math.round(minutes)
        message = `${count} minute`
    }

    if(count > 1){
        message += "s"
    }
    message += " ago"
    return message
}
