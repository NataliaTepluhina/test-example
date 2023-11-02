export const sendFormData = (username, password) =>
  new Promise((resolve, reject) =>
    setTimeout(
      () =>
        username === 'Natalia' && password === 'password'
          ? resolve()
          : reject('Username or password is incorrect. Please try again'),
      500
    )
  )
