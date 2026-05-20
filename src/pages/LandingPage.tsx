import '../styles/shared.css'

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { GetSession, ClearSession } from '../utils/session';
import { Logout } from '../utils/back4app';
import LoginModal from '../components/LoginModal';
import './LandingPage.css'
import flowServeLogo from '../assets/logo.svg'

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
                <div className="initial-data page-container">
                    <div className="page-content">
                        <br />
                        <br />
                        <br />
                        <br />
                        <img className="landing-logo" src={flowServeLogo} alt="FlowServe logo"/>
                        <br />
                        <br />
                        <h2 className="landing-welcome">Bienvenido</h2>
                        <div className="landing-user">{user ? user.name : 'Invitado'}</div>
                        <br />
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
