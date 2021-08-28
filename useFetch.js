import { useState, useRef , useEffect } from 'react';

export const useFetch = ( url ) => {
    const isMounted = useRef(true);
    const [ state, setState ] = useState({ data : null, loading: true, error: null });

    useEffect(() => {
        
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {

        setState({ data : null, loading: true, error: null });

        fetch( url )
        .then( resp => resp.json())
        .then(data => {
            setTimeout(()=> {
                if(isMounted.current){
                    setState({
                        error:null,
                        loading:false,
                        data
                    })
                }
                
            },4000)
            
        })
        .catch( () => {
            setState({
                data:null,
                loading:false,
                error: 'The information could not be loaded'
            })
        })
    },[url]);

    return state;

}
