'use client'

import { useState,useEffect } from "react"
import { SettingsModal } from "../modals/settingsmodal"
import { CoverImageModel } from "../modals/cover-image-modle"
export const ModalProvider=()=>{
const [isMounted,setIsMounted] = useState(false)
useEffect(()=>{
    setIsMounted(true)
},[])
if(!isMounted){
    return null
}

return (
    <>
    <SettingsModal></SettingsModal>
    <CoverImageModel></CoverImageModel>
    </>
)
}