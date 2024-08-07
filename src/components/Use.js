import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UNSAFE_NavigationContext } from 'react-router-dom';

function useNavigationBlocker(isBlocking, message) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isBlocking) return;

    const unblock = navigate.block((tx) => {
      if (window.confirm(message)) {
        unblock(); // Blokajı kaldır
        tx.retry(); // Navigasyonu tekrar dene
      } else {
        tx.abort(); // Navigasyonu iptal et
      }
    });

    return unblock; // Temizlik işlevi: bileşen unmount olduğunda blokajı kaldırır
  }, [navigate, location, message, isBlocking]);
}

function Blocker() {
  const [isBlocking, setIsBlocking] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useNavigationBlocker(isBlocking, 'You have unsaved changes, are you sure you want to leave?');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setIsBlocking(true); // Kullanıcı değişiklik yaptığında blokajı etkinleştir
  };

  const handleSave = () => {
    // Değişiklikleri kaydet
    setIsBlocking(false); // Kaydedildikten sonra blokajı kaldır
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
    </div>
  );
}

export default Blocker;
