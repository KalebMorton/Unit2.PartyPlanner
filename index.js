const listDisplay = document.querySelector("output")

const apiUrl = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-ftb-et-web-pt/events`

const submitButtion = document.querySelector("form")
submitButtion.addEventListener("submit", formSubmited)

function formSubmited(event){
    event.preventDefault();
    const partyDateAndTime = new Date(`${submitButtion.elements.partyDate.value}:${submitButtion.elements.partyTime.value}`)
    addParty(
        submitButtion.elements.partyName.value,
        submitButtion.elements.partyDescription.value,
        partyDateAndTime.toISOString(),
        submitButtion.elements.partyLocation.value
    )
}

async function getParties(){
    try{
        const response = await fetch(apiUrl)
        const rawData = await response.json()
        console.log(rawData.data)

        listDisplay.textContent = `<div>
        ${rawData.data[1].name} ${rawData.data[1].description}
        <div>`

    }catch{
        console.error(error)
    }
}

async function addParty(pName, pDescription, pDate, pLocation) {
    try{
        await fetch(apiUrl,{
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({name: pName, description: pDescription, date: pDate, location: pLocation})
        })
    
    }catch(error){
        console.error(error)
    }
}

async function deleteParty(url, id) {
    try{
        const res = await fetch(`${url}/${id}`,{
            method: "DELETE"
        })
    }catch{
        console.error(error)
    }
    
}

getParties()
