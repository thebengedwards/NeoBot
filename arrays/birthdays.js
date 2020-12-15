// This Array contains all important dates that neo needs for the cron event. Should be moved to a Database
const dates = [
  // Birthdays
  {
    // Alex Booth
    eventType: 'Birthday', // Event Type
    id: '271758756595892236', // Disocrd ID
    fName: 'Alex', // First Name
    lName: 'Booth', // Last Name
    cron: '00 00 08 03 04 *', // Date in: SS MM HH DD MM(-1) DoW
    gender: 'him', // for message
    serverID: '271720862606950400' // Server this birthday is sent to

  },
  {
    // Alex Howarth
    eventType: 'Birthday', // Event Type
    id: '348126167062151180', // Disocrd ID
    fName: 'Alex', // First Name
    lName: 'Howarth', // Last Name
    cron: '00 00 08 01 03 *', // Date in: SS MM HH DD MM(-1) DoW
    gender: 'him', // for message
    serverID: '271720862606950400' // Server this birthday is sent to
  },
  {
    // Alex Tankard
    eventType: 'Birthday', // Event Type
    id: '215951713717190656', // Disocrd ID
    fName: 'Alex', // First Name
    lName: 'Tankard', // Last Name
    cron: '00 00 08 05 06 *', // Date in: SS MM HH DD MM(-1) DoW
    gender: 'him', // for message
    serverID: '271720862606950400' // Server this birthday is sent to
  },
  {
    // Ben Edwards
    eventType: 'Birthday', // Event Type
    id: '271719405384105986', // Disocrd ID
    fName: 'Ben', // First Name
    lName: 'Edwards', // Last Name
    cron: '00 00 08 14 01 *', // Date in: SS MM HH DD MM(-1) DoW
    gender: 'him', // for message
    serverID: '271720862606950400' // Server this birthday is sent to
  },
  {
    // Dylan Custance
    eventType: 'Birthday', // Event Type
    id: '272090190657486848', // Disocrd ID
    fName: 'Dylan', // First Name
    lName: 'Custance', // Last Name
    cron: '00 00 08 09 06 *', // Date in: SS MM HH DD MM(-1) DoW
    gender: 'him', // for message
    serverID: '271720862606950400' // Server this birthday is sent to
  },
  {
    // Ed Butler
    eventType: 'Birthday', // Event Type
    id: '272104323729588225', // Disocrd ID
    fName: 'Ed', // First Name
    lName: 'Butler', // Last Name
    cron: '00 00 08 12 06 *', // Date in: SS MM HH DD MM(-1) DoW
    gender: 'him', // for message
    serverID: '271720862606950400' // Server this birthday is sent to
  },
  {
    // Fin Edward
    eventType: 'Birthday', // Event Type
    id: '286255321264029697', // Disocrd ID
    fName: 'Fin', // First Name
    lName: 'Edward', // Last Name
    cron: '00 00 08 28 05 *', // Date in: SS MM HH DD MM(-1) DoW
    gender: 'him', // for message
    serverID: '271720862606950400' // Server this birthday is sent to
  },
  {
    // Gen Myhan
    eventType: 'Birthday', // Event Type
    id: '393047942526926850', // Disocrd ID
    fName: 'Gen', // First Name
    lName: 'Myhan', // Last Name
    cron: '00 00 08 07 01 *', // Date in: SS MM HH DD MM(-1) DoW
    gender: 'her', // for message
    serverID: '271720862606950400' // Server this birthday is sent to
  },
  {
    // Jamie Stevens
    eventType: 'Birthday', // Event Type
    id: '271744164377526274', // Disocrd ID
    fName: 'Jamie', // First Name
    lName: 'Stevens', // Last Name
    cron: '00 00 08 10 05 *', // Date in: SS MM HH DD MM(-1) DoW
    gender: 'him', // for message
    serverID: '271720862606950400' // Server this birthday is sent to
  },
  {
    // Max Dalton
    eventType: 'Birthday', // Event Type
    id: '385480935900184579', // Disocrd ID
    fName: 'Max', // First Name
    lName: 'Dalton', // Last Name
    cron: '00 00 08 23 08 *', // Date in: SS MM HH DD MM(-1) DoW
    gender: 'him', // for message
    serverID: '271720862606950400' // Server this birthday is sent to // 
  },
  {
    // Milan Jakir
    eventType: 'Birthday', // Event Type
    id: '277488461844578304', // Disocrd ID
    fName: 'Milan', // First Name
    lName: 'Jakir', // Last Name
    cron: '00 00 08 07 10 *', // Date in: SS MM HH DD MM(-1) DoW
    gender: 'him', // for message
    serverID: '271720862606950400' // Server this birthday is sent to
  },
  {
    // Ollie Morrill
    eventType: 'Birthday', // Event Type
    id: '283292935552761857', // Disocrd ID
    fName: 'Ollie', // First Name
    lName: 'Morrill', // Last Name
    cron: '00 00 08 16 03 *', // Date in: SS MM HH DD MM(-1) DoW
    gender: 'him', // for message
    serverID: '271720862606950400' // Server this birthday is sent to
  },
  {
    // Sam Farquhar
    eventType: 'Birthday', // Event Type
    id: '377971556959256577', // Disocrd ID
    fName: 'Sam', // First Name
    lName: 'Farquhar', // Last Name
    cron: '00 00 08 26 05 *', // Date in: SS MM HH DD MM(-1) DoW
    gender: 'him', // for message
    serverID: '271720862606950400' // Server this birthday is sent to
  },
]

// This exports the array
module.exports = dates;