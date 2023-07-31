import React,{useState,useEffect,useRef} from "react";
import TransactionHistory from "./TransactionHistory";


function Account(props){
const [amount,setAmount]=useState(null);
const [id,setAccountId]=useState();
const [transactionHistoryList,setTransactionHistoryList]=useState([]);
const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const {accountName,accountId,accountBalance}=props;
const isInitialMount = useRef(true);
const [refresh, setRefresh] = useState(false);
const [expanded, setExpanded] = useState(false);
const [transactionType,setTransactionType]=useState(null);
const now=new Date();




const handleAmount= (value)=>{
    setAmount(value);
}
const setRefreshTransaction =()=>{
  setRefresh(true);

}


const refreshTransactionHistoryList=()=>{

  fetch("http://localhost:8080/transactions?accountId="+accountId)
  .then(res => res.json())
    .then(
        (result) => {
            setIsLoaded(true);
            setTransactionHistoryList (result);     
               console.log(result);
        },
        (error) => {
            console.log(error)
            setIsLoaded(true);
            setError(error);
        }
    )
    setRefresh(false);
}



    const PostMonneyHistory=(transactionType)=>{
      fetch('http://localhost:8080/transactions?accountId='+accountId, {
        method: 'POST',
        body: JSON.stringify({
                transactionAmount:amount,
                accountId:accountId,
                transactionType:transactionType,
                dateTransaction:now,
                

  
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

    const MonneyProcces= (path) => {
        fetch("http://localhost:8080/accounts/"+path+"/"+accountId, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            "Authorization" : localStorage.getItem("tokenKey"),

          },
          body: JSON.stringify({
           amount:amount
         
          }),
        })
          .then((res) => res.json())
          .catch((err) => console.log(err))
      }

      const handleClickSub=()=>{
        setAccountId(accountId);

        MonneyProcces("withdraw");PostMonneyHistory("Para Çekmek");
        setTransactionType("Para çekmek");
        console.log(transactionType);
        
      }



    const handleClickAdd=()=>{
      setAccountId(accountId);
        
        MonneyProcces("deposit");
        setTransactionType("Para Yüklemek");
        PostMonneyHistory("Para Yüklemek");
        console.log("İşlembaşarılı")

       
    }



    const handleClickHistory=()=>{
      setExpanded(!expanded);
      refreshTransactionHistoryList();
      console.log(transactionHistoryList);

    }
    useEffect(()=>{
      if(isInitialMount.current)
      isInitialMount.current = false;
    else
      refreshTransactionHistoryList();
      
    },[refresh])
    return(
    <div key={accountId}>
              <div  className="containerAccountSlider">
                <h2>Hesap adı:{accountName}</h2>
                <h3>Mevcut bakiye:{accountBalance}</h3>

                <div><form>
                <button type="submit"  className="mnyadd" onClick={handleClickAdd} >Para Ekle</button>
                <input type="number"  className="mnym" min={1} max={10000} onChange={(i)=>handleAmount(i.target.value)} />
                </form>
                </div>
                <div><form>
        <button type="submit"  className='mnypl' onClick={handleClickSub}>Para çek</button>
       
      <input type="number" name='pramount' className="mnym" min={1} max={10000} onChange={(i)=>handleAmount(i.target.value)} />
      </form>
    </div>  
    <div>
          <button type ="submit" className="btnhstry" onClick={handleClickHistory}>Geçmiş</button>
      </div>
        
    </div>


         
         <div  className="hstboxx">
          <div className="tableHeaer">
         <table  border="1">
             <thead ><tr>
                    <th>İşlem Miktarı</th>
                    <th>İşlem Türü</th>
                    <th> İşlem zamanı</th>
                </tr>
                </thead>   
                </table>
                </div>
          {error?"Yüklenmedi": isLoaded?
          transactionHistoryList.map(transaction=>(
            <TransactionHistory key={transaction.id} 
            transactionId={transaction.id}
            transactionAmount={transaction.transactionAmount}
            transactionType={transaction.transactionType}
            transactionDate={transaction.dateTransaction}
            

            ></TransactionHistory>
          )):"Yükleniyor"}
          

         </div>

    </div>


);

}
export default Account;