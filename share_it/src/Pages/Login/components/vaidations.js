export const validate=(lists,value)=>{
    let isValid=true;
    lists.map((list)=>{
        if(list.type==='MINLENGTH'){
          isValid=isValid && value.length>=list.min
        }
        if(list.type==='MAXLENGTH'){
          isValid=isValid && value.length<=list.max
        }
        if(list.type==='EMAIL'){
            isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
        }
    })
  return(isValid)
}


