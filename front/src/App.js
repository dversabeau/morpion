import './App.css';
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import MainLayout from './layouts/MainLayout';




const App = () => {

  return (
    <div className="App">
      <Header />
      <MainLayout />
      <Footer />
    </div>
  );
}

export default App;
