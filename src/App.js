
import './App.css';
import { Dashboard } from './component/Dashboard';
import { FileUpload } from './component/FileUpload';
import { Footer } from './component/Footer';
import { Home } from './component/Home';
import { Incoming } from './component/Incoming';
import { Index } from './component/Index';
import { Login } from './component/Login';
import { Navigation } from './component/Navigation';
import { Outgoing } from './component/Outgoing';
import { Report } from './component/Report';
import { TransitSheet } from './component/TransitSheet';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { ViewOutgoing } from './component/ViewOutgoing';
import { ViewIncoming } from './component/ViewIncoming';
import { ViewDiary } from './component/ViewDiary';
import { ViewTransit } from './component/ViewTransit';
import { AnnualReport } from './component/AnnualReport';
import { Quarterly } from './component/Quarterly';
import { IncomingSearchResult } from './component/IncomingSearchResult';
import { OutgoingSearchResult } from './component/OutgoingSearchResult';
import { TransitSearchResult } from './component/TransitSearchResult';
import { DiarySearch } from './component/DiarySearch';
import { UserDash } from './component/UserDash';
import { Q2 } from './component/Q2';
import { Q3 } from './component/Q3';
import { Q4 } from './component/Q4';
import { YearOutgoing } from './component/YearOutgoing';
import { YearIncoming } from './component/YearIncoming';
import { YearTransit } from './component/YearTransit';
import { YearDiary } from './component/YearDiary';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path="/" element={<Index />}/>
        <Route path="admin" element={<Dashboard />}/>
        <Route path="user" element={<UserDash />}/>
        <Route path='login' element={<Login />}/>
        <Route path='y-outgoing' element={<YearOutgoing />}/>
        <Route path='y-incoming' element={<YearIncoming />}/>
        <Route path='y-transit' element={<YearTransit />}/>
        <Route path='y-diary' element={<YearDiary />}/>
        <Route path='outgoing' element={<ViewOutgoing />}/>
        <Route path='incoming' element={<ViewIncoming />}/>
        <Route path='diary' element={<ViewDiary />}/>
        <Route path='transit' element={<ViewTransit />}/>
        <Route path='annual' element={<AnnualReport />}/>
        <Route path='quarter' element={<Quarterly />}/>
        <Route path='second-quarter' element={<Q2 />}/>
        <Route path='third-quarter' element={<Q3 />}/>
        <Route path='fourth-quarter' element={<Q4 />}/>
        <Route path='/search' element={<IncomingSearchResult />}/>
        <Route path='/diary-search' element={<DiarySearch />}/>
        <Route path='/out-search' element={<OutgoingSearchResult />}/>
        <Route path='/transit-search' element={<TransitSearchResult />}/>
      </Routes>
    </BrowserRouter>
  //  <Incoming/>
  // <FileUpload/>
  // <Outgoing/>
  // <TransitSheet/>
  // <Dashboard/>
  // <Home/>
  // <Report/>
  // <Login/>
  // <Index/>
  // <ViewOutgoing/>
  // <ViewIncoming/>
  // <ViewDiary/>
  // <ViewTransit/>
  );
}

export default App;
