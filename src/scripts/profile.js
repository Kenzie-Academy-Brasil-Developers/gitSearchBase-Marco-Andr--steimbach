
const username = localStorage.getItem("username")
const usernameWithoutQuotes = JSON.parse(username)
const url = `https://api.github.com/users/${usernameWithoutQuotes}`
const urlRepos = `https://api.github.com/users/${usernameWithoutQuotes}/repos`

async function searchUser(url) {
    await fetch(url)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json()
            } else {
                throw new Error("Não foi possível obter dados do usuário")
            }
        })
        .then(dados => createProfile(dados))
        .catch(erro => {
            console.error(erro)
            location.href = "./error.html"
        })
}

async function searchUserRepos(url) {
    await fetch(url)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json()
            } else {
                throw new Error("Não foi possível obter dados do usuário")
            }
        })
        .then(dados => createRepos(dados))
        .catch(erro => console.error(erro))
}

function createProfile(obj) {
    let profile = document.getElementById("profile")
    let divImgName = document.createElement("div")
    let img = document.createElement("img")
    let name = document.createElement("h1")
    let button = document.createElement("button")

    img.src = obj.avatar_url
    name.innerText = obj.name
    button.innerText = `Trocar de Usuario`

    divImgName.classList.add("sectionInformationUser__DivUserProfile")
    img.classList.add("sectionInformationUser__DivUserProfile--imgUser")
    name.classList.add("sectionInformationUser__DivUserProfile--nameUser")
    button.classList.add("sectionInformationUser__DivUserProfile--button")

    button.addEventListener("click", function () {
        location.href = "/index.html"
    })

    divImgName.appendChild(img)
    divImgName.appendChild(name)
    profile.appendChild(divImgName)
    profile.appendChild(button)
}

function createRepos(obj) {

    obj.forEach(function (obj) {
        let repos = document.getElementById("repos")
        let divMain = document.createElement("div")
        let name = document.createElement("h1")
        let information = document.createElement("h2")
        let button = document.createElement("a")

        name.innerText = obj.name
        information.innerText = obj.description
        button.href = obj.html_url
        button.target = "_blank"
        button.innerText = `Repositório`

        divMain.classList.add("sectionReposUser--divCard")
        name.classList.add("sectionReposUser--nameRepos")
        information.classList.add("sectionReposUser--Information")
        button.classList.add("sectionReposUser--button")

        divMain.appendChild(name)
        divMain.appendChild(information)
        divMain.appendChild(button)
        repos.appendChild(divMain)
    })

}

searchUser(url)
searchUserRepos(urlRepos)