import React,{Component,Fragment,useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom';
import axios from "axios";
 



function UserJoinPage() {   
   
    const navigate =useNavigate();
    const [mail, setMail]=useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");  
    const handleMailChange = (value) => {
      setMail(value);
    };
  
    const handlePasswordChange = (value) => {
      setPassword(value);
    };
    
    const sendRequest=(path)=>{
        fetch("http://localhost:8080/auth/" +path,{
         method: "POST",
         headers:{
          "content-type": "application/json",
         },
         body:JSON.stringify({
          mail :mail,
          password:password
         }),
        })
        .then((res)=>res.json())
        .then((result)=>
                        localStorage.setItem("currentCustomer",result.customerId)
                        //console.log(result)     
                    
                      )
        .catch((err)=>console.log(err))
    };
    const handleRegister=()=>{
      
     
     
      sendRequest("register");
     
    };
    const handleLogin=()=>{
      sendRequest("login");
      if(localStorage.getItem("currentCustomer") !=null){
        navigate("/AccountHomePage");
        
      }
      else {
        alert("E-posta ya da şifre yanlış ya da hesap yok (Doğru olduğundan eminseniz diğer alanları boş bırakarak tekrar giriş yapa tıklayın sonradan düzelteceğim burayı)");
      }
      
      

    };

   
     return(
  
        <div className="boxx">
            <div className="boxpozition">
            <div className="Usrname">
                <p>Kullanıcı Adı</p>
            </div>
            <div className="Usrnbx">
                <form ><input type="text" className="uname"   onChange={(i) => handleMailChange(i.target.value)} required/></form>
            </div>
            <div className="Usrname">
                <p>Şifre</p>
            </div>
            <div className="Usrnbx">
            <input type="password" className="uname"  onChange={(i) => handlePasswordChange(i.target.value)} required/>
            </div>
            
                <button className='Usradd' onClick={handleRegister}>
       Kayıt Ol
  </button>
  <form>
  
    
 <button className='Usradd' onClick={handleLogin}>Giriş Yap</button>
            
</form>
           
              
           
            </div>
            
            
        </div>
       
    )

    
}

export default UserJoinPage;