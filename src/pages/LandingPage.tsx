import '../styles/shared.css'
import './LandingPage.css'

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { GetSession, ClearSession } from '../utils/session';
import { Logout } from '../utils/back4app';
import LoginModal from '../components/LoginModal';
import flowServeLogo from '../assets/logo.svg'
import photo1 from '../assets/photo1.jpg'
import photo2 from '../assets/photo2.jpg'
import photo3 from '../assets/photo3.jpg'
import photo4 from '../assets/photo4.jpg'

export default function LandingPage(){
  const [user, setUser] = useState<any | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  useEffect(() => {
    ( () => {
      const session = GetSession();
      if (session && session.sessionToken) {
        setUser(session.user);
      }else {
        ClearSession();
        setShowLogin(true);
    }
    })();
  }, []);

  const handleLoginSuccess = (session: any) => {
    setUser(session.user);
    setShowLogin(false);
  };

    const LogOut = async () => {
        try {
            await Logout();
            setUser(null);
            setShowLogin(true);
        } catch (e) {
            console.error('Logout error', e);
        }
    }
  
  return (
    <>
        <section id="center">
            {showLogin && <LoginModal onSuccess={handleLoginSuccess} />}
            {user &&        
                <div className="page-container">
                    <div className="page-content vertical-center">
                        <img className="landing-logo" src={flowServeLogo} alt="FlowServe logo"/>
                        <div className="landing-grid">
                            <img className="grid-item" src={photo1} />
                            <img className="grid-item" src={photo2} />
                            <img className="grid-item" src={photo3} />
                            <img className="grid-item" src={photo4} />
                        </div>
                        <br />
                        <h2 className="landing-welcome">Bienvenido</h2>
                        <div className="landing-user">{user ? user.name : 'Invitado'}</div>
                        <div className="actions">
                            <button className="logout-btn" onClick={LogOut}>Cerrar sesión</button>
                        </div>
                    </div>

                    <div className="page-footer">
                        <div className="footer-center">
                            <Link to="/initial-data">
                                <button className="primary">Empezar</button>
                            </Link>
                        </div>
                    </div>
                </div>
        }
        </section>
    </>
  )
}
