"use client"

import { ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

export default function SettingsPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [autoAddEvents, setAutoAddEvents] = useState(true)
  const [phonePublic, setPhonePublic] = useState(true)

  useEffect(() => {
    // Apply theme class to document element
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`flex flex-col h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
      {/* Settings content */}
      <div className="p-4 mx-3 flex-1 overflow-auto">
        <div className="w-full">
          {/* Appearance Setting with Theme button */}
          <div className={`py-4 border-b ${theme === 'dark' ? 'border-gray-700' : ''} flex justify-between items-center`}>
            <div>
              <h3 className="font-medium mb-1">Appearance</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : ''}`}>
                Customise how your theme looks on your device
              </p>
            </div>
            <div className="ml-4">
              <button 
                className={`${theme === 'dark' ? 'bg-gray-700 text-white' : ''} text-xs px-3 py-1 rounded flex items-center`}
                onClick={toggleTheme}
              >
                {theme === 'light' ? 'Light' : 'Dark'}
                <ChevronRight className="h-3 w-3 ml-1" />
              </button>
            </div>
          </div>

          {/* Calendar Setting */}
          <div className={`py-4 border-b ${theme === 'dark' ? 'border-gray-700' : ''} flex justify-between items-center`}>
            <div>
              <h3 className="font-medium mb-1">Automatically Add Events to Calendar</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : ''}`}>
                Save time by auto-adding events to your calendar, or manually enter them for more control.
              </p>
            </div>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input 
                type="checkbox" 
                id="calendar-toggle" 
                className="sr-only" 
                checked={autoAddEvents}
                onChange={() => setAutoAddEvents(!autoAddEvents)}
              />
              <label
                htmlFor="calendar-toggle"
                className={`block overflow-hidden h-6 rounded-full cursor-pointer ${autoAddEvents ? 'bg-blue-600' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}
              >
                <span className="block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out" 
                  style={{ transform: autoAddEvents ? 'translateX(16px)' : 'translateX(0)' }}></span>
              </label>
            </div>
          </div>

          {/* Phone Privacy Setting */}
          <div className={`py-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
            <div>
              <h3 className="font-medium mb-1">Make your Phone Public</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                Keep your phone private for safety, or share it for convenience.
              </p>
            </div>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input 
                type="checkbox" 
                id="phone-toggle" 
                className="sr-only" 
                checked={phonePublic}
                onChange={() => setPhonePublic(!phonePublic)}
              />
              <label
                htmlFor="phone-toggle"
                className={`block overflow-hidden h-6 rounded-full cursor-pointer ${phonePublic ? 'bg-blue-600' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}
              >
                <span className="block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out" 
                  style={{ transform: phonePublic ? 'translateX(16px)' : 'translateX(0)' }}></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}