import './App.css'
import { MainPage } from './components/Main/MainPage';
import { Header } from './components/Partials/Header/Header'
import { Footer } from './components/Partials/Footer/Footer'
import './components/Partials/partials.css'
import { FilterProducts } from './components/Main/FilterProducts/FilterProducts';
import { BannerMain } from './components/Partials/BannerMain';
import { FormCreate } from './components/Dashboard/FormProduct/FormCreate';
import { FormEdit } from './components/Dashboard/FormProduct/FormEdit';
import { ListProducts } from './components/ListProducts/ListProducts'
import { AuthForm } from './components/Forms/AuthForm/AuthForm'
import { Route, Routes } from 'react-router-dom';
import { Register } from './components/Forms/AuthForm/Register';
import { Login } from './components/Forms/AuthForm/Login';
import { Cart } from './components/ListProducts/Cart/Cart'

function App() {

   return (
      <>
      < Header />
         <main>
            < Routes>
               < Route path='/' exact={true} element={<MainPage/>} />
               < Route path='/' exact={true} element={<FilterProducts/>} />
               < Route path='/' exact={true} element={<BannerMain/>} />
               < Route path='/' exact={true} element={<BannerMain/>} />
               < Route path='/register' exact={true} element={
                  <AuthForm title='Completa el formulario con tus datos'>
               < Register /></AuthForm>}/>
               < Route path='/login' exact={true} element={
                  <AuthForm title='¡Que gusto verte de nuevo!'>
               < Login /></AuthForm>}/>
               < Route path='/products' exact={true} element={<ListProducts/>} />
               < Route path='/cart' exact={true} element={<Cart/>} />
               < Route path='admin/create' exact={true} element={< FormCreate />} />
               < Route path='admin/edit' exact={true} element={< FormEdit />} />
            </Routes>
         </main>
      < Footer />
      </>

        
   );
}

export default App;
