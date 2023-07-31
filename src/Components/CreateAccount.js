import React from 'react'
import "../App.css"
function CreateAccount(props) {
  const {open,onClose}=props;
  if (!open) return null;
  return ( 
    <div className='popup' >

    <div className='popup-inner'>
       
        <button className='close-btn'  onClick={onClose}>
            close
        </button>
        <div>
        <p>lkdsajfsaşlfjdsaşlkfjdsaşlkfdsaşlkjfdsaşlkjfşlkdsajfşlkdsjk
          saşlkdjfşlkdsajfdsaşlkfjşlksajfdşlksa
        </p>
        </div>
        
    </div>
    </div>
  );
  
}

export default CreateAccount