import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBrands, getBrandsListInfo, getBrandsSearchParams, idleBrandsList } from './brandsSlice';
import { sortListByName } from '../../helpers/generalHelper';
import { ListSection } from '../../components/AppList';

const BrandLabel = (props) => {

    const {
        name,
        brandId,
    } = props
    
    return (
        <div>
            <Link to={"/brands/" + brandId}>
                {name}         
            </Link>  
        </div>
    )
}

const BrandsListDisplay = (props) => {

    const {
        brands,
    } = props

    const renderBrands = () => {
        let brandSorted = sortListByName(brands, "name") // sort brands

        let previousLetter; // tracks previous letter
        let brandContent = [], sectionTitle, sectionContent = [];
        brandSorted.forEach(brand => {
            // determine brand section letter
            let letter = brand.name[0];
            if(letter.match(/[a-z]/i)){
                letter = letter.toUpperCase()
            }else{
                letter = "#";
            }

            // previous letter is different from current
            if(previousLetter !== letter){
                if(previousLetter !== undefined) // not first section
                    brandContent.push( // brand section with content
                        <ListSection key={sectionTitle} title={sectionTitle}>
                            {sectionContent}
                        </ListSection>
                    )
                sectionContent = [] // reset section content
                previousLetter = letter // track previous letter
                sectionTitle = letter // track next section title
            }

            // add brand to section content
            sectionContent.push(<BrandLabel 
                key={brand.brandId}
                name={brand.name}
                brandId={brand.brandId}
            />);
        });
        return brandContent;
    }

    return (
        <div>
            {renderBrands()}
        </div>
    )
}

export const BrandsList = (props) => {

    const dispatch = useDispatch();
    const {
        fetchData
    } = props

    const brandsInfo = useSelector(getBrandsListInfo);
    const existingParams = useSelector(s => getBrandsSearchParams(s, fetchData));
    useEffect(() => {
        if(brandsInfo.status === 'idle'){
            dispatch(fetchBrands(fetchData))
            return
        }

        if(brandsInfo.status !== 'loading'
            && !existingParams){
            dispatch(idleBrandsList())
        }
    }, [brandsInfo, fetchData, existingParams, dispatch])
    
    let content;
    if (brandsInfo.status === 'loading') {
        content = (<div className="loader">Loading...</div>)
    } else if (brandsInfo.status === 'succeeded') {
        content = <BrandsListDisplay 
            brands={brandsInfo.brands}
        />
    } else if (brandsInfo.status === 'error') {
        content = (<div>{brandsInfo.error}</div>)
    }

    return (
        <div className="list-content">
            {content}
        </div>
    );
}
