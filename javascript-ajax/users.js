const $userList = document.querySelector('#user-list');

let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
xhr.responseType = 'json';

xhr.addEventListener('load', function () {
  console.log(xhr.status);
  console.log(xhr.response);
  xhr.response.forEach(element => {
      let li = document.createElement('li');
      li.textContent = element['name'];
      $userList.appendChild(li);
  });
});
xhr.send();