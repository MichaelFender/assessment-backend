const profilesContainer = document.querySelector('#profiles-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/profiles`

const profilesCallback = ({ data: profiles }) => displayProfiles(profiles)
const errCallback = err => console.log(err)

const getAllProfiles = () => axios.get(baseURL).then(profilesCallback).catch(errCallback)
const createProfile = body => axios.post(baseURL, body).then(profilesCallback).catch(errCallback)
const deleteProfile = id => axios.delete(`${baseURL}/${id}`).then(profilesCallback).catch(errCallback)
const updateProfile = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(profilesCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let salary = document.querySelector('#salary')
    let name = document.querySelector('#name')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        name: name.value,
        salary: salary.value, 
        imageURL: imageURL.value
    }

    createProfile(bodyObj)

    name.value = ''
    salary.value = ''
    imageURL.value = ''
}

function createProfileCard(profile) {
    const profileCard = document.createElement('div')
    profileCard.classList.add('profile-card')

    profileCard.innerHTML = `<img alt='profile cover image' src=${profile.imageURL} class="profile-cover-image"/>
    <p class="name">${profile.name}</p>
    <div class="btns-container">
        <button onclick="updateProfile(${profile.id}, 'minus')">-</button>
        <p class="profile-salary">$${profile.salary}</p>
        <button onclick="updateProfile(${profile.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteProfile(${profile.id})">delete</button>
    `


    profilesContainer.appendChild(profileCard)
}

function displayProfiles(arr) {
    profilesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createProfileCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllProfiles()