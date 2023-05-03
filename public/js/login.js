const loginModal = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (username && password) {
      const response = await fetch('/main/user/login', {
        method: 'POST',
        body: JSON.stringify({ 
          username: username, 
          password: password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/home');
      } else {
        alert('Failed to log in.');
      }
    }
  };

  document
    .querySelector('#loginModal')
    .addEventListener('submit', loginModal);

  //delete this below later when submitting
  // username: testuser22
  // password: hellothings12