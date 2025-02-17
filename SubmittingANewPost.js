/*Scenario: You have a RESTful API endpoint /posts that accepts POST requests to create new blog posts. The request body should be JSON containing title and content properties.
Task: Create a form with input fields for title and content. Write a JavaScript function that uses fetch or Axios to send a POST request to create a new post when the form is submitted. 
Display a success message or any error messages returned by the API. */

function createPostFetch(event) {
    event.preventDefault(); 
  
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const messageDiv = document.getElementById('post-message');  
  
    fetch('/books', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {throw new Error(err.message || `HTTP error! status: ${response.status}`);}); // Get error details from JSON if available
        }
        return response.json(); 
      })
      .then(newPost => {
        messageDiv.textContent = 'Post created successfully!';
        messageDiv.classList.add('success');  
        messageDiv.classList.remove('error'); 
        document.getElementById('post-form').reset(); 
        console.log('New post created:', newPost);
      })
      .catch(error => {
        console.error('Error creating post:', error);
        messageDiv.textContent = error.message || 'Error creating post. Please try again.';  
        messageDiv.classList.add('error');
        messageDiv.classList.remove('success');
      });
  }
   
  function createPostAxios(event) {
    event.preventDefault();  
  
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const messageDiv = document.getElementById('post-message');
  
    axios.post('/posts', { title, content })  
      .then(response => {
        messageDiv.textContent = 'Post created successfully!';
        messageDiv.classList.add('success');
        messageDiv.classList.remove('error');
        document.getElementById('post-form').reset();
        console.log('New post created:', response.data);
      })
      .catch(error => {
        console.error('Error creating post:', error);
  
        if (error.response) {
          messageDiv.textContent = error.response.data.message || `Error: ${error.response.status} - Failed to create post.`;
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          messageDiv.textContent = 'Error: No response received. Check your network connection.';
        } else {
          messageDiv.textContent = 'Error: Request setup failed.';
        }
  
        messageDiv.classList.add('error');
        messageDiv.classList.remove('success');
      });
  }
  
   