import React from "react";
import HolidayMessage from "./HolidayMessage";
import { useState, useContext, useEffect } from "react";

function BankHoliday(){
    const Holiday = {EventName: 'Rakhi'};
    const baseURL = 'https://holidays.abstractapi.com/v1/?api_key=169d4c0bffdd42ce8990b4eb331e0406&country=IN';
    // const [fetchURL, setFetchURL] = useState("");
    const [formInput, setFormInput] = useState({ SelectedDate: "", DayOfWeek:0, Day: 0, Month: 0, Year: 0 });
    const [holidayData, SetHolidayData] = useState(null); //null means not checked yet //useState({});
    const [ShowValidationMessage, setShowValidationMessage] = useState(true);
    const [validDateSelected, setValidDateSelected] = useState(false)
    const [validationMessage, setValidationMessage] = useState("")

    useEffect(()=>{
        // setDefaultLabel()
        // setFetchURL("");
        setValidationMessage("Please select a date when you are planning to visit our bank.")
    }, []); // empty array means only once

    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        console.log(value);

        if(name === 'SelectedDate')
        {
            setShowValidationMessage(false)
            SetHolidayData(null)

            const selectDt = new Date(value);
            console.log(selectDt.getDay())
            setFormInput(values => ({...values, [name]:value, "Day": selectDt.getDate(),
                "Month":selectDt.getMonth()+1,
                "Year":selectDt.getFullYear(),
                "DayOfWeek":selectDt.getDay()
            }))

        }
        else{
            setFormInput(values => ({...values, [name] : value}))
        }
    };

    const ValidateDate = function(){
        if(formInput.Day> 0 && formInput.Month > 0 && formInput.Year > 0)
        {
            if (formInput.DayOfWeek == 0) {
                setShowValidationMessage(true);
                setValidationMessage("Sorry, we are off on sundays..!!");
                console.log({ShowValidationMessage})
                return false;
            }
            setShowValidationMessage(true);
            setValidDateSelected(true)
            console.log({ShowValidationMessage})
            return true;
        }
        else{
            setValidDateSelected(false)
            setValidationMessage("Please select a valid date")
            console.log({ShowValidationMessage})
            return false;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('form Submitted for :' + formInput.Year + ' ' + formInput.DayOfWeek);

        if(ValidateDate() && formInput.DayOfWeek > 0 )
        {
        fetch(baseURL + '&year=' + formInput.Year + '&month=' + formInput.Month + '&day=' + formInput.Day, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data != null && data.length > 0) {
                    SetHolidayData(data[0])
                }
                else{
                    SetHolidayData({})
                }
            }).then(console.log(holidayData)) // Displays the firstName from the API response     
            // setShowValidationMessage(true)
        }  
    };

    return (
        <>
            {holidayData === null ? 
            ShowValidationMessage && <h2 id="lblSelectValidDate">{validationMessage}</h2>
            :
            holidayData.name ?
                (
                    <div>
                        <HolidayMessage Holiday={holidayData}></HolidayMessage>
                    </div>
                ) :
                formInput.DayOfWeek>0 &&
                (
                    ShowValidationMessage &&
                    <div id="lblWeAreopen">
                        <h1>Hey! we are open on { formInput.SelectedDate}..🎈!!!</h1>
                    </div>
                )
            }

            <form onSubmit={handleSubmit}>
                <label> Select Date : <input id="selectDate" type="date" name="SelectedDate" value={formInput.SelectedDate || ""} onChange={handleChange}></input></label>
                <br></br>
                <button type="submit">Check status</button>
            </form>
        </>        
    );
}

export default BankHoliday;