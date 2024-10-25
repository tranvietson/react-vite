
const TodoData = (props) => {
    const { todoList, deleteTodo } = props
    console.log("gia tri cua todoData:", props);

    const handleDeleteTodo = (id) => {
        deleteTodo(id);
    }
    return (

        <div className="todo-data">
            {todoList.map((item, index) => {
                return (
                    <div className={`todo-item`} key={item.id} >
                        <div>{item.name}</div>
                        <button
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDeleteTodo(item.id)}
                        >Delete</button>
                    </div>


                )
            })}

        </div>
    )

}

export default TodoData;