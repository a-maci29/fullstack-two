
const contact = document.getElementsByClassName("custContacted");
const ratingForm = document.querySelector("#submitRating")

function updateRating(e) {
  const name = document.querySelector('.endorseName').value
  const email = document.querySelector('.endorseEmail').value
  const rating = document.querySelector('.rating').value
  console.log({name,email,rating})
}

ratingForm.addEventListener('click', updateRating)

function customerContacted(e) {
  const name = document.querySelector('.name').value
  const email = document.querySelector('.email').value
  const message = document.querySelector('.message').value
  console.log({name,email,rating})
}

ratingForm.addEventListener('click', customerContacted)


Array.from(contact).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const email = this.parentNode.parentNode.childNodes[3].innerText
    const msg = this.parentNode.parentNode.childNodes[5].innerText
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
    }).then(function (response) {
      window.location.reload()
    })
  });
});