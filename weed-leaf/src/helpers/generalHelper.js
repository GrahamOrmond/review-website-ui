
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
