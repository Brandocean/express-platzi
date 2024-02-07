const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin123';
  const hash = '$2b$10$A3K8HGnPMmfo/9VnnhWjjOKfgrSe33oGGu9zIU5VSOCDvIoCAusFi';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch)
}

verifyPassword();