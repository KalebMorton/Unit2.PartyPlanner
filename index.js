const listDisplay = document.querySelector("output")

const apiUrl = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-ftb-et-web-pt/events`

const submitButtion = document.querySelector("form")
submitButtion.addEventListener("submit", formSubmited)

function formSubmited(event){
    event.preventDefault();
    try{
        const partyDateAndTime = new Date(submitButtion.elements.partyDateTime.value)
        addParty(
            submitButtion.elements.partyName.value,
            submitButtion.elements.partyDescription.value,
            partyDateAndTime.toISOString(),
            submitButtion.elements.partyLocation.value
        )
    }catch{
        alert("Please enter in all fields")
    }
}

async function updateParties(){
    try{
        const response = await fetch(apiUrl)
        const rawData = await response.json()

        listDisplay.innerHTML = ""
        let deleteButtons = (document.getElementsByClassName("delete"))
        for(i = 0; i < deleteButtons.length; i++){
            deleteButtons[i].removeEventListener
        }


        for(i = 0; i < rawData.data.length; i++){
            listDisplay.innerHTML = `${listDisplay.innerHTML}<div>
                <h3>${rawData.data[i].name}</h3> 
                ${rawData.data[i].description}
                <br>
                Starts on: ${decodeDate(rawData.data[i].date)}
                <br>
                Location: ${rawData.data[i].location}
                <br>
                <button class="delete" id="${rawData.data[i].id}">Delete</button>
            </div>`
        }

        deleteButtons = (document.getElementsByClassName("delete"))
        for(i = 0; i < deleteButtons.length; i++){
            deleteButtons[i].addEventListener("click", testFunc)
        }

    }catch{
        console.error(error)
    }
}

function testFunc(event){
    event.preventDefault();
    console.log(event.currentTarget.id)
    deleteParty(event.currentTarget.id)
}

function decodeDate(RawDate){
    const inputDate = new Date(RawDate)

    let monthName;
    switch(inputDate.getMonth()){
        case 0:
            monthName = "January"
            break;
        case 1:
            monthName = "February"
            break;
        case 2:
            monthName = "March"
            break;
        case 3:
            monthName = "April"
            break;
        case 4:
            monthName = "May"
            break;
        case 5:
            monthName = "June"
            break;
        case 6:
            monthName = "July"
            break;
        case 7:
            monthName = "August"
            break;
        case 8:
            monthName = "September"
            break;
        case 9:
            monthName = "October"
            break;
        case 10:
            monthName = "November"
            break;
        case 11:
                monthName = "December"
                break;
        }

    const timeIn12Hour = ((inputDate.getHours()) > 12) ? (inputDate.getHours() - 12) : (inputDate.getHours())
    const minetsWithExtra0s = (inputDate.getMinutes() < 9) ? (`${inputDate.getMinutes()}0`) : inputDate.getMinutes()


    return (`
        ${monthName}
        ${inputDate.getDate()},
        ${inputDate.getFullYear()} at
        ${timeIn12Hour}:${minetsWithExtra0s}${inputDate.getHours() > 12 ? "pm" : "am"}
    `)
}

async function addParty(pName, pDescription, pDate, pLocation) {
    try{
        await fetch(apiUrl,{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: pName, description: pDescription, date: pDate, location: pLocation})
        })
        
        updateParties()

    }catch(error){
        console.error(error)
    }
}

async function deleteParty(id) {
    try{
        await fetch(`${apiUrl}/${id}`,{
            method: "DELETE"
        })

        updateParties()

    }catch{
        console.error(error)
    }
    
}

updateParties()
