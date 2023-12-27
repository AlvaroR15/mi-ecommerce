import './App.css'
import Footer from './components/Footer/Footer';
import ProductsList from './components/ListPage/ProductsList';
import UsersList from './components/ListPage/UsersList';
import MainPage from './components/MainPage/MainPage';
import TopBar from './components/TopBar/TopBar';

import { Route, Routes } from 'react-router-dom';

function App() {

   return (
      <div id="wrapper">
         <div id="content-wrapper" className="d-flex flex-column">

            <div id="content">
               <TopBar />
               <Routes>
                  <Route path="/" exact={true} element={<MainPage/>} />
                  <Route path="/products" exact={true} element={<ProductsList/>}/>
                  <Route path="/users" exact={true} element={<UsersList/>}/>
               </Routes>
            </div>

            <Footer />
         </div>

      </div>
   );
}

export default App;
