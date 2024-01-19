function showPass() {
    var passEl = document.getElementById('password')
    var btn = document.getElementById('show')
    if (btn.value == 'Show') {
        btn.value = 'Hide'
        passEl.type = 'text'
    } else {
        btn.value = 'Show'
        passEl.type = 'password'
    }
}

function logError(errorText) {
    let errorElement = document.getElementById('error')
    errorElement.innerHTML = errorText
    errorElement.style.display = 'block'
  }
  
  async function createAccount() {
    const accountUsername = document.getElementById('username').value
    const accountPassword = document.getElementById('password').value
  
    const accountData = {username: accountUsername, password: accountPassword}
  
    try {
      const senddata = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify(accountData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const respondjson = await senddata.json()
      const newjson = JSON.stringify(respondjson)
      const newstatus = JSON.parse(newjson)
      const response = newstatus.response
    } catch (error) {
      console.error("Error:", error);
    }
  }