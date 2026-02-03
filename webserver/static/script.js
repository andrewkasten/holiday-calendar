
// own dictionary from api
// or get each value from api

const BASE_URL = window.location.protocol + '//' + window.location.host;

const holidays = document.querySelector('#holidayForm')
const selectCountry = document.querySelector('#selectCountry')
const selectYear = document.querySelector('#selectYear')
const holidayList = document.querySelector('#holidayList')
const baseAPI = `${BASE_URL}/api/v1/holidays`


// const fetchResults = async () => {
//   const token = localStorage.getItem("token")
//   const context =   {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json" ,
//       "Authorization": `Token ${token}`
//     }
//   }
//   return basicFetch("http://127.0.0.1:8000/api/v1/holidays", context)
// }


holidayForm.addEventListener('submit', async (page) =>{
    page.preventDefault()

    const country = selectCountry.value
    const year = selectYear.value

    const url = `${baseAPI}/${country}/${year}/`
    await getHolidays(url)

})

async function getHolidays(url) {
    try {
      const token = localStorage.getItem("token")
      const context =   {
          method: "GET",
          headers: {
          "Content-Type": "application/json" ,
          "Authorization": `Token ${token}`
        }
       }
        const response = await fetch(url, context)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        // const holidays = data?.response?.holidays ?? []
        const holidays = (data && data.response && data.response.holidays !== null && data.response.holidays !== undefined) ? data.response.holidays : []



        holidayList.innerHTML = "" 
        
        if (holidays.length === 0) {
      holidayList.innerHTML = "<li>No holidays returned.</li>"
      return
    }

    for (const h of holidays) {
        const li = document.createElement('li')
        
      // const name = h.name ?? "(no name)"
      // const date = h?.date?.iso ?? "(no date)"
      // const type = h.type ?? "(no type)"
      // const description = h.description ?? "(no description)"

      const name = (h.name === null || h.name === undefined) ? "(no name)" : h.name
      const date = (h && h.date && h.date.iso !== null && h.date.iso !== undefined) ? h.date.iso : "(no date)"
      const type = (h.type !== null && h.type !== undefined) ? h.type : "(no type)"
      const description = (h.description !== null && h.description !== undefined) ? h.description : "(no description)"





      li.textContent = `${date} — ${name},    Type: ${type} Description: ${description}`
      holidayList.appendChild(li)
}
}
catch (err) {
    console.error(err)
    holidayList.innerHTML = "<li>Failed to load holidays, have you signed in?</li>"
  }
}


const basicFetch = async (url, context) => {
  try {
  const response = await fetch(url, context)
    
    if (!response.ok) {
      const errorText = await response.text(); 
      throw new Error(`HTTP Error ${response.status}: ${errorText}`);
    }

    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch:", error.message);
    throw error;
  }
}

const getCredentials = (e) => {
  const uname = e.target.uname.value
  const pword = e.target.password.value
  console.log('getCredentials',[uname, pword])
  return [uname, pword]
}


const createWineHtml = (wineObj, h3) => {
  const name = document.createElement("h3")
  name.innerText = wineObj.wine_name

  const price = document.createElement("h4")
  price.innerText = wineObj.price

  const varietal = document.createElement("h4")
  varietal.innerText = wineObj.varietal

  const description = document.createElement("h4")
  description.innerText = wineObj.description

  for (let elem of [name, price, varietal, description]) {
    h3.appendChild(elem)
  }
}

const writeWineApiResults = async (body) => {
  const h3 = document.querySelector("#getinfo")
  if(body.result) {
    createWineHtml(body.result, h3)
  } else {
    h3.innerHTML = "You must log in first"
  }
}

const handleAuthSignUp = async (e) => {
  e.preventDefault()
  const [uname, pword] = getCredentials(e)
  signUp(uname, pword)
}

const handleAuthLogin = async (e) => {
  e.preventDefault()
  const [uname, pword] = getCredentials(e)
  if(uname === uname && pword === pword) {
    const token = await getToken(uname, pword)
    console.log(token)
  localStorage.setItem("token", token)
  }
}

const signUp = (uname, pword) => {
  const data = {username: uname, password: pword}
  console.log(data)
  const context = {
    method: "POST",
    headers: {
      "Content-Type": "application/json" ,
    },
    body: JSON.stringify(data)
  }
  console.log('signUp',context)
  basicFetch("http://127.0.0.1:8000/accounts/signup", context)
}

const getToken = async (uname, pword) => {
  const data = {username: uname, password: pword}
  const context = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  }
  const body = await basicFetch("http://127.0.0.1:8000/accounts/get-token", context)
  return body["token"]
}

const fetchResults = async () => {
  const token = localStorage.getItem("token")
  const context =   {
    method: "GET",
    headers: {
      "Content-Type": "application/json" ,
      "Authorization": `Token ${token}`
    }
  }
  return basicFetch("http://127.0.0.1:8000/api/v1/holidays", context)
}


window.onload = () => {
  const form = document.querySelector("#form")
  const login = document.querySelector("#loginform")
  // const getInfo = document.querySelector("#getinfo")
  const logout = document.querySelector("#logout-btn")

  form.onsubmit = (e) => handleAuthSignUp(e)
  login.onsubmit = (e) => handleAuthLogin(e)
  // getInfo.onclick = async () => {
  //   const body = await fetchResults()
  //   writeWineApiResults(body)
  // }
  logout.onclick = () => localStorage.removeItem("token")
}

// async function getHolidays () {
//     try {
//         const response = await fetch(calendarificAPI) 
//         if (!response.ok) throw new Error(`HTTP ${response.status}`)
//         const data = await response.json()
//         console.log(data)
//         const holidays = data?.response?.holidays ?? []
        
//         holidayList.innerHTML = ""

//         if (holidays.length === 0) {
//       holidayList.textContent = "No holidays returned."
//       return
//     }
//         for (const h of holidays) {
//       const li = document.createElement('li')

//       const name = h.name ?? "(no name)"
//       const descript = h.description ?? "(no description)"
//       const date = h?.date?.iso ?? "(no date)"
//       const locations = h.locations ?? "Nationwide/unspecified"
//       const type = h.type ?? "(no type)"

//       li.textContent = `${date} — ${name} ${type} ${descript} (${locations})`
//       holidayList.appendChild(li)
//     }

//     } catch(err){
//         console.error(err)
//     }
// }


// function pokemonSelect(data){
//     data.forEach(pokemon => {
//         const option = document.createElement('option')
//         option.value = pokemon.name
//         option.textContent = pokemon.name
//         selectPokemon.appendChild(option)
//         //console.log(option.value)
//     })
// }
//  function showPokemon() {
//     selectName = selectPokemon.value
//     pokemonName = ''
//     pokemonType1 = ''
//     pokemonType2 = ''
//     pokemonBaseAttack = ''
//     pokemonBaseDefense = ''
//     pokemonBaseHP = ''
//     pokemonAbility = ''
//     //console.log(selectName)
//     for(let i = 0; i < pokemonData.length; i++){
//         console.log(pokemonData[i])
//         if (pokemonData[i]['name'] === selectName){
//             pokemonName = pokemonData[i]['name']
//             pokemonType1 = pokemonData[i]['type_1']
//             pokemonType2 = pokemonData[i]['type_2']
//             pokemonBaseAttack = pokemonData[i]['base_attack']
//             pokemonBaseDefense = pokemonData[i]['base_defense']
//             pokemonBaseHP = pokemonData[i]['base_hp']
//             pokemonAbility = pokemonData[i]['ability']
//         }
//     }
//     //console.log(selectName)
//     pokemonDetails.innerHTML = `
//     <h3>${[pokemonName]}</h3>
//     <p>Type 1: ${pokemonType1}</p>
//     <p>Type 2: ${pokemonType2}</p>
//     <p>Base Attack: ${pokemonBaseAttack}</p>
//     <p>Base Defense: ${pokemonBaseDefense}</p>
//     <p>Base HP: ${pokemonBaseHP}</p>
//     <p>Ability: ${pokemonAbility}</p>
//     `
//     //console.log(pokemon.name)
//  }

//holidays.addEventListener('click',  getHolidays())
    


 //console.log(selectPokemon.value)
//  const pokeData = document.getElementById('pokeData')
//  const print = document.createElement('h3')
//         print.textContent = `${names}`
//         console.log(`Names: ${names}`)
//         pokeData.appendChild(print)
    
   //poke.addEventListener('click',pokemonSelect())



// const poke = document.querySelector('#poke')

// const getPoke = () => {
//     fetch("http://localhost:5000/pokemon")
//     .then(response => {
//         response.json() 
//         console.log(response)
//    })
//     .then (data => {
//         console.log(data)
//     }) 
      
//    }

//    poke.addEventListener('click',getPoke)

 