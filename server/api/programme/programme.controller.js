/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/programme              ->  show
 */

'use strict';

var programme =  [ 
  { type: 'day', date: '2017-10-17', title:'Friday 17th October'},
  { type: 'program', time: '10:00', title: 'Jummah Prayer with Asr' },
  { type: 'program', time: '13:45', title: 'Hoisting of Flag & Du\'a' },
  { type: 'competition', time: '14:00', title: 'Fun Games',
    competitions: [
      {name: 'Domino (Preliminary Round)', tag: 'domino', teamsize: 2, type: 'sport'},
      {name: 'Carrom', tag: 'carrom'},
      {name: 'Dart', tag: 'dart'},
      {name: 'Foot for Fun', tag: 'foot-for-fun'}
    ]},
  { type: 'program', time: '15:00', title: 'Tea' },
  { type: 'program', time: '17:30', title: 'Dinner' },
  { type: 'program', time: '18:30', title: 'Maghrib & Isha Prayers' },
  { type: 'program', time: '18:50', title: 'Tilawat Qur\'an' },
  { type: 'program', time: '19:00', title: 'Ahad' },
  { type: 'competition', time: '19:00', title: 'Competitions',
    competitions: [
      {name: 'Nazam', tag: 'nazam', link: {text:'View rules',url:'http://ijtema.khuddam.mu/content/LiteraryCompetitions.pdf'}},
      {name: 'Speech', tag: 'speech', link: {text:'View rules',url:'http://ijtema.khuddam.mu/content/LiteraryCompetitions.pdf'}},
      {name: 'Foot-A-3', tag: 'foot-a-3', teamsize: 3},
      {name: 'Iron Man', tag: 'iron-man'},
      {name: 'PlayStation', tag: 'playstation'}
  ]},   
  { type: 'program', time: '19:00', endTime: '21:00', title: 'Refreshments' },
  { type: 'day', date: '2017-10-18', title:'Saturday 18th October'},    
  { type: 'competition', time: '19:00', title: 'Competitions - Open to All',
    competitions: [
      {name: 'Domino (Atfaal)', tag: 'domino-atfaal'}
    ]
  },
  { type: 'program', time: '19:00', title: 'Ahad' },
  { type: 'program',  time: '19:00', endTime: '21:00', title: 'Refreshments' }    
];
//programme = [];
export function show(req, res) {
  res.status(200).json(programme);
}

export function getProgramme(){
  return programme;
}