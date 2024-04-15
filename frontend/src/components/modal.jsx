import { cn } from "../lib/utils"
import { useState } from "react"
import { X } from 'lucide-react'

export default function Modal({ children, innerText, modalClasses ,className}) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <button className="text-white" onClick={() => setIsOpen(prev => !prev)}>{innerText}</button>

            <div className={cn("hidden absolute top-20 px-4 py-2 bg-slate-300 border rounded-lg shadow w-fit",className, { "block": isOpen })}>
                <div className="flex items-center">
                    <button onClick={() => setIsOpen(false)} className="ml-auto border p-1 rounded-md text-slate-500"><X /></button>
                </div>

                <div className={cn("mt-4",modalClasses)}>
                    {children}
                </div>
            </div>
        </div>
    )
}