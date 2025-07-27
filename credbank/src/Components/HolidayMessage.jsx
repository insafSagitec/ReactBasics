import React from "react";

function HolidayMessage(Prop)
{
    // console.log(Prop);
    return (<>
    <h1> Today is Holiday on account of {Prop.Holiday.name}.</h1>
    </>);
}

export default HolidayMessage