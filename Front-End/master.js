////////////   Globals   /////////////////

//urls for fetch's
const baseURL = 'https://api.openweathermap.org/data/2.5/forecast?'
const mapBaseURL = 'https://www.google.com/maps/embed/v1/search?key=AIzaSyD2Dog-33wnrY4_y8HVxPmtkQtIaRJQs6s&zoom=15&maptype=satellite&center='
let searchInput = "&q=parks"
const weatherApiKey = ''
let url = baseURL + weatherApiKey
const URL = 'http://localhost:3000/api/users/';
const todoURL = 'http://localhost:3000/api/todos/'
//some variables to pass around
const listOfTodosdiv = document.getElementById("todoList")
const searchForm = document.getElementById('searchMapForm')
const loginDiv = document.getElementById('login')
const nameInput = document.getElementById('loginForm')
const todoForm = document.getElementById('todoForm')
const welcomeLogout = document.createElement('div')
let builtMapUrl;
let userId = 0;
let userTodos;
let userName = ''

////////   Logic    /////////////

//get the user name
nameInput.addEventListener('submit', (ev) => {
    ev.preventDefault()
    clearContainer(listOfTodosdiv)
    userName = document.getElementById("loginInput").value
    getFetch(userName)
    nameInput.style.visibility = 'hidden'
    welcomeLogout.innerHTML = `<h3>Welcome</h3> <h4>${userName}</h4>`
    logoutButton = document.createElement('button')
    logoutButton.textContent = 'Logout'
    logoutButton.addEventListener('click', () =>{
      clearContainer(welcomeLogout)
      clearContainer(listOfTodosdiv)
      nameInput.style.visibility = 'visible'
      welcomeLogout.innerHTML = ''
    })
    welcomeLogout.appendChild(logoutButton)
    loginDiv.appendChild(welcomeLogout)
  })

//get new todo information
todoForm.addEventListener('submit', (ev) => {
    ev.preventDefault()
    clearContainer(listOfTodosdiv)
    todoName = document.getElementById("inputTodo").value
    todoDescription = document.getElementById("textAreaInput").value
    newTodo = {
      name: todoName,
      description: todoDescription,
      user_id: userId
    }
    if (userId != 0){
      userTodos.push(newTodo)
      postTodos(newTodo)
      buildTodoList()
    }
  })

//new todo object
function postTodos(todoThing){
  const createConfig = {
          method: "POST",
          headers: {'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
          body: JSON.stringify(todoThing)
        }
  fetch(todoURL, createConfig)
}

//delete a todo
function deleteTodo(todoId){
  const deleteConfig = {
          method: "DELETE",
          headers: {'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
          body: JSON.stringify({id: todoId})
        }
  fetch(todoURL + todoId, deleteConfig)
    .then(res => res.json())
    .then(json => console.log(json))
}

//
//fetch users
function getFetch(name){
  const userPostConfig = {
          method: "POST",
          headers: {'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
          body: JSON.stringify({name: name})
        }
  fetch(URL, userPostConfig)
    .then(res => res.json())
    .then(json => getUserTodos(json));
}

//get todos based off user name
function getUserTodos(json){
  json.forEach(user => {
    if(user.name === userName){
      userId = user.id
      userTodos = user.todos
      buildTodoList()
    }
  })
}

//build the todo list
function buildTodoList(){
  let ul = document.createElement('ul')
  userTodos.forEach(todo => {
    let li = document.createElement('li')
    li.textContent = todo.name + ': ' + todo.description
    let todoDeleteButton = document.createElement('button')
    todoDeleteButton.textContent = 'x'
    todoDeleteButton.addEventListener('click', () => {
      li.remove()
      deleteTodo(todo.id)
    })
    li.appendChild(todoDeleteButton)
    ul.appendChild(li)
    listOfTodosdiv.appendChild(ul)
  })
}

//update a user
// function updateUser(updateId){
//   const config = {
//         method: "PATCH",
//         headers: {'Accept': 'application/json',
//                   'Content-Type': 'application/json'
//                 },
//         body: JSON.stringify({worklocation: "1411 4th ave Seattle Wa, 98133", name: "Joshua Loran", email: "joshua.loran@gmail.com"})
//         // body: JSON.stringify(updateObj)
//       }
//   fetch(URL + `${updateId}/`, config)
// }

//grab coordinates from HTML5
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCoords);
  } else {
    // x.innerHTML = "Geolocation is not supported by this browser."
  }
}
// //build coordinates into url and pass to fetch
function getCoords(position){
  let lat = position.coords.latitude
  let lon = position.coords.longitude
  let coords = `lat=${lat}&lon=${lon}`
  builtWeatherUrl = baseURL + coords + weatherApiKey + '&units=imperial'
  builtMapUrl = mapBaseURL + lat + ',' + lon
  fetchWeather(builtWeatherUrl)
  buildMap(builtMapUrl, searchInput)
  searchForm.addEventListener('submit', (ev) => {
    ev.preventDefault()
    searchInput = '&q=' + document.getElementById("inputField").value
    buildMap(builtMapUrl, searchInput)
  })
}

// fetch the weather json
function fetchWeather(builtUrl){
  fetch(builtUrl)
    .then(res => res.json())
    .then(json => climateConstructor(json))
}

//use the weather json to build a display of info
function climateConstructor(json){
  //box 1
  const skyBoxOne = document.getElementById('skyBox-1')
  let imageOne = document.createElement('img')
  imageOne.src = chooseIcons(json, 0)
  skyBoxOne.appendChild(imageOne)
  skyBoxOne.appendChild(buildTempDiv(json, 0))
  //box 2
  const skyBoxTwo = document.getElementById('skyBox-2')
  let imageTwo = document.createElement('img')
  imageTwo.src = chooseIcons(json, 8)
  skyBoxTwo.appendChild(imageTwo)
  skyBoxTwo.appendChild(buildTempDiv(json, 8))
  //box 3
  const skyBoxThree = document.getElementById('skyBox-3')
  let imageThree = document.createElement('img')
  imageThree.src = chooseIcons(json, 17)
  skyBoxThree.appendChild(imageThree)
  skyBoxThree.appendChild(buildTempDiv(json, 17))
  //box 4
  const skyBoxFour = document.getElementById('skyBox-4')
  let imageFour = document.createElement('img')
  imageFour.src = chooseIcons(json, 25)
  skyBoxFour.appendChild(imageFour)
  skyBoxFour.appendChild(buildTempDiv(json, 25))
  //box 5
  const skyBoxFive = document.getElementById('skyBox-5')
  let imageFive = document.createElement('img')
  imageFive.src = chooseIcons(json, 34)
  skyBoxFive.appendChild(imageFive)
  skyBoxFive.appendChild(buildTempDiv(json, 34))
}

//choose icon based on weather
function chooseIcons(json, num){
  let imageLink;
  if (json.list[num].weather[0].main === "Clouds"){
    imageLink = "../Front-End/icons/cloudy.png"
    return imageLink
  }
  if (json.list[num].weather[0].main === "Rain"){
    imageLink = "../Front-End/icons/rainy.png"
    return imageLink
  }
  if (json.list[num].weather[0].main === "Clear"){
    imageLink = "../Front-End/icons/sunny.png"
    return imageLink
  }
}

//display high and low temps to a div
function buildTempDiv(json, num){
  let tempDiv = document.createElement('div')
  let tempString = json.list[num].main.temp_max + '-' + json.list[num].main.temp_min
  let smallString = document.createElement('small')
  smallString.textContent = tempString
  tempDiv.appendChild(smallString)
  tempDiv.classList.add('onBottom')
  return tempDiv
}

//build map with location and search parameter
function buildMap (mapUrl, find) {
  const mapFrame = document.getElementById('map')
  mapFrame.src = mapUrl + find
}

//clear a container function
function clearContainer(container){
  if (container.firstChild){
    container.firstChild.remove()
  }
}
//Start the darn thing
getLocation()
