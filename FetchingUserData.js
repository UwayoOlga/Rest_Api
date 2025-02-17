/*Scenario: You have a RESTful API endpoint /users that returns a JSON array of user objects (each with properties like id, name, email).
Task: Write a JavaScript function using fetch or Axios to retrieve this user data and then display the names of all users in a list on the webpage. Handle potential errors during the API call. */
 
function displayUserNamesFetch() {
    const userList = document.getElementById('user-list'); 
  
    fetch('/users')  
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);  
        }
        return response.json();  
      })
      .then(users => {
        userList.innerHTML = '';  
  
        users.forEach(user => {
          const listItem = document.createElement('li');
          listItem.textContent = user.name;
          userList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Error fetching user data. Please try again later.';
        userList.appendChild(errorMessage); 
      });
  }
   
  function displayUserNamesAxios() {
    const userList = document.getElementById('user-list');
  
    axios.get('/users')  
      .then(response => {
        userList.innerHTML = '';  
  
        response.data.forEach(user => {
          const listItem = document.createElement('li');
          listItem.textContent = user.name;
          userList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        const errorMessage = document.createElement('p');
  
        if (error.response) { 
          errorMessage.textContent = `Error: ${error.response.status} - ${error.response.data.message || 'Failed to load user data.'}`;
          console.error('Response data:', error.response.data);  
        } else if (error.request) { 
          errorMessage.textContent = 'Error: No response received. Please check your network connection.';
        } else { 
          errorMessage.textContent = 'Error: Request setup failed.';
        }
  
        userList.appendChild(errorMessage);
      });
  }
  document.getElementById('fetch-users-fetch').addEventListener('click', displayUserNamesFetch);
  document.getElementById('fetch-users-axios').addEventListener('click', displayUserNamesAxios);
  
  
   