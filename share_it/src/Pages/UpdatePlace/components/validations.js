export const validator=(list,value)=>{
      
     let isValid=true;
     list.map((item)=>{
         if(item.type==='REQUIRED'){
            isValid=isValid && value.length
         } 
         if(item.type==='MIN_LENGTH'){
             isValid=isValid && value.length>=item.min
         }
         if(item.type==='MAX_LENGTH'){
             isValid=isValid && value.length<item.max
         }
     })

     return isValid;

}