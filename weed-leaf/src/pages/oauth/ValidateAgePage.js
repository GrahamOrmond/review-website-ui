import { useState } from "react"
import { useDispatch } from "react-redux"
import { AppCard } from "../../components/AppCard"
import { setValidAgeTrue } from "./oauthSlice"

const ValidationContent = () => {

    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        month: {
            max: 2,
            value: ""
        },
        day: {
            max: 2,
            value: ""
        },
        year: {
            max: 4,
            value: ""
        },
    })
    

    const handleInputChange = (e) => {
        const target = e.target

        if(isNaN(target.value)) // only numbers allowed
            return

        // check for max input count
        if(formData[target.name].value.length < formData[target.name].max){
            let data = {...formData}
            data[target.name].value = target.value
            setFormData(data)
        }
    }

    const handleValidateAge = (e) => {
        e.preventDefault()
        dispatch(setValidAgeTrue())
    }
    
    return (
        <div className="validation-area">
            <form onSubmit={(e) => handleValidateAge(e)}>

                <p>Date of birth</p>
                <div className="age-input">
                    <div>
                        <input 
                            name="month"
                            value={formData.month.value}
                            type="text" 
                            placeholder="MM" 
                            autoComplete="off"
                            onChange={(e) => handleInputChange(e)}
                        ></input>
                        <label>Month</label>
                    </div>
                    <div>
                        <input 
                            name="day"
                            value={formData.day.value}
                            type="text" 
                            placeholder="DD" 
                            autoComplete="off"
                            onChange={(e) => handleInputChange(e)}
                        ></input>
                        <label>Day</label>
                    </div>
                    <div>
                        <input 
                            name="year"
                            value={formData.year.value}
                            type="text" 
                            placeholder="YYYY"
                            autoComplete="off" 
                            onChange={(e) => handleInputChange(e)}
                        ></input>
                        <label>Year</label>
                    </div>
                </div>

                <div className="verify-button-section">
                    <button className="verify-button" type="submit">VERIFY</button>
                </div>
            </form>
        </div>
    )
}
 
export const ValidationHeader = () => {

    return (
        <div className="validation-header">
            <div className="title">
                <h2>Welcome To Weed Leaf</h2>
            </div>
            <div className="info">
                <p>Ontario's one stop shop for information on all your government cannabis products and brands.</p>
                <b><p>This website is intended for those who are 19 years of age or older.</p></b>
                <p>Please enter your birth date to confirm you are of age.</p>
            </div>
        </div>
    )
}





export const ValidateAgePage = () => {

    return (
        <div className="app-content">
            <div className="validation-section">
                <AppCard>
                    <div className="validation-card">
                        <ValidationHeader />
                        <ValidationContent />
                    </div>
                </AppCard>
            </div>
        </div>
    )
}
