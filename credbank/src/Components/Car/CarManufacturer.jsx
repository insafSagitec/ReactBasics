import React, { useEffect, useState } from "react"

function CarManuFacturer()
{
    const[apiResult, setApiResult] = useState({});

    useEffect(() =>{
        fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json').then(
            response => response.json()
        ).then( data => {
            setApiResult(data || {})
        })
        .catch(error =>
        {
            console.log('error fetching the records.', error)
        })
    }, [])

    useEffect(() => {
        if (apiResult) {
          console.log(apiResult);
        }
      }, [apiResult]);
      
    return (
        <>
            <h1> World car Manufacturers..!!</h1>
            <table>
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
                    {apiResult && apiResult.Results && apiResult.Results.map((row, key) => (
                        <tr key={key}>
                            <td>{row.Country}</td>
                            <td>{row.Mfr_CommonName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default CarManuFacturer