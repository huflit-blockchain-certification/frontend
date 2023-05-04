const generator = {
  generateRandomString(numbers: number) {
    let randomString = ''

    for (let i = 0; i < numbers; i++) {
      const randomDigit = Math.floor(Math.random() * 10)
      randomString += randomDigit.toString()
    }

    return randomString
  },
  generateEmail() {
    var chars = 'abcdefghijklmnopqrstuvwxyz1234567890'
    var string = ''
    for (var ii = 0; ii < 15; ii++) {
      string += chars[Math.floor(Math.random() * chars.length)]
    }
    const fakeEmail = string + '@gmail.com'
    return fakeEmail
  },
  generateRandomAddress() {
    const streetNames = ['Main St.', 'Oak Ave.', 'Pine St.', 'Maple Rd.', 'Elm St.']
    const cityNames = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']
    const stateNames = ['NY', 'CA', 'IL', 'TX', 'AZ']
    const zipCode = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000

    const randomStreetIndex = Math.floor(Math.random() * streetNames.length)
    const randomCityIndex = Math.floor(Math.random() * cityNames.length)
    const randomStateIndex = Math.floor(Math.random() * stateNames.length)

    const street = streetNames[randomStreetIndex]
    const city = cityNames[randomCityIndex]
    const state = stateNames[randomStateIndex]

    return `${street} ${city}, ${state} ${zipCode}`
  },
  generateRandomName() {
    const firstNames = [
      'Emma',
      'Olivia',
      'Sophia',
      'Ava',
      'Isabella',
      'Mia',
      'Charlotte',
      'Amelia',
      'Harper',
      'Evelyn',
    ]
    const lastNames = [
      'Smith',
      'Johnson',
      'Williams',
      'Jones',
      'Brown',
      'Davis',
      'Miller',
      'Wilson',
      'Moore',
      'Taylor',
    ]

    const randomFirstNameIndex = Math.floor(Math.random() * firstNames.length)
    const randomLastNameIndex = Math.floor(Math.random() * lastNames.length)

    const firstName = firstNames[randomFirstNameIndex]
    const lastName = lastNames[randomLastNameIndex]

    return `${firstName} ${lastName}`
  },
}

export default generator
