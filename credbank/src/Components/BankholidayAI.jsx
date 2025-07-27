
import React, { useState, useEffect } from "react";
import HolidayMessage from "./HolidayMessage";

// Simple spinner component
function Spinner() {
  return (
    <div style={{ textAlign: "center", marginTop: "1rem" }}>
      <div className="spinner" style={{
        width: "40px",
        height: "40px",
        border: "5px solid lightgray",
        borderTop: "5px solid blue",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function BankHolidayAI() {
  const baseURL = "https://holidays.abstractapi.com/v1/?api_key=YOUR_API_KEY&country=IN";
  const [formInput, setFormInput] = useState({ SelectedDate: "", DayOfWeek: 0, Day: 0, Month: 0, Year: 0 });
  const [holidayData, setHolidayData] = useState(null);
  const [showValidationMessage, setShowValidationMessage] = useState(true);
  const [validationMessage, setValidationMessage] = useState("Please select a date when you are planning to visit our bank.");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "SelectedDate") {
      const selectedDate = new Date(value);
      setFormInput({
        SelectedDate: value,
        Day: selectedDate.getDate(),
        Month: selectedDate.getMonth() + 1,
        Year: selectedDate.getFullYear(),
        DayOfWeek: selectedDate.getDay()
      });
      setHolidayData(null); // Reset old data
      setShowValidationMessage(false); // Hide old validation
    }
  };

  const ValidateDate = () => {
    if (!formInput.Day || !formInput.Month || !formInput.Year) {
      setValidationMessage("Please select a valid date.");
      setShowValidationMessage(true);
      return false;
    }

    if (formInput.DayOfWeek === 0) {
      setValidationMessage("Sorry, we are off on Sundays!");
      setShowValidationMessage(true);
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHolidayData(null); // Clear previous result
    if (!ValidateDate()) return;

    setIsLoading(true);
    const url = `${baseURL}&year=${formInput.Year}&month=${formInput.Month}&day=${formInput.Day}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setHolidayData(data && data.length > 0 ? data[0] : null);
        setShowValidationMessage(true);
        setValidationMessage(data && data.length > 0 ? "" : "It’s a regular working day.");
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setValidationMessage("Failed to fetch holiday info.");
        setShowValidationMessage(true);
      })
      .finally(() => setIsLoading(false));
  };

  const isHoliday = holidayData && holidayData.name;
  const isRegularOpenDay = holidayData === null && formInput.DayOfWeek > 0;

  return (
    <>
      {isLoading && <Spinner />}

      {!isLoading && showValidationMessage && validationMessage && (
        <h2>{validationMessage}</h2>
      )}

      {!isLoading && isHoliday && (
        <HolidayMessage Holiday={holidayData} />
      )}

      {!isLoading && isRegularOpenDay && (
        <div id="lblWeAreOpen">
          <h1>Hey! We are open on {formInput.SelectedDate} ✌🎈</h1>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          Select Date:{" "}
          <input
            type="date"
            name="SelectedDate"
            value={formInput.SelectedDate || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Check status</button>
      </form>
    </>
  );
}

export default BankHolidayAI;