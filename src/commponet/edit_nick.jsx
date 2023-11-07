import { useState } from "react"



function Nick() {
const [nick,setnick] = useState('')

    return (


            <input
            type="text"
            id="input_name"
            value={nick}
            onChange={(event) => {setnick(event.target.value);localStorage.nick = nick}}
            placeholder="Ведіть ваш нік:"
            />

    )
}

export default Nick