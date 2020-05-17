import React from 'react'

export const useForm = (initalState) => {
    const [state,setstate]=React.useState(initalState);
    

    const handler=React.useCallback((event)=>{
        const name=event.target.name;
        const value=event.target.value;
       setstate((prev)=>{
           return {...prev,[name]:value}
       })
    },[])

    return([state,handler])
}
