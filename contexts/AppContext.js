import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

import { getObjeciones } from '../actions/objeciones';


const AppContext = React.createContext();

export function AppProvider(props){
    
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    
    const [loadingObjeciones, setLoadingObjeciones] = useState(false)
    
    const [notifications, setNotifications] = useState([])
    
    const setters = [setLoadingObjeciones]

    
    useEffect(()=>{
        setNotifications([])
    }, [pathname])


    useEffect(()=>{
        setAllLoading()
        if(!window.location.href.includes('login')){
            setAllLoading(true)
            dispatch(getObjeciones()).then(()=>setLoadingObjeciones(false))        
        }
    }, [pathname])

    function setAllLoading(){
        for(let setter of setters){
            setter(true)
        }
    }

    const value = useMemo(()=>{
        return ({
            loading: {objeciones: loadingObjeciones},
            notifications,
            setNotifications
        })
    }, [loadingObjeciones, notifications])

    return <AppContext.Provider value={value} {...props} />

}

export function useAppContext(){
    const context = React.useContext(AppContext)
    if(!context){
        throw new Error("useAppContext must be inside AppContext provider")
    }
    return context;
}