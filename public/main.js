
const deleteItem = document.getElementsByClassName("delete") //deleteItem was added to add event listener to every single element that has the delete class
const contactedMark = document.getElementsByClassName("custContacted") 


Array.from(deleteItem).forEach(function(element) {
  element.addEventListener('click', function(e){
   let name = e.target.parentNode.children[0].innerText
   let email = e.target.parentNode.children[1].innerText
   let msg = e.target.parentNode.children[2].innerText
   console.log(name,email,msg)
    fetch('inquiries', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'email': email,
        'msg': msg
      })
    })
    .then(data => {
      console.log(data)
      window.location.reload()
    })
  });
});


Array.from(contactedMark).forEach(function(element) {

  element.addEventListener('click', function(e){
    let name = e.target.parentNode.parentNode.children[0].innerText
    let email = e.target.parentNode.parentNode.children[1].innerText
    let msg = e.target.parentNode.parentNode.children[2].innerText

    console.log(name,email,msg)
     
    fetch('update', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name':name,
        'email':email,
        'msg':msg,
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

// function updateRating(e) {
//   const name = document.querySelector('.endorseName').value
//   const email = document.querySelector('.endorseEmail').value
//   const rating = document.querySelector('.rating').value
//   console.log({name,email,rating})
// }

// ratingForm.addEventListener('click', updateRating)

// function customerContacted(e) {
//   const name = document.querySelector('.name').value
//   const email = document.querySelector('.email').value
//   const message = document.querySelector('.message').value
//   console.log({name,email,rating})
// }

// ratingForm.addEventListener('click', customerContacted)


