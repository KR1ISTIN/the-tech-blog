const logout = async () => { // fix route 
    const response = await fetch('/main/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) { 
      document.location.replace('/');
    } else {
      alert('Failed to log out.');
    }
  };
  
  document
    .querySelector('#logout')
    .addEventListener('click', logout);