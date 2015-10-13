import BaseRepository = require('./../data/base-repository');

class FormRepository extends BaseRepository<IFormModel> {
   public constructor() {
      super(BaseRepository.FORM_TABLE_NAME);
   }
}

export = FormRepository;
