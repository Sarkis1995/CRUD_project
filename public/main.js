const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')
const searchButton = document.querySelector(`#restaurant-search`)


deleteButton.addEventListener('click', _ =>{
    fetch('/quotes', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: String,
        }),
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        if (response === 'No quote to delete') {
            messageDiv.textContent = 'No quote to delete'
        } else{
            window.location.reload(true)
        }
    })
    .catch(error => console.error(error))
})

searchButton.addEventListener('click', _ =>{
    fetch(`https://api.yelp.com/v3/businesses/search?location=Los_Angeles_County&term=restaurants`, {
        method: 'get',
        headers: {'Authorization': process.env.Yelp_API},
        body: JSON.stringify({
            name: String
        }),
    })
    .then(res =>{
        if(res.ok) return res.json()
    })
    .catch(error => console.error(error))
})