

const ratingForm = document.querySelector("#submitRating")

function updateRating(e) {
  const name = document.querySelector('.endorseName').value
  const email = document.querySelector('.endorseEmail').value
  const rating = document.querySelector('.rating').value
  console.log({name,email,rating})
}

ratingForm.addEventListener('click', updateRating)


