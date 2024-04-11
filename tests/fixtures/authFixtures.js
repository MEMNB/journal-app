

export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMesagge: null,
}

export const authenticatedState = {
    status: 'authenticated',
    uid: '123ABC',
    email: 'demo@google.com',
    displayName: 'Demo user',
    photoURL: 'http://demo.jpg',
    errorMesagge: null,
}

export const notauthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: 'Demo user',
    photoURL: null,
    errorMesagge: null,
}

export const demoUser = {
    uid: 'ABC123',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'http://foto.jpg'
}