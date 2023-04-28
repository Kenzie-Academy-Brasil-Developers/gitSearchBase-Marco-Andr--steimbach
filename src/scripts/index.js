let form = document.getElementById("form")

form.addEventListener('submit', function (event) {

    event.preventDefault()

    const input = document.getElementById("nameSearch")
    const valueInput = input.value
    if (valueInput === "") {
        alertReaction()
        return
    }
    const username = JSON.stringify(valueInput)
    localStorage.setItem("username", username)
    location.href = "./src/pages/profile.html"
})

function alertReaction() {

    const body = document.querySelector("body")
    const container = document.createElement("div")
    const text = document.createElement("p")

    container.classList.add("alert__Div", "alert__DivAdd")

    text.innerText = "Por favor, digite um nome!"

    container.appendChild(text)
    body.appendChild(container)

    setTimeout(() => {
        container.classList.add("alert__DivRemove")
    }, 3000)

    setTimeout(() => {
        body.removeChild(container)
    }, 3500)
}