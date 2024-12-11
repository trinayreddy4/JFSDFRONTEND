import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import RoutesConfig from './RoutesConfig';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const publicRoutes = ['/','/facultylogin','/studentlogin'];
    // alert(location.pathname);
    if (!username && !publicRoutes.includes(location.pathname)) {
      navigate('/'); 
    }
  }, [navigate, location]);

  return (
    <div>
      <RoutesConfig />
    </div>
  );
}

export default App;
