
const TodoData = (props) => {
    const { todoList } = props
    console.log("gia tri cua todoData:", props);
    return (

        <div className="todo-data">
            {todoList.map((item, index) => {
                return (
                    <div className={`todo-item`} key={item.id} >
                        <div>{item.name}</div>
                        <button>Delete</button>
                    </div>


                )
            })}

        </div>
    )

}

export default TodoData;