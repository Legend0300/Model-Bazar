import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'

import NotFound from './Components/NotFound/NotFound.jsx'
import VoucherTable from './Components/Voucher/Voucher.jsx'
import Transactions from './Components/Transactions/Transactions.jsx'
import HomeDashboard from './Components/Dashboard/HomeDashboard.jsx'
import FileApp from './Components/Files/FileApp.jsx'
import Report from './Components/Reports/Report.jsx'
import Allotment from './Components/Allotments/Allotment.jsx'

// layouts
import Nav from './layouts/Nav.jsx'
import Login from './Components/Login/Login.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/login" element={<Login />}/>
    <Route path="/" element={<Nav />}>
      <Route  index element={<HomeDashboard />} />
      <Route path="vouchers" element={<VoucherTable />} />
      <Route path="transactions" element={<Transactions />} />
      <Route path="reports" element={<Report url={"http://localhost:3000/testdata"} />} />
      <Route path="files" element={<Report url={"http://localhost:3000/files"}/>}/>
      <Route path="allotment" element={<Allotment />} />
      {/* <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="help" element={<HelpLayout />}>
      <Route path="faq" element={<Faq />} />
      <Route path="contact" element={<Contact/>} action={contactAction} />
    </Route> */}
    </Route><Route path="*" element={<NotFound />} />
    <Route path='file-uploader' element={<FileApp />} />
    </>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App