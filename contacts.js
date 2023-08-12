const fs = require('node:fs/promises'); 
const path = require("node:path")
const crypto = require('node:crypto')

const FILE_PATH = path.join(__dirname, 'db', 'contacts.json')

async function read() {
  const data = await fs.readFile(FILE_PATH, {encoding: "utf-8"})
  return JSON.parse(data)
}

async function write(data) {
    fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2))
}

async function listContacts() {
  const data = await read()
  return data
}

async function getContactById(contactId) {
  const data = await read()

  return data.find((book) => book.id === contactId) 
} 

async function removeContact(contactId) {
  data = await read()

  const index = data.findIndex(book => book.id === contactId)

  if(index === -1) {
    return undefined
  }

  const newBooks = [
    ...data.slice(0, index), 
    ...data.slice(index + 1)
  ]
  await write(newBooks)
  return data[index]
}

async function addContact(name, email, phone) {
    const data = await read()
    const newBook = {
      id: crypto.randomUUID(),
      phone,
      name,
      email,   
    }
    data.push(newBook)
    await write(data)
    return newBook
}

module.exports = { read, listContacts, getContactById, addContact, removeContact }