import BaseRepository = require('./../data/base-repository');

class ChecklistRepository extends BaseRepository<IChecklistModel> {
   public constructor() {
      super(BaseRepository.COMPLAINT_TABLE_NAME);
   }
}

export = ChecklistRepository;
