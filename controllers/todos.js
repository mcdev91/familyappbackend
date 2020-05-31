const getTodos = (req, res, db) => {
    db.select('*').from('todo').where({ description })
        .then(todo => {
            // console.log(user[0]);
            if (todo.length > 0) {
                res.json(todo.rows)
            } else {
                res.status(400).json('Not found')
            }
        })
        .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    getTodos: getTodos
}