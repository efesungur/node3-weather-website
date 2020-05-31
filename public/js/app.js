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
                
                message1.textContent = `In ${data.location} \r\ntemperature is ${data.temperature} degrees \r\nFeels like ${data.feelsLike} degrees \r\nIt is ${data.description} \r\nhumidity is ${data.humidity}% \r\ndegrees in unit type: ${data.unit} `
            }

            search.value = ''
        })
    })
})