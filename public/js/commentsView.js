const viewPostComments = async (event) => {
  event.preventDefault(); 
  const postId = document.querySelector("input[name='post-id']").value;
  const postResponse = await fetch(`/home/post/${postId}`, {
      method:'GET',  
      headers: {
         'Content-Type': 'application/json',
      }
  });
  if (postResponse) {
    console.log(postId)
    // document.location.replace(
    //   `/home/post/${postId}`
    // );
    //document.location.reload();
  } else {
    console.log(postResponse.status + " ... it failed")
  }
};

document.addEventListener('submit', viewPostComments);

// still working on this file
// file is to view comments on the blog