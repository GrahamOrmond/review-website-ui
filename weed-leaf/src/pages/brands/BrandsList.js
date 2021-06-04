import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function renderList(brandsData){
    let brandSorted = [...brandsData];
    brandSorted.sort(function(a, b){
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
        if (nameA < nameB) //sort string ascending
            return -1;
        if (nameA > nameB)
            return 1;
        return 0; //default return value (no sorting)
    });


    let previousLetter;
    let brandContent = [], brandSection, sectionContent = [];
    brandSorted.forEach(brand => {
        let letter = brand.name[0];
        if(letter.match(/[a-z]/i)){
            letter = letter.toUpperCase()
        }else{
            letter = "#";
        }

        if(previousLetter != letter){
            if(previousLetter != undefined)
                brandContent.push(<div className="list-section">
                    {brandSection}
                    <div className="section-content">
                        {sectionContent}
                    </div>
                </div>);
            sectionContent = []

            previousLetter = letter
            brandSection = (
                <div className="section-title">
                    <h2>{letter}</h2>
                </div>
            );
        }
        sectionContent.push(
           
                <div>
                     <Link to={"/brands/" + brand.brandId}>
                    {brand.name}         
                    </Link>  
                </div>
            
        );
    });

    return brandContent;
}


export const BrandsList = () => {
    const brands = useSelector(state => state.brands.brands)
    const status = useSelector((state) => state.brands.status)
    const error = useSelector((state) => state.brands.error)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    let content;
    if (status === 'loading') {
        content = (<div className="loader">Loading...</div>)
    } else if (status === 'succeeded') {
        content = renderList(brands);
    } else if (status === 'error') {
        content = (<div>{error}</div>)
    }

    return (
        <div className="list-content">
            {content}
        </div>
    );
}
