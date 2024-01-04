import Footer from './Footer/Footer';
import ProductsList from './ListPage/ProductsList';
import UsersList from './ListPage/UsersList';
import MainPage from './MainPage/MainPage';
import TopBar from './TopBar/TopBar';

import { Route, Routes } from 'react-router-dom';

export const Wrapper = () => {
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
    )
}