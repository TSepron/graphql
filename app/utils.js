const getId = async parent => {
  return parent._id
}

const parseCookie = (cookie = '') => {
  const listOfCookieStrings = cookie.split('; ')

  const cookieEntries = listOfCookieStrings.map(cookieStr => {
    return cookieStr.split('=')
  })

  return Object.fromEntries(cookieEntries)
}

module.exports = {
  getId,
  parseCookie
}
