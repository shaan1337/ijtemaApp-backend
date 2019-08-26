/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/programme              ->  show
 */

'use strict';

var programme =  [
  { type: 'day', date: '2019-08-30', title:'Friday 30th August, Darus Salaam'},
  { type: 'program', time: '10:00', title: 'Blood donation' },
  { type: 'program', time: '11:30', title: 'Lunch' },
  { type: 'program', time: '12:45', title: 'Jummah prayers' },
  { type: 'program', time: '13:45', title: 'Flag Hoisting & Du\'a' },
  { type: 'ad', title: 'Pre-book your polo shirt now!', link: 'http://bit.ly/prebook_polo_shirt_ijtema2019'},
  { type: 'program', time: '14:00', title: 'Tea' },
  { type: 'programs', time: '14:15', title: 'Stalls',
    programs: [
      {title: '- Mini-Expo'},
      {title: '- Photo Gallery'},
      {title: '- Tabligh Corner'},
      {title: '- Parenting & Marital Advices'},
      {title: '- Q & A with Murrabi Sahebaan'},
      {title: '- SME Starter Pack'},
      {title: '- Job Fair & Career Upgrade'},
      {title: '- First Aid & How to Stop Smoking'}
    ]},
  { type: 'competition', time: '14:15', title: 'Competitions & Fun Games (Khuddam & Atfaal)',
  competitions: [
    {name: 'Adhan', tag: 'adhan', type: 'literary'},
    {name: 'Attributes of Allah', tag: 'attributes-of-allah', link: {text:'View rules',url:'http://ijtema.khuddam.mu/rules/LiteraryCompetitions2019.pdf'}, type: 'literary'},
    {name: 'Carrom', tag: 'carrom', teamsize: 2, type: 'sport'},
    {name: 'Domino', tag: 'domino', teamsize: 2, type: 'sport'},
    {name: 'Table Tennis', tag: 'table-tennis', type: 'sport'},
    {name: 'Playstation 4', tag: 'playstation', type: 'sport'},
    {name: 'Pool-One pocket', tag: 'pool-one-pocket', type: 'sport'}
  ]},
  { type: 'program', time: '16:00', title: 'Live Friday Sermon by Hazrat Khalifat-ul-Massih V (aba)', important: true },
  { type: 'program', time: '17:30', title: 'Dinner' },
  { type: 'program', time: '18:30', title: 'Maghrib & Isha Prayers' },
  { type: 'program', time: '18:50', title: 'Tilawat Qur\'an' },
  { type: 'program', time: '19:00', title: 'Ahad' },
  { type: 'program', time: '19:05', title: 'Welcome Speech by Sadr Khuddam, Murrabi Shameem Jamal Ahmad Saheb', important: true},
  { type: 'program', time: '19:15', title: 'Nazam Chorus' },
  { type: 'program', time: '19:25', title: 'FORUM: \'OUR GOD\'', important: true },
  { type: 'competition', time: '20:20', title: 'Quiz Competition',
  competitions: [
    {name: 'Quiz - Majlis representatives', tag: 'quiz-official', teamsize: 4, type: 'literary'},
    {name: 'Quiz - Audience', tag: 'quiz-audience', type: 'literary'},
  ]
  },
  { type: 'program', time: '20:45', endTime: '21:30', title: 'End of Session' },
  { type: 'day', date: '2019-08-31', title:'Saturday 31st August, Darus Salaam'},
  { type: 'program', time: '05:00', title: 'Tahajjud & Fajr Prayers followed by Darsul Qur\'an' },
  { type: 'program', time: '05:45', title: 'Naashta' },
  { type: 'program', time: '08:30', endTime: '10:30', title: 'Volleyball & Indoor Games (Khuddam & Atfaal)', important: true },
  { type: 'day', date: '2019-08-31', time: '10:45', title:'Saturday 31st August, Rose Hill Stadium'},
  { type: 'program', time: '11:00', title: 'Athletics & Football (Khuddam & Atfaal)', important: true },
  { type: 'program', time: '16:30', title: 'Zohr & Asr Prayers' },
  { type: 'program', time: '17:30', title: 'Dinner' },
  { type: 'program', time: '18:30', title: 'Maghrib & Isha Prayers' },
  { type: 'program', time: '18:50', title: 'Tilawat Qur\'an' },
  { type: 'program', time: '18:55', title: 'Nazam' },
  { type: 'program', time: '19:00', title: 'Question & Answer' },
  { type: 'program', time: '20:30', title: 'Prize Giving (Part 1)' },
  { type: 'program', time: '20:45', endTime: '21:45', title: 'End of Session' },
  { type: 'day', date: '2019-09-01', title:'Sunday 1st September, Darus Salaam'},
  { type: 'program', time: '05:00', title: 'Tahajjud & Fajr Prayers followed by Darsul Qur\'an' },
  { type: 'program', time: '05:45', endTime: '06:45', title: 'Naashta' },
  { type: 'day', date: '2019-09-01', time: '08:00', title:'Sunday 1st September, Darus Salaam'},
  { type: 'program', time: '09:15', title: 'Tilawat Qur\'an Competition - Finals' },
  { type: 'program', time: '09:40', title: 'Nazam & Speech Competition - Finals' },
  { type: 'program', time: '10:30', title: 'Address by Sadr Khuddam, Murrabi Shameem Jamal Ahmad Saheb', important: true },
  { type: 'program', time: '10:55', title: 'Address by Missionary-in-Charge, Maulana Mujeeb Saheb', important: true },
  { type: 'program', time: '11:20', title: 'Prize Giving & Awards' },
  { type: 'program', time: '11:50', title: 'Nazam Chorus' },
  { type: 'program', time: '12:05', title: 'Address by Amir Saheb, Mohammad Aniff Muslam Saheb', important: true },
  { type: 'program', time: '12:30', title: 'Zuhr & Asr Prayers' },
  { type: 'program', time: '12:45', endTime: '16:00', title: 'Lunch & Winding up' }
];

export function show(req, res) {
  res.status(200).json(programme);
}

export function getProgramme(){
  return programme;
}
