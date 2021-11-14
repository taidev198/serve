
function paginatedResults(model,typeFind) {
    return async (req, res, next) => {
      const page = parseInt(req.query.page)
      const limit = parseInt(req.query.limit) || 3;
      const queryFindGenre = req.params.type || '';
      const queryFindTitle = req.body.title || '';
       
      var objectQuery='';
      switch(typeFind){
        case 'genre':
          objectQuery={...objectQuery,'genre':queryFindGenre}
        break;
        case 'title':
          objectQuery={...objectQuery,'title':queryFindTitle}
        break;
      }


      const startIndex = (page - 1) * limit
      const endIndex = page * limit
  
      const results = {}
  
      if (endIndex < await model.countDocuments().exec()) {
        results.next = {
          page: page + 1,
          limit: limit
        }
      }
      
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        }
      }
      try {
        results.results = await model.find(objectQuery).limit(limit).skip(startIndex).exec()
        res.paginatedResults = results
       // objectQuery && console.log('checkValue',objectQuery);
        next()
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
    }
  }

  module.exports = paginatedResults;