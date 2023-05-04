const id = document.querySelector('input[name="post-id"]').value;

// delete blog
const deleteBlog = async (event) => {
    event.preventDefault();
  
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


// edit blog
const editBlog = async (event) => {
    event.preventDefault();

    const newTitle = document.querySelector('#editTitle').value;
    const newPost = document.querySelector('#editBlogInfo').value;
    
    const response = await fetch(`/main/dashboard/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: newTitle,
            post: newPost
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok) {
        document.location.replace('/main/dashboard');
    } else {
        alert("Update unsuccessful.  Please try again.")
    }
}

document
    .querySelector('#editBlog')
    .addEventListener('submit', editBlog);