const auth = firebase.auth();
const ui = new firebaseui.auth.AuthUI(auth);
const db = firebase.firestore();

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const addNoteConfirm = document.getElementById('note-creator-confirm-btn');

var currentUser = null;
var currentUserRef = null;
const authElements = [
    document.getElementById('sign-out'),
    document.getElementById('user-data'),
    document.getElementById('open-note-creator-btn')
];
const unauthElements = [
    document.getElementById('sign-in')
];

ui.start('#firebaseui-auth-container', {
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: '/'
    // Other config options...
});

document.getElementById('sign-out').addEventListener('click', () => {
    auth.signOut().then(function () {
        console.log('Signed out');
    }).catch(function (error) {
        console.error(error);
    });
});

auth.onAuthStateChanged(function (user) {
    if (user) {
        layoutAuthenticated();

        var userDocRef = db.collection('users').doc(user.uid);
        userDocRef.get().then(doc => {
            if (!doc.exists) {
                userDocRef.set({
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    created: firebase.firestore.Timestamp.now()
                }).then(() => {
                    console.log(`User ${user.displayName} registered successfully`);
                }).catch(error => {
                    console.error(`Failed to register user: ${error}`);
                })
            } else {
                console.log('User is already registered');
            }
        }).catch(error => {
            console.error(`Error grabbing user doc: ${error}`);
        });
        currentUser = user;
        currentUserRef = userDocRef;

    } else {
        layoutUnauthenticated();
        currentUser = null;
        currentUserRef = null;
    }
    try {
        db.collection('notes').where('author', '==', 'users/' + currentUser.uid) // TODO: fix references?
            .onSnapshot(function (querySnapshot) {
                querySnapshot.forEach(doc => {
                    renderNote(doc);
                });
            });
    } catch (TypeError) {
        console.log('user not authenticated');
    }
});

function renderNote(note) {
    const wrapper = document.getElementById('note-wrapper');
    var header, body, footer;
    var noteDiv = document.getElementById(note.id);
    if (!noteDiv) {
        noteDiv = document.getElementById('note-template').cloneNode(3);
        noteDiv.setAttribute('id', note.id);
        noteDiv.setAttribute('class', 'note');
        noteDiv.removeAttribute('hidden');
        wrapper.appendChild(noteDiv);
    }
    note = note.data();
    header = noteDiv.querySelector('.note-header');
    header.textContent = note.title;
    body = noteDiv.querySelector('.note-body');
    body.textContent = note.text;
    footer = noteDiv.querySelector('.note-footer');
    footer.textContent = note.author;
}

function layoutAuthenticated() {
    // Displays functionality available to an authenticated user, hides sign in/up options
    unauthElements.forEach(elem => {
        elem.setAttribute('hidden', '');
    });
    authElements.forEach(elem => {
        elem.removeAttribute('hidden');
    });
    displayUserData();
}

function layoutUnauthenticated() {
    // Hides functionality only available to an authenticated user
    authElements.forEach(elem => {
        elem.setAttribute('hidden', '');
    });
    unauthElements.forEach(elem => {
        elem.removeAttribute('hidden');
    });
    displayUserData();
}

function displayUserData() {
    var div = document.getElementById('user-data');
    if (currentUser) {
        if (currentUser.icon) {
            div.querySelector('.user-picture').style.backgroundImage = 'url(' + currentUser.icon + ')';
        }
        div.querySelector('.user-name').textContent = currentUser.displayName;
    } else {
        div.querySelector('.user-picture').style.backgroundImage = "";
        div.querySelector('.user-name').textContent = "";
    }
}

addNoteConfirm.addEventListener('click', () => {
    if (addNote()) {
        var modal = addNoteConfirm.closest('#note-creator-modal');
        closeModal(modal);
    }
});

function addNote() {
    // Add a new note entry to the database.
    var noteTitle = document.getElementById('note-creator-title-input');
    var noteText = document.getElementById('note-creator-content-input');
    if (noteTitle.value.length === 0 || !noteTitle.value.trim()) return false;
    if (noteText.value.length === 0 || !noteText.value.trim()) return false;
    if (!currentUser) return false;

    return firebase.firestore().collection('notes').add({
        // author: currentUserRef,
        author: 'users/' + currentUser.uid, // TODO: fix references?
        title: noteTitle.value,
        text: noteText.value,
        created: firebase.firestore.Timestamp.now()
    }).then(function (success) {
        noteTitle.value = '';
        noteText.value = '';
        console.log('Successfully added the note to the database');
    }).catch(function (error) {
        console.error('Error writing new note to database', error);
    });
}

openModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        var modal = document.querySelector(btn.dataset.modalTarget);
        openModal(modal);
    })
});

closeModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        var modal = btn.closest('.modal');
        closeModal(modal);
    })
});

overlay.addEventListener('click', () => {
    var modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    })
});

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}