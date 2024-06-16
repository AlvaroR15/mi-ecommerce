import './App.css'
import { MainPage } from './components/Main/MainPage';
import { Header } from './components/Partials/Header/Header'
import { Footer } from './components/Partials/Footer/Footer'
import './components/Partials/partials.css'
import { FilterProducts } from './components/Main/FilterProducts/FilterProducts';
import { BannerMain } from './components/Partials/BannerMain';
import { ListProducts } from './components/ListProducts/ListProducts'
import { AuthForm } from './components/Forms/AuthForm/AuthForm'
import { Route, Routes } from 'react-router-dom';
import { Register } from './components/Forms/AuthForm/Register';
import { Login } from './components/Forms/AuthForm/Login';
import { Cart } from './components/ListProducts/Cart/Cart'
import { Detail } from './components/ListProducts/Detail/Detail';
import { Profile } from './components/User/Profile';
import { Search } from './components/ListProducts/Search/Search';

import { useSearch } from './contexts/SearchContext';
import { EditUser } from './components/Forms/AuthForm/EditUser';

function App() {
   const {control} = useSearch();

   return (
      <>
         < Header />
         <main>
            <Routes>
               {
                  (!control) && < Route path='/' exact={true} element={<MainPage />} />
               }
               {
                  (control) && <Route path='/' exact={true} element={<Search/>} />
               }
               < Route path='/' exact={true} element={<FilterProducts />} />

               < Route path='/' exact={true} element={<BannerMain />} />

               < Route path='/products' exact={true} element={<ListProducts />} />

               < Route path='/products/:id' exact={true} element={<Detail />} />

               < Route path='/cart' exact={true} element={<Cart />} />
               
               < Route path='/register' exact={true} element={<AuthForm title='Completa el formulario con tus datos'>< Register /></AuthForm>} />

               < Route path='/login' exact={true} element={<AuthForm title='¡Que gusto verte de nuevo!'>< Login /></AuthForm>} />

               <Route path='/profile' exact={true} element={<Profile />} />

               < Route path='/edit-my-profile' exact={true} element={
                  
               <AuthForm title='Actualiza tus datos'>< EditUser /></AuthForm>} />
            </Routes>
         </main>
         < Footer />
      </>


   );
}

export default App;
