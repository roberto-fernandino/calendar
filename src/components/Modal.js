import React, { useState } from "react";
import { X } from "@phosphor-icons/react";

export function EventModal({ isOpen, onClose, onSave, date}) {
  
  if (!isOpen) return null;


  return (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"> 
      <div className="bg-[#DEDEDE] rounded-md flex flex-col items-center p-5"> 
        <div className="w-full flex flex-row justify-end">
          <X size={32} onClick={onClose} className="bg-red-300 cursor-pointer p-3 rounded-full" />
        </div>
        <h2 className="text-[rgb(0,0,0)]">Create an event</h2>
      </div>
    </div>
  )
}

