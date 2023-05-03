const newBlogHandler = async (event) => {
    event.preventDefault();

    const newTitle = document.getElementById('newTitle').value;
    const newBlog= document.getElementById('newBlog').value;
    const blogDate = document.getElementById('blogDate').value;
    
    if (newBlog.length < 10000) {
        if (newTitle && newBlog) {
            const response = await fetch('/main/dashboard/create', {
                method: 'POST',
                body: JSON.stringify({ 
                    title: newTitle, 
                    post: newBlog,
                    date: blogDate
                }),
                headers: { 'Content-Type': 'application/json' },
            });
            if(response.ok) {
                document.location.replace('/main/dashboard');
            } else {
                alert('failed to create blog')
            }
            } 
    } else {
        alert("Please make your blog post shorter than 10,000 characters!  Thank you.")
    }
}

document
    .querySelector('#createBlog')
    .addEventListener('submit', newBlogHandler);