const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#message')
message1.setAttribute('style', 'white-space: pre;')
const img = document.querySelector('#weatherImg')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value

    message1.textContent = 'Loading...'

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if(data.error) {
                alert(data.error)

                message1.textContent = ''
                img.src = ''
                img.alt = 'weather icon'
                
            } else {
                img.src = data.icon
                
                message1.textContent = `location: ${data.location} \r\ntemperature: ${data.temperature} \r\ndescription: ${data.description} \r\nunit: ${data.unit}`
            }

            search.value = ''
        })
    })
})