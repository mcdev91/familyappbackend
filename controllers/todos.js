// const handleTodos = (req, res, db) => {
//     try {
//         const allTodos = db.select('*').from('todo')
//         console.log(res.json(allTodos));
//     } catch (error) {
//         console.error(error.message);
//     }
// }

const handleTodos = (req, res, db) => {
    db.select('SELECT * FROM todo', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

module.exports = {
    handleTodos: handleTodos
}



