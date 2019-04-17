const baseURL = 'https://api.openweathermap.org/data/2.5/forecast?'
const weatherApiKey = '&APPID=eb56c41c4aea318b1f2edc0d3437533b'
let url = baseURL + weatherApiKey
const URL = 'http://localhost:3000/api/users/';
//fetch from my rails backend
function getFetch(){
fetch(URL)
  .then(res => res.json())
  .then(json => forButtonPush(json));
}
//update a user
function updateUser(json, paramObj){
console.log(json)
paramObj = {worklocation: "1411 4th ave Seattle Wa, 98133", name: "Joshus Loran", email: "joshua.loran@gmail.com"}
const config = {
      method: "PATCH",
      headers: {'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
      body: JSON.stringify(paramObj)
    }
fetch(URL + `${json[0].id}/`, config)
  .then(res => res.json())
  .then(json => console.log(json))
}
//update button and listener
function forButtonPush(json){
  console.log(json)
  const postButton = document.createElement('button')
  postButton.textContent = "test the post"
  postButton.addEventListener('click', () => {
    updateUser(json)
  })
}












getFetch()
