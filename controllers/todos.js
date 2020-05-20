const handleTodos = (req, res, db) => {
    const allTodos = db.select('*').from('todo');
    res.json(allTodos.rows);
    console.log(allTodos);
}


module.exports = {
    handleTodos: handleTodos
}
