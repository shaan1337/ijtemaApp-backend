/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
import config from './environment/';

var programmeController = require('../api/programme/programme.controller')

export default async function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    let Competition = sqldb.Competition;
    var programme = programmeController.getProgramme();

    var competitionData = [];

    for(var i=0;i<programme.length;i++){
      if(programme[i].type && programme[i].type=='competition'){
        if(programme[i].competitions){
          var competitions = programme[i].competitions;

          for(var j=0;j<competitions.length;j++){
            var competition = competitions[j];
            var tag = competition.tag;
            var type = competition.type?competition.type:'unknown';
  
            if(competition.tag)
            competitionData.push({
              tag: tag,
              type: type
            });
          }
        }
      }
    }

    for(var i=0;i<competitionData.length;i++){
      console.log('Adding competition: '+competitionData[i].tag);
      await Competition.upsert(competitionData[i]);
    }
    console.log('finished populating competitions!');
  }
}
