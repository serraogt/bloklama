import React, { useEffect } from 'react';
import { Route, Routes, useBeforeUnload } from 'react-router-dom';
import Home from './pages/Home';
import Mock from './features/mockFeature/Mock';
import Use from './components/Use';
import Contact from './pages/Contact';
import Blocker from './components/Blocker';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, usePrompt } from 'react-router-dom';

function App() {
  const requestIsleniyorMu = useSelector((state) => state.mock.requestIsleniyor);

  function useNavigationBlocker() {
    const history = useNavigate();

    // usePrompt((tx) => {
    //   if (window.confirm("Sayfadan çıkmak istediğinizden emin misiniz?")) {
    //     tx.retry();
    //   }
    // });

    useEffect(() => {
      // Bu, tarayıcı düğmelerini ve iç yönlendirmeleri engeller
      history.block((location, action) => {
        return "Sayfadan çıkmak istediğinizden emin misiniz?";
      });
    }, [history]);
  }

  // // Kullanıcı sayfadan ayrılmak istediğinde uyarı göster
  // useBeforeUnload(
  //   (event) => {
  //     if (requestIsleniyorMu) {
  //       event.preventDefault();
  //       event.returnValue = 'Kaydedilmemiş değişiklikler var. Sayfadan ayrılmak istediğinizden emin misiniz?';
  //     }
  //   },
  //   [requestIsleniyorMu]
  // );

  useEffect(() => {
    // Tarayıcı kısa yollarını engelleme (Ctrl+R, F5, Alt+Left Arrow)
    const handleKeyDown = (event) => {
      if (requestIsleniyorMu) {
        if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
          event.preventDefault();
          console.log('Ctrl+R veya Command+R basıldı. Sayfa yenileme engellendi.');
        }
        if (event.key === 'F5') {
          event.preventDefault();
          console.log('F5 basıldı. Sayfa yenileme engellendi.');
        }
        if (event.altKey && event.key === 'ArrowLeft') {
          event.preventDefault();
          console.log('Alt+Left Arrow basıldı. Geri yönlendirme engellendi.');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [requestIsleniyorMu]);

  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        if (requestIsleniyorMu) {
          console.log('Başka bir istek işleniyor, bu istek engellendi.');
          return Promise.reject(new Error('Request in progress'));
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [requestIsleniyorMu]);

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/' element={<Home />}  >
            <Route path='/contacts/:contactId' element={<Contact />}  />
            </Route>
          <Route path='/mock' element={<Mock />} /> 
          <Route path='/block' element={<Blocker />} />
          <Route path='/use' element={<Use />} />
          <Route path='*' element={<Blocker />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
