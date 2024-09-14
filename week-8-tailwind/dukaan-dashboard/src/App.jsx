import './App.css'
import React from 'react'
import { Fotter} from "./components/Fotter"
import { OverView } from './components/Overview'
import { Topbar } from './components/Topbar'
import { Table }  from "./components/Table"
import { Sidebar } from './components/Sidebar'
import { Transactions } from './components/Transactions'

function App() {
  

  return (
      <div className="bg-white-50">
          <Sidebar />
          <div className="pl-10">
              <div className="border-b border-black-150 sm:pl-64 bg-white-500">
                  <Topbar />
              </div>

              <div className=" m-5 mb-0 sm:ml-64 grid gap-8">
                  <OverView />
                  <div className="grid gap-6">
                      <Transactions />
                      <Table />
                  </div>
                  <Fotter />
              </div>
          </div>
        

      </div>
      
  )
}

export default App
