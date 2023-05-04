const deleteBlog = async (event) => {
    event.preventDefault();

    const id = document.querySelector('input[name="post-id"]').value;
  
    const response = await fetch(`/main/dashboard/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok) {
        document.location.replace('/main/dashboard');
    } else {
        alert("Delete unsuccessful.  Please try again.")
    }
}

document
    .querySelector('#deleteBlogButton')
    .addEventListener('click', deleteBlog);
