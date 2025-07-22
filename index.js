const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

// slicing the array accounting for custom user settings
const letters = characters.slice(0, 52)
const numbers = characters.slice(52, 62)
const symbols = characters.slice(62)

// getting both password elements
// const password1El = document.getElementById("password1-el")
// const password2El = document.getElementById("password2-el")
const passwordElements = [
   document.getElementById("password1-el"),
   document.getElementById("password2-el")
]

// setting initial (default) password lenght
let passwordLength = 15

// helper function to set color for all password elements
function setPasswordElementsColor(color) {
   passwordElements.forEach(element => {
      element.style.setProperty("color", color)
   })
}

// helper function to set text for all password elements
function setPasswordElementsText(text) {
   passwordElements.forEach(element => {
      element.textContent = text
   })
}

function generatePasswords() {
   // setting original color in case the error has been triggered in last call
   setPasswordElementsColor("var(--color-text-green)")
    
   // check checkboxes checked
   const includeNumbers = document.getElementById("numbers-checkbox-el").checked
   const includeLetters = document.getElementById("letters-checkbox-el").checked
   const includeSymbols = document.getElementById("symbols-checkbox-el").checked
   
   // modifying the original array to include the desired kinds of characters
   let allowedCharacters = []
   if (includeNumbers) allowedCharacters = [...allowedCharacters, ...numbers]
   if (includeLetters) allowedCharacters = [...allowedCharacters, ...letters]
   if (includeSymbols) allowedCharacters = [...allowedCharacters, ...symbols]
   
   // if no checkbox selected, alert the user
   if (allowedCharacters.length === 0) {
      // alert("You must select at least one character-type")
      setPasswordElementsText("⚠️ Select characters")
      setPasswordElementsColor("orange")
      return
   }
   
   // get password length
   passwordLength = parseInt(document.getElementById("password-length-el").textContent)
   
   passwordElements.forEach(element => {
      let password = ""
      for (let i = 0; i < passwordLength; i++) {
         // get random index number
         const randomIndex = Math.floor(Math.random() * allowedCharacters.length)
         // joining the characters together
         password += allowedCharacters[randomIndex]
      }
      element.textContent = password
   })
}

function copyTextOne(clickedDiv) {
   // get paragraph text (clickedDiv ensures the correct text being copied in both cases)
   const text = clickedDiv.textContent
   // create a temporary (invisible) textarea to copy the text
   const temporaryTextArea = document.createElement("textarea")
   temporaryTextArea.value = text
   // temporarily adding the element to the body
   document.body.appendChild(temporaryTextArea)
   // select and copy the text
   temporaryTextArea.select()
   document.execCommand("copy")
   // eliminate temporary textarea
   document.body.removeChild(temporaryTextArea)
   // let the user know
   if (clickedDiv.textContent !== "") {
      clickedDiv.textContent = "Copied to clipboard!"
      clickedDiv.style.setProperty("color", "var(--color-subtitle)")
      setTimeout(() => {
         clickedDiv.textContent = text
         clickedDiv.style.setProperty("color", "var(--color-text-green)")
      }, 1000)
   }
}

// Visibility toggle for the settings to appear/hide
function openClose() {
   const toggle = document.getElementById("generation-params-el")
   toggle.classList.toggle("hidden")
   toggle.classList.toggle("visible")
}

// Updates the custom slider (color) whenever the user changes it
const rangeInput = document.querySelector('input[type=range]')

if (rangeInput) {
   // apply initial value
   rangeInput.style.setProperty("--fill-percent", ((rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min)) * 100 + "%")
   // update when the user moves the slider
   rangeInput.addEventListener("input", function() {
   this.style.setProperty("--fill-percent", (this.value - this.min) / (this.max - this.min) * 100 + "%")
   })
}

document.getElementById("generate-el").addEventListener("click", generatePasswords)
document.getElementById("toggle-btn").addEventListener("click", openClose)