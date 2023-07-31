import React,{Component,Fragment,useState,useEffect} from 'react';
import axios from 'axios';
import { Route, Router,useNavigate } from 'react-router-dom';
import Account from './Account';
import "../App.css"
import CreateAccount from './CreateAccount';





function ACTP(){
    const navigate =useNavigate();

  const [isOpen,setIsOpen]=useState(false);
  const [balance,setBalance]=useState(0);
  const[name,setName]=useState(null);
  const[currentIndex,setCurrentIndex]=useState(0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [accountList, setAccountList] = useState([]);

  const goToPrevious = ()=>{
      const isFirstAccount=currentIndex===0;
      const newIndex =isFirstAccount ?accountList.length-1:currentIndex-1;
      setCurrentIndex(newIndex);

  }
  const goToNext=()=>{
    const isLastAccount=currentIndex===accountList.length-1;
    const newIndex=isLastAccount?0:currentIndex+1;
 setCurrentIndex(newIndex);

  }
  
  const createNewAccount=()=>{
    fetch('http://localhost:8080/accounts', {
        method: 'POST',
        body: JSON.stringify({
                
              customerId:localStorage.getItem("currentCustomer"),
              balance:balance,
              name:name

  
      }),
        headers: {
          'Content-type': 'application/json',

        },
      })
         .then((res) => res.json())
         .then((result) => {
            console.log(result);
         })
         .catch((err) => {
            console.log(err.message);
         });

  }

  const handleLogout=()=>{
   
    localStorage.removeItem("currentCustomer");
    navigate("/");
  


  }
  const handleBalance=(i)=>{
      setBalance(i);

  }
  const handleName=(i)=>{
    setName(i);
  }

  
  const refreshAccounts = () => {
    fetch("http://localhost:8080/accounts?customerId="+localStorage.getItem("currentCustomer"))
    .then(res => res.json())
    .then(
        (result) => {
            setIsLoaded(true);
            setAccountList(result)
            console.log(result);
        },
        (error) => {
            console.log(error)
            setIsLoaded(true);
            
            setError(error);
        }
    )
}
const handleClickOpen = ()=>{
  setIsOpen(!isOpen);
}
const handleCreate =()=>{
  createNewAccount();
}
 
useEffect(() => {
 refreshAccounts()
}, [])

   if(error){
    return (<div>yüklenemedi</div>)
   }else if(!isLoaded){
    <div>yükleniyor</div>
   }else if(isLoaded){
  return (

      <div>
        <h1>Hesaplarım</h1>
        <div> <button className='logout-button' onClick={handleLogout}>Çıkış Yap</button></div>
        <button className='createAccount' onClick={handleClickOpen}>Hesap Oluştur</button>



         
        
        
          
             {accountList.length===0?"Hesap oluştur":
              <div>
               <Account 

                accountId={accountList[currentIndex].id}  
                 accountName={accountList[currentIndex].name} 
                 accountBalance={accountList[currentIndex].balance}>
               </Account>
              <div onClick={goToPrevious} className=" leftArrowStyles"> ❰</div>
               <div onClick ={goToNext} className="rightArrowStyles">❱</div>
               </div>
   }
   
              
              
              
              {isOpen &&( <div>
               
                  <div className='popup' >

<div className='popup-inner'>
   
    <button className='close-btn'  onClick={handleClickOpen}>
        close
    </button>
    
    <div>
     <form><h3>Hesap ismi :</h3>
     <input type='text' className='mym' onChange={(i)=>handleName(i.target.value)}></input>
     <h3>Varlık :</h3>
      <input type='number' className='mynm' onChange={(i)=>handleBalance(i.target.value)}></input>
      <button type='submit' className='btnCreate' onClick={handleCreate} > Oluştur</button>
      </form>
    </div>
</div>
</div></div>
        
        
        
        
        )}

              
              
       

     

      </div>
     
    )}
  }

export default ACTP;
  /*  {localStorage.getItem("currentUser") == null? "":
                 <PostForm userId = {localStorage.getItem("currentUser")} 
                 userName = {localStorage.getItem("userName")}  refreshPosts = {refreshPosts}/>}*/