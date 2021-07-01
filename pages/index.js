import { useState } from 'react'
import Admin from '../components/CookieStandAdmin'
import Login from '../components/LoginForm'


export default function Home() {

  const [userName,setUserName] = useState('Momani')
  const [savedPassword,setsavedPassword] = useState('password')
  const [logged,setLogged] = useState(false)

  function change(username,password){
    if (userName == username){
      setLogged(true);
    }
  }

  return (
    <div className="bg-green-200">
      {logged ? <Admin username={userName} /> : <Login change={change}/>}
    </div>
  )
}



  