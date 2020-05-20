const handleTodos = (req, res, db) => {
        const allTodos = db.select('*').from('todo')
        console.log(res.json(allTodos));
}

module.exports = {
    handleTodos: handleTodos
}



