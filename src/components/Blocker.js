import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { process, setFalse, setTime, setTrue } from '../features/mockFeature/mockSlice';

function Blocker() {

  const requestIsleniyorMu = useSelector((state) => state.mock.requestIsleniyor);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');
 

  // Sayfadan ayrılma isteğini yakalayan useEffect
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      console.log("sayfadan ayrılmak istediğini gordum")
      // window.onbeforeunload = null;
      if (requestIsleniyorMu) {
       
        // Burada herhangi bir işlem yapmıyoruz
        // Modern tarayıcılar bu aşamada otomatik olarak bir uyarı penceresi gösterir
        event.preventDefault(); // dialogu otomatik açıyo
        event.returnValue = ''; // Eski tarayıcılarda bir uyarı gösterir
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [requestIsleniyorMu]);


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    dispatch(setTrue()); // Kullanıcı değişiklik yaptığında blokajı etkinleştir
  };

  const handleSave = () => {
    // Kaydetme işlemi burada yapılır
    dispatch(setFalse()) // Kaydedildikten sonra blokajı kaldır
  };

  return (
    <div>
      <h1>Kaydedilmemiş Değişiklikler Uyarısı</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Değişiklik yapın..."
      />
      <button onClick={handleSave}>Kaydet</button>
      <p>Değişiklikler kaydedilmediğinde sayfayı terk edemezsiniz.</p>
    </div>
  );
}

export default Blocker;
