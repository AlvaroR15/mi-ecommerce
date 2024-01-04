import './App.css'
import { MainPage } from './components/Main/MainPage';
import { Header } from './components/Partials/Header/Header'
import { Footer } from './components/Partials/Footer/Footer'
import './components/Partials/partials.css'

function App() {

   return (
      <>
      < Header />
         <main>
            < MainPage />
         </main>
      < Footer />
      </>

        
   );
}

export default App;
