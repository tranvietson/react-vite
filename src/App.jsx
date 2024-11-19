import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { getAccountAPI } from './services/api.service';
import { AuthContext } from './components/context/auth.context';
import { Spin } from "antd";

const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);
  useEffect(() => {
    fetchUserInfor();
  }, []);

  const delay = (miliSeconds) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, miliSeconds)
    })
  }

  const fetchUserInfor = async () => {
    const res = await getAccountAPI();
    await delay(3000);
    if (res.data) {
      setUser(res.data.user);
      console.log(">>>>>>> check user data:", res.data);
    }
    setIsAppLoading(false);
  }

  return (
    <>
      {
        isAppLoading === true ?
          <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}>
            <Spin />
          </div>
          :
          <>
            <Header />
            <Outlet />
            <Footer />
          </>
      }
    </>
  )
}

export default App
