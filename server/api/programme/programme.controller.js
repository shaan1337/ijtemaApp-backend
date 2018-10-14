/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/programme              ->  show
 */

'use strict';

var programme =  [
  { type: 'day', date: '2017-10-19', title:'Friday 19th October, Darus Salaam'},
  { type: 'program', time: '10:00', title: 'Blood donation' },
  { type: 'program', time: '12:45', title: 'Jummah prayers' },
  { type: 'program', time: '13:45', title: 'Flag Hoisting & Du\'a' },
  { type: 'competition', time: '14:00', title: 'Indoor Games',
    competitions: [
      {name: 'Dart', tag: 'dart', type: 'sport'},
      {name: 'Domino', tag: 'domino', teamsize: 2, type: 'sport'},
      {name: 'Table Tennis', tag: 'table-tennis', type: 'sport'},
      {name: 'Carrom', tag: 'carrom', teamsize: 2, type: 'sport'},
      {name: 'Playstation (Atfaal only)', tag: 'playstation', type: 'sport', noregister: true}
    ]},
  { type: 'program', time: '15:00', title: 'Tea' },
  { type: 'program', time: '16:00', title: 'Live Friday Sermon by Hazrat Khalifat-ul-Massih V (aba)', important: true },
  { type: 'program', time: '17:30', title: 'Dinner' },
  { type: 'program', time: '18:30', title: 'Maghrib & Isha Prayers' },
  { type: 'program', time: '18:50', title: 'Tilawat Qur\'an' },
  { type: 'program', time: '19:00', title: 'Ahad' },
  { type: 'program', time: '19:05', title: 'Welcoming Speech by Sadr MKA', important: true},
  { type: 'program', time: '19:15', title: 'Nazam Chorus' },
  { type: 'program', time: '19:25', title: 'FORUM: Ki nu croyance?', important: true },
  { type: 'program', time: '20:25', title: 'Ameen Ceremony' },
  { type: 'competition', time: '20:45', title: 'Competitions & Fun Games',
    competitions: [
      {name: 'Tilawat Qur\'an', tag: 'tilawat-quran', link: {text:'View rules',url:'http://ijtema.khuddam.mu/rules/LiteraryCompetitions2018.pdf'}, type: 'literary'},
      {name: 'Nazam', tag: 'nazam', link: {text:'View rules',url:'http://ijtema.khuddam.mu/rules/LiteraryCompetitions2018.pdf'}, type: 'literary'},
      {name: 'Speech', tag: 'speech', link: {text:'View rules',url:'http://ijtema.khuddam.mu/rules/LiteraryCompetitions2018.pdf'}, type: 'literary'},
      {name: 'Attributes of Allah', tag: 'attributes-of-allah', link: {text:'View rules',url:'http://ijtema.khuddam.mu/rules/LiteraryCompetitions2018.pdf'}, type: 'literary'},
      {name: 'Face2Face', tag: 'face2face', links: [{text:'View video',url:'https://www.youtube.com/watch?v=de4CGjY-zkY'}, {text:'View rules',url:'http://www.mta.tv/face2face/'}], type: 'literary'},
      {name: 'Bras de Fer', tag: 'bras-de-fer', type: 'sport'},
      {name: 'Single Arm Static Lift', tag: 'single-arm-static-lift', type: 'sport'},
      {name: 'Dead lift', tag: 'dead-lift', type: 'sport'}
  ]},
  { type: 'program', time: '21:30', endTime: '21:40', title: 'End of Session' },
  { type: 'day', date: '2017-10-20', title:'Saturday 20th October, Darus Salaam'},
  { type: 'program', time: '04:00', title: 'Tahajjud & Fajr Prayers followed by Darsul Qur\'an' },
  { type: 'program', time: '05:00', endTime: '06:00', title: 'Naashta' },
  { type: 'day', date: '2017-10-20', time: '08:00', title:'Saturday 20th October, Pavillon'},
  { type: 'competition', time: '08:00', title: 'Treasure Hunt',
  competitions: [
    {name: 'Treasure Hunt', tag: 'treasure-hunt', type: 'sport', link: {text:'Register online',url:'http://bit.ly/mka18_treasure_hunt'}, noregister: true}
  ]
  },
  { type: 'competition', time: '11:30', title: 'Sports Competitions & Fun Games',
  competitions: [
    {name: 'Foot 5', tag: 'foot-5', teamsize: 5, type: 'sport', link: {text:'Register online',url:'http://bit.ly/mkam18_foot5'}, noregister: true},
    {name: 'Petanque', tag: 'petanque', teamsize: 3, type:'sport'},
    {name: 'Penalty Shoot (Highest scoring)', tag: 'penalty-shoot', type:'sport'}
  ]},
  { type: 'program', time: '12:30', title: 'Lunch' },
  { type: 'program', time: '14:00', title: 'Zohr & Asr Prayers' },
  { type: 'competition', time: '15:30', title: 'Sports Competitions & Fun Games',
  competitions: [
    {name: 'Volleyball', tag: 'volley-ball', type:'sport', teamsize: 6},
    {name: 'Tug of War', tag: 'tug-of-war', type:'sport', teamsize: 7}
  ]},
  { type: 'program', time: '17:30', title: 'Dinner' },
  { type: 'program', time: '18:30', title: 'Maghrib & Isha Prayers' },
  { type: 'program', time: '18:50', title: 'Tilawat Qur\'an' },
  { type: 'program', time: '19:00', title: 'Nazam' },
  { type: 'competition', time: '19:10', title: 'Quiz Competition',
  competitions: [
    {name: 'Quiz - Majlis representatives', tag: 'quiz-official', teamsize: 4, type: 'literary'},
    {name: 'Quiz - Audience', tag: 'quiz-audience', type: 'literary'},
  ]
  },
  { type: 'program', time: '20:00', title: 'FORUM: Islam - Its Answers to Today\'s Questions', important: true },
  { type: 'program', time: '21:00', title: 'Prize Giving' },
  { type: 'program', time: '21:10', endTime: '22:00', title: 'End of Session' },
  { type: 'day', date: '2017-10-21', title:'Sunday 21st October, Darus Salaam'},
  { type: 'program', time: '04:00', title: 'Tahajjud & Fajr Prayers followed by Darsul Qur\'an' },
  { type: 'program', time: '05:00', endTime: '06:00', title: 'Naashta' },
  { type: 'day', date: '2017-10-21', time: '08:00', title:'Sunday 21st October, Darus Salaam'},
  { type: 'program', time: '09:30', title: 'Tilawat Qur\'an Competition - Finals' },
  { type: 'program', time: '09:50', title: 'Nazam Competition - Finals' },
  { type: 'program', time: '10:10', title: 'Speech Competition - Finals' },
  { type: 'program', time: '10:45', title: 'Address by Sadr MKA', important: true },
  { type: 'program', time: '11:00', title: 'Address by Missionary-in-Charge, Maulana Mujeeb Saheb', important: true },
  { type: 'program', time: '11:20', title: 'Nazam Chorus by Atfaal' },
  { type: 'program', time: '11:30', title: 'Awards & Prize Giving' },
  { type: 'program', time: '12:00', title: 'Address by Amir Saheb', important: true },
  { type: 'program', time: '13:00', title: 'Zuhr & Asr Prayers' }
];

export function show(req, res) {
  res.status(200).json(programme);
}

export function getProgramme(){
  return programme;
}