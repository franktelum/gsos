/// <reference path="../../../../../lib/definitely_typed/bluebird/bluebird.d.ts"/>

import BaseRepository = require('./../data/base-repository');

var r = require('rethinkdb');

class ComplaintRepository extends BaseRepository<IComplaintModel> {
   public constructor() {
      super(BaseRepository.COMPLAINT_TABLE_NAME);
   }
}

export = ComplaintRepository;
