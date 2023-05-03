const signUpHandler = async (event) => {
    event.preventDefault();
    
    const newUser = document.getElementById('newUser').value.trim();
    const newPW = document.getElementById('newPW').value.trim();

    if(newUser && newPW) {
        const response = await fetch('main/user', {
            method: 'POST',
            body: JSON.stringify({
                username: newUser, 
                password: newPW
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if(response.ok) {
            document.location.replace('/home'); // sends them to homescreen after signing up 
        } else {
            alert('Failed to sign up')
        }
    }
};

document
    .getElementById('newSignup')
    .addEventListener('submit', signUpHandler);