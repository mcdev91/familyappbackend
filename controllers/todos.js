const handleTodos = (req, res, db) => {
    try {
        const allTodos = db.select('*').from('todo')
        console.log(res.json(allTodos));
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    handleTodos: handleTodos
}



