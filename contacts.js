const fs = require('fs').promises;
var path = require('path');
const uuid = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
 await fs.readFile(contactsPath)
  .then(data => console.table(JSON.parse(data)))
  .catch(err => console.log(err.message));
}



async function getContactById(contactId) {
    const data = await fs.readFile(contactsPath) 
    const parseData = JSON.parse(data)
            const findUser = parseData.find(item => item.id === contactId)
            if (findUser) {
        console.table(findUser)
    } else {
        console.log(`nobody with the ID of ${contactId} was found`)
    }
        

}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath) 
    const parseData = JSON.parse(data)
    const findUser = parseData.find(item => item.id === contactId)
            if (findUser) {
                console.log("the following contact will be removed")
                console.table(findUser)
                const newList = parseData.filter(item => item.id !== contactId)
                await fs.writeFile(contactsPath, JSON.stringify(newList))
            const newData = await fs.readFile(contactsPath) 
    const newParseData = JSON.parse(newData)    
console.table(newParseData)
    } else {
        console.log(`nobody with the ID of ${contactId} was found`)
    }
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath) 
    const parseData = JSON.parse(data)
    const newContact = {
         id: uuid.v1(),
            name: name,
            email: email,
            phone: phone
    }
    parseData.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(parseData))
    const updateData = await fs.readFile(contactsPath) 
    const parseUpdateData = JSON.parse(updateData)
    console.table(parseUpdateData)


}

module.exports = { listContacts, addContact,  getContactById, removeContact }


