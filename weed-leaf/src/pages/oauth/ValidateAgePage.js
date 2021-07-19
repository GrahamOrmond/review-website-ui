import { useState } from "react"
import { useDispatch } from "react-redux"
import { AppCard } from "../../components/AppCard"
import { setValidAgeTrue } from "./oauthSlice"

const ValidationContent = () => {

    const dispatch = useDispatch()
    const [formError, setFormError] = useState("")
    const [canSubmit, setCanSubmit] = useState(false)
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
        remember: false // default 1 day
    })
    

    const handleInputChange = (e) => {
        const target = e.target
        
        if(isNaN(target.value)) // only numbers allowed
            return

        let dateNow = new Date()
        let data = {...formData}
        if(target.value)
        {
            // check for max input count
            if(target.value.length > formData[target.name].max + 1){ // +1 to remove starting 0's
                return
            } 

            // 1 more than max (check for 0's)
            if(target.value.length > formData[target.name].max){
                if(target.value.charAt(0) === '0')
                    target.value = target.value.substring(1);
                else
                    return
            }
            
            if(target.name === "month"){ // month check
                if(parseInt(target.value) > 12){
                    target.value = 12
                }

                if(target.value.length >= target.max){ // focus next input
                    target.form.elements["day"].focus()
                }
            }else if (target.name === "year"){ // year check
                let yearNow =  dateNow.getFullYear();
                if(parseInt(target.value) > yearNow){
                    target.value = yearNow
                }
            }
            target.value = target.value.toString()
        }
        data[target.name].value = target.value

        // check days
        if(data.day.value){
            let year = data.year.value ? data.year.value : 0
            let month = data.month.value ? data.month.value : 0
            let maxDays = new Date(year, parseInt(month), "").getDate()
            if(data.day.value > maxDays){
                data.day.value = maxDays
            }

            if(data.day.value.length >= target.max){ // focus next input
                target.form.elements["year"].focus()
            }
        }
        setFormError("")
        setFormData(data)

        // allow user to submit form if inputs are entered
        if(getDateErrors()){
            setCanSubmit(false)
        }else {
            setCanSubmit(true)
        }
    }

    const handleInputBlur = () => {
        let data = {...formData};
        for (const [key, input] of Object.entries(data)) {
            if(input.value
                && input.value.length === 1){
                    input.value = '0'.repeat(input.max - input.value.length) + input.value
            }
        }
        setFormData(data)
    }

    const getDateErrors = () => {
        // check for empty values
        if(!formData.year.value || 
            !formData.month.value ||
            !formData.day.value ||
            formData.year.value.length !== 4 ) {
            return "Please enter a valid date";
        } 
        return;
    }

    const getAgeErrors = () => {
        // check date
        let birthDate = new Date(formData.year.value, parseInt(formData.month.value), parseInt(formData.day.value))
        let minDateRequired  = new Date()
        minDateRequired.setFullYear(minDateRequired.getFullYear() - 19)
        if(birthDate.getTime() > minDateRequired.getTime()){ // not of age
            return "You must be over the age of 19 to access this website"
        }else if(parseInt(formData.year.value) < minDateRequired.getFullYear() - 81){ //  more than 100 years old
            return "Please enter a valid date";
        }
        return;
    }

    const handleValidateAge = (e) => {
        e.preventDefault()

        if(!canSubmit) return

        // check date
        let dateError = getDateErrors();
        if (dateError){
            setFormError(dateError)
            return;
        }

        // check age
        let ageError = getAgeErrors();
        if (ageError){
            setFormError(ageError)
            return
        }

        // submit form
        let date = new Date()
        if(formData.remember){ // remember for 30 days
            date.setDate(date.getDate() + 30);
        }else{ // remeber for 1 day
            date.setDate(date.getDate() + 1);
        }
        var ageData = {
            expires: date.getTime().toString()
        }
        dispatch(setValidAgeTrue(ageData))
    }

    const handleRemeberInputChange = () => {
        let data = {...formData}
        data.remember = !data.remember
        setFormData(data)
    }

    const submitButtonClass = canSubmit? "verify-button enabled" : "verify-button"
    return (
        <div className="validation-area">
            <form onSubmit={(e) => handleValidateAge(e)}>

                {/* <p>Date of birth</p> */}
                <div className="age-input">
                    <div>
                        <input 
                            name="month"
                            value={formData.month.value}
                            max={formData.month.max}
                            type="text" 
                            placeholder="MM" 
                            autoComplete="off"
                            onChange={(e) => handleInputChange(e)}
                            onBlur={() => handleInputBlur()}
                        ></input>
                        <label>Month</label>
                    </div>
                    <div>
                        <input 
                            name="day"
                            value={formData.day.value}
                            max={formData.month.max}
                            type="text" 
                            placeholder="DD" 
                            autoComplete="off"
                            onChange={(e) => handleInputChange(e)}
                            onBlur={() => handleInputBlur()}
                        ></input>
                        <label>Day</label>
                    </div>
                    <div>
                        <input 
                            name="year"
                            value={formData.year.value}
                            max={formData.month.max}
                            type="text" 
                            placeholder="YYYY"
                            autoComplete="off" 
                            onChange={(e) => handleInputChange(e)}
                            onBlur={() => handleInputBlur()}
                        ></input>
                        <label>Year</label>
                    </div>
                </div>
                <div className="remember-verification">
                    <div className="remember-input" onClick={() => handleRemeberInputChange()}>
                        <div>
                            <input 
                                name="remember" 
                                onChange={()=>{}}
                                checked={formData.remember} 
                                type="checkbox" />
                        </div>
                        <label>Remember for 30 days</label>
                    </div>
                </div>
                
                <div className="verify-button-section">
                    <button className={submitButtonClass} type="submit">VERIFY</button>
                </div>
                <div className="verification-error">
                    <p>{formError}</p>
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
