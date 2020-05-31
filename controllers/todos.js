// const getTodos = (req, res, db) => {
//     db.select('*').from('todo').where({ description })
//         .then(todo => {
//             // console.log(user[0]);
//             if (todo.length > 0) {
//                 res.json(todo.rows)
//             } else {
//                 res.status(400).json('Not found')
//             }
//         })
//         .catch(err => res.status(400).json('error getting user'))
// }

//

const getTodos = (req, res, db) => {
    db.select('*').from('todo')
        .then(items => {
            if (items.length) {
                res.json(items)
                console.log(items);
            } else {
                res.json({ dataExists: 'false' })
            }
        })
        .catch(err => res.status(400).json({ dbError: 'db error' }))
}

module.exports = {
    getTodos: getTodos
}