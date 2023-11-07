import { useState } from "react"
import Nick from "../commponet/edit_nick"


function Settings() {
    const [reg, setreg] = useState(false);
    const [nick,setnick] = useState('')
function f() {
    setreg(true)
}

    return (
        <>
        <h1
        id="view_name"
        >Ваш нік:{localStorage.nick}
        </h1>

        <div 
        id="Create_nick"
        onClick={f}
        >{localStorage.nick && "Змінити нік" || !localStorage.nick && "Створити нік"}</div>
    {reg && 
            <input
            type="text"
            id="input_name"
            value={nick}
            onChange={(event) => {setnick(event.target.value);setnick(event.target.value);localStorage.nick = nick}}
            placeholder="Ведіть ваш нік:"
            />}
       <h1
        id="g_name"
        onClick={()=>window.location.href = "/"}
        >Повернутись
        </h1>

        </>

    
    )
}

export default Settings