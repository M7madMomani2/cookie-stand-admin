import { useState } from 'react'
import { hours } from "../data"

export default function Main(props) {

    const [location,setLocation] = useState("");
    const [minCustPerHr,setMinCustPerHr] = useState("");
    const [maxCustPerHr,setMaxCustPerHr] = useState("");
    const [avgCookie,setAvgCookie] = useState("");
    const [report,setReport] = useState("");
    const [summation,setSummation] = useState("")

    function locHandler(event){
        setLocation(event.target.value);
    }
    function minHandler(event){
        setMinCustPerHr(event.target.value);
    }
    function maxHandler(event){
        setMaxCustPerHr(event.target.value);
    }
    function avgHandler(event){
        setAvgCookie(event.target.value);
    }

    function onCreate(event){
        event.preventDefault();
        let custmer;
        let cookie;
        let cummulative = 0
        const result = []
        const data = {
            id:report.length + 1,
            location:location,
            cookies:[]
        }
        for (let i = 0; i < 14; i++){
            let rand  = Math.random()
            let sum = rand*(parseInt(maxCustPerHr)-parseInt(minCustPerHr)+1) 
            sum += parseInt(minCustPerHr)
            custmer = Math.floor(parseInt(sum))
            cookie = custmer*parseFloat(avgCookie)
            data.cookies.push(Math.floor(cookie))
            cummulative = Math.floor(cookie)
            for(let j = 0; j < report.length+1; j++){
                cummulative += report[j] ? report[j].cookies[i] : 0
            }
            result.push(cummulative)
        }
        setReport(
            [...report,data]
        )
        setSummation(
            result
        )
        props.setBranches(
            report.length + 1
        )
      }

    return (
        <main className="container mx-auto">
            <form className="container mx-auto w-4/5 bg-green-800 pb-8 ... mb-8 ... pt-8 ... rounded-lg ..." onSubmit={onCreate}>
                <fieldset>
                    <div className="flex flex-col ...">
                        <div className="text-center ... text-xl my-1.5 pb-4">
                            {props.title}
                        </div>
                        <div>
                            <div className="container mx-auto w-11/12 my-1.5" >
                                <label className="mr-8 ..." >location</label>
                                <input onChange={locHandler} className="w-4/5" type="text" name="location" />
                            </div>
                        </div>
                        <div className="container mx-auto w-11/12 my-1.5" >
                            <div className="flex space-x-6 ...">
                                <div className="flex flex-col ... w-1/4 text-xs text-center bg-green-400 p-2 rounded-lg">
                                    <label >Minimum Customers per Hour</label>
                                    <input onChange={minHandler} type="number" name="minCustPerHr" />
                                </div>
                                <div className="flex flex-col ... w-1/4 text-xs text-center bg-green-400 p-2 rounded-lg">
                                    <label >Maximum Customers per Hour</label>
                                    <input onChange={maxHandler} type="number" name="maxCustPerHr" />
                                </div>
                                <div className="flex flex-col ... w-1/4 text-xs text-center bg-green-400 p-2 rounded-lg">
                                    <label >Average Cookies per Sale</label>
                                    <input onChange={avgHandler} type="number" step="0.01" name="avgCookie" />
                                </div>
                                <button className="bg-green-400 w-1/4 rounded-lg">Create</button>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
            <div className="flex flex-col ... text-center ... mb-8 ... container mx-auto w-4/5">
                {(report.length == 0) ? 
                <h2>No Cookie Stands Available</h2> :
                <table className="border-collapse border border-gray-900 rounded-lg">
                    <thead className="bg-green-500">
                        <tr key="0">
                            <th>
                                Location
                            </th>
                            {hours.map(hour => (<th>{hour}</th>))}
                            <th>
                                Totals
                            </th>
                        </tr>
                    </thead>
                    <tbody className="border-collapse border border-gray-900">
                        {report.map(data => (
                            <tr className="border-collapse border border-gray-900" key={data.id}>
                                <td className="border-collapse border border-gray-900">{data.location}</td>
                                {data.cookies.map(cookie => (<td className="border-collapse border border-gray-900">{cookie}</td>))}
                                <td className="border-collapse border border-gray-900">{data.cookies.reduce((acc, curr) => {acc = acc+curr; return acc},0)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="border-collapse border border-gray-900 bg-green-500">
                        <tr className="border-collapse border border-gray-900" key={report.length + 1}>
                            <th className="border-collapse border border-gray-900">Totals</th>
                            {summation.map(sum => (<th className="border-collapse border border-gray-900">{sum}</th>))}
                            <th className="border-collapse border border-gray-900">{summation.reduce((acc, curr) => {acc = acc+curr; return acc},0)}</th>
                        </tr>
                    </tfoot>
                </table>
                }  
            </div>
        </main>
    )
}


