import React from 'react'
import { BiLogIn } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Loginbtn() {
    return (
        <div>
            <a href="/login" >
                <button className="bg-red-600 px-3 rounded-lg py-2  flex items-center gap-2 flex-row"><BiLogIn /> Login</button>
            </a>
        </div>
    )
}
