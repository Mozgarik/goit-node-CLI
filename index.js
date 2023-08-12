const contacts = require("./contacts.js")
const { program } = require('commander');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');
  program.parse(process.argv);

  const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case 'list':
        const contactList = await contacts.listContacts();
        return contactList;
      case 'get':
        const contact = await contacts.getContactById(id);
        if (contact) {
          return contact
        }else {
          return null
        }
      case 'add':
        const newContact = await contacts.addContact({ name, email, phone});
        return newContact;
      case 'remove':
        const removeContact = await contacts.removeContact(id)
        return removeContact
      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  }

  invokeAction(options)
  .then(data => console.table(data))
  .catch(console.error)
