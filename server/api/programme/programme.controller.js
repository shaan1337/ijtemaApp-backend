/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/programme              ->  show
 */

'use strict';

var programme =  [
  { type: 'day', date: '2017-10-27', title:'Friday 27th October, Darus Salaam'},
  { type: 'program', time: '10:00', title: 'Blood donation' },
  { type: 'program', time: '12:45', title: 'Jummah Prayer with Asr' },
  { type: 'program', time: '13:45', title: 'Hoisting of Flag & Du\'a' },
  { type: 'competition', time: '14:00', title: 'Indoor Games',
    competitions: [
      {name: 'Domino', tag: 'domino-1', teamsize: 2, type: 'sport'},
      {name: 'Carrom', tag: 'carrom-1', teamsize: 2, type: 'sport'},
      {name: 'Dart', tag: 'dart', type: 'sport'},
      {name: 'Playstation', tag: 'playstation', type: 'sport'},
      {name: 'Foot for Fun', tag: 'foot-for-fun', type: 'sport'}
    ]},
  { type: 'program', time: '15:00', title: 'Tea' },
  { type: 'program', time: '16:00', title: 'Live Friday Sermon of Hazrat Khalifat-ul-Massih V (aba)' },
  { type: 'program', time: '17:30', title: 'Dinner' },
  { type: 'program', time: '18:30', title: 'Maghrib & Isha Prayers' },
  { type: 'program', time: '18:50', title: 'Tilawat Qur\'an' },
  { type: 'program', time: '19:00', title: 'Ahad' },
  { type: 'program', time: '19:05', title: 'Welcome Address by Sadr MKA' },
  { type: 'program', time: '19:15', title: 'Questions & Answers Session' },
  { type: 'competition', time: '20:05', title: 'Competitions & Fun Games',
    competitions: [
      {name: 'Tilawat Qur\'an', tag: 'tilawat-quran', link: {text:'View rules',url:'http://ijtema.khuddam.mu/LiteraryCompetitions.pdf'}, type: 'literary', comment: 'Beginners can participate in Pool B'},
      {name: 'Nazam', tag: 'nazam', link: {text:'View rules',url:'http://ijtema.khuddam.mu/LiteraryCompetitions.pdf'}, type: 'literary', comment: 'Beginners can participate in Pool B'},
      {name: 'Speech', tag: 'speech', link: {text:'View rules',url:'http://ijtema.khuddam.mu/content/LiteraryCompetitions.pdf'}, type: 'literary', comment: 'Beginners can participate in Pool B'},
      {name: 'Foot Coltar A-3', tag: 'foot-a-3', teamsize: 3, type: 'sport'},
      {name: 'Chrono Quest', tag: 'chrono-quest', type:'sport'},
      {name: 'Domino', tag: 'domino-2', teamsize: 2, type: 'sport'},
      {name: 'Carrom', tag: 'carrom-2', teamsize: 2, type: 'sport'}
  ]},
  { type: 'program', time: '21:30', endTime: '21:40', title: 'End of Session' },
  { type: 'day', date: '2017-10-28', title:'Saturday 28th October, Darus Salaam'},
  { type: 'program', time: '04:00', title: 'Tahajjud Prayers' },
  { type: 'program', time: '04:35', title: 'Fajr Prayers' },
  { type: 'program', time: '04:45', title: 'Darsul Qur\'an' },
  { type: 'program', time: '05:00', endTime: '06:00', title: 'Naashta' },
  { type: 'day', date: '2017-10-28', time: '08:00', title:'Saturday 28th October, Pavillon'},
  { type: 'competition', time: '09:00', title: 'Competitions - Open to all',
  competitions: [
    {name: 'Foot A-7', tag: 'foot-a-7', teamsize: 7, type: 'sport'},
    {name: 'Sprint', tag: 'sprint', type:'sport'},
    {name: 'Petanque', tag: 'petanque', type:'sport'},
    {name: 'Treasure Hunt', tag: 'treasure-hunt', type:'sport'},
    {name: 'Swimming Sprint', tag: 'swimming-sprint', type:'sport', comment: 'Swimming pool sessions will start at 11:00'},
  ]},
  { type: 'program', time: '12:00', endTime: '12:45', title: 'Lunch' },
  { type: 'day', date: '2017-10-28', time: '13:00', title:'Saturday 28th October, Darus Salaam'},
  { type: 'program', time: '14:00', title: 'Zohr & Asr Prayers' },
  { type: 'program', time: '14:15', title: 'Tilawat Qur\'an' },
  { type: 'competition', time: '14:25', title: 'Quiz Competition',
  competitions: [
    {name: 'Quiz - Majlis representatives', tag: 'quiz-official', teamsize: 4, type: 'literary'},
    {name: 'Quiz - Audience', tag: 'quiz-unofficial', type: 'literary'},  
  ]
  },
  { type: 'program', time: '15:15', title: 'Tea' },
  { type: 'competition', time: '15:15', title: 'Competitions & Indoor Games',
  competitions: [
    {name: 'Adhan', tag: 'adhan', link: {text:'View rules',url:'http://ijtema.khuddam.mu/LiteraryCompetitions.pdf'}, type: 'literary'},
    {name: 'Attributes of Allah', tag: 'attributes-of-allah', link: {text:'View rules',url:'http://ijtema.khuddam.mu/LiteraryCompetitions.pdf'}, type: 'literary'},
    {name: 'Volleyball', tag: 'volley-ball', type:'sport'}
  ]},
  { type: 'program', time: '17:00', title: 'Barbeque' },
  { type: 'program', time: '18:30', title: 'Maghrib & Isha Prayers' },
  { type: 'program', time: '18:50', title: 'Tilawat Qur\'an' },
  { type: 'program', time: '19:00', title: 'FORUM: Treasures of the Holy Qur\'an' },
  { type: 'program', time: '20:00', title: 'Prize Giving for 2nd ranked in Sports' },
  { type: 'program', time: '20:15', endTime: '21:00', title: 'End of Session' },
  { type: 'day', date: '2017-10-29', title:'Sunday 29th October, Darus Salaam'},
  { type: 'program', time: '04:00', title: 'Tahajjud Prayers' },
  { type: 'program', time: '04:35', title: 'Fajr Prayers' },
  { type: 'program', time: '04:45', title: 'Darsul Qur\'an' },
  { type: 'program', time: '05:00', endTime: '06:00', title: 'Naashta' },
  { type: 'day', date: '2017-10-29', time: '08:00', title:'Sunday 29th October, Darus Salaam'},  
  { type: 'program', time: '09:00', title: 'Tilawat Qur\'an' },
  { type: 'program', time: '09:10', title: 'Nazam - Finals' },
  { type: 'program', time: '09:40', title: 'Speech - Finals' },
  { type: 'program', time: '10:10', title: 'Tilawat Qur\'an - Finals' },
  { type: 'program', time: '10:35', title: 'Address by Sadr MKA' },
  { type: 'program', time: '11:15', title: 'Prize Giving' },
  { type: 'program', time: '11:35', title: 'Closing Address by Amir Jama\'at' },
  { type: 'program', time: '12:45', title: 'Zuhr & Asr Prayers' },
  { type: 'program', time: '13:00', title: 'Cleaning and Winding up' }
];

export function show(req, res) {
  res.status(200).json(programme);
}

export function getProgramme(){
  return programme;
}