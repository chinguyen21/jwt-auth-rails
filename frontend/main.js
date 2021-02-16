
URL = "http://localhost:3000"

document.addEventListener("DOMContentLoaded", () => {
    createUser();
    authUser();
    logout();
})

const showSecretMessage = () => {
    section = document.querySelector('#secret-message')
    h1 = document.createElement('h1')
    h1.innerText = "We are Children of the Code. The best cohort ever"
    section.appendChild(h1)

}

const createUser = () => {
    let form = document.querySelector(".ui1")
   
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        if (Object.values(document.querySelectorAll('#alert-wrong-pw'))) {
            Object.values(document.querySelectorAll('#alert-wrong-pw')).forEach(p => p.remove())
        }
        newUser = {
            username: event.target.username.value, 
            bio: event.target.bio.value,
            avatar: event.target.avatar.value,
            password: event.target.password.value,
            password_confirmation: event.target.password_confirmation.value
        }
        reqPackage = {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUser)
        }
        fetch(`${URL}/api/v1/users`, reqPackage)
        .then(res => res.json())
        .then(res_status => {
            res_status.token ? localStorage.token = res_status.token : alert(res_status.message)
                })
                
            }) 
        }




const authUser = () => {
     let form = document.querySelector(".ui2")
     form.addEventListener('submit', (event) => {
        event.preventDefault()
        if ( document.querySelector('#alert-wrong-pw')) {
            document.querySelector('#alert-wrong-pw').remove()
        }
        checkUser = {
            username: event.target.username.value, 
            password: event.target.password.value
        }
        reqPackage = {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(checkUser)
        }
        fetch(`${URL}/api/v1/login`, reqPackage)
        .then(res => res.json())
        .then(res_status => {
            res_status.token ? localStorage.token = res_status.token : alert(res_status.message)
        })
    })

}

const logout = () => {
    document.querySelector(".logout").addEventListener('click', () => {
        fetch(`${URL}/api/v1/users`, { 
            headers: {"Authorization":`Bearer ${localStorage.token}`},
        })
        .then(res => res.json())
        .then(res_status => {
            console.log(res_status.status)
            localStorage.clear()
        })
    })
}