import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Gallery />
      <About />
      <Contact />
      
      <footer style={{ 
        backgroundColor: 'black', 
        padding: '2rem 0', 
        textAlign: 'center', 
        borderTop: '1px solid #333' 
      }}>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Granota Tattoo. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}

export default App;
