import './App.css';
import Header from './components/Header'
import UserProvider from './providers/userProvider';
import Router from './Router'

function App() {
  return (
  <>
  <UserProvider>
  <Header />
  <Router />
  </UserProvider>
  </>
  );
}

export default App;
