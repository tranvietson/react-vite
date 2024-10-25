
const TodoData = (props) => {
    const { todoList } = props
    console.log("gia tri cua todoData:", props);
    return (
        <div className="todo-data">
            <div>Learning React</div>
            <div>Watching Youtobe</div>
            <div>{JSON.stringify(todoList)}</div>
        </div>
    )

}

export default TodoData;