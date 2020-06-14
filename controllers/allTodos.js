const handleGetAllTodos = (req, res, db) => {
    db.select('*').from('todo').then(todos => {
        console.log(todos);
        res.json(todos);
    })
}

module.exports = {
    handleGetAllTodos: handleGetAllTodos
}