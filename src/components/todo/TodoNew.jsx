import { useState } from "react";

const TodoNew = (props) => {

    const [valueInput, setValueInput] = useState("erics");
    const { addNewTodo } = props;

    const handleClick = () => {
        addNewTodo(valueInput);
        console.log(">>>>>> check valueInput: ", valueInput);
    }

    const handleOnchange = (name) => {
        console.log('>>>>>>> value input: ', name)
        setValueInput(name);
    }

    return (
        <div className="todo-new">
            <input style={{}} type="text"
                onChange={(event) => handleOnchange(event.target.value)} />
            <button onClick={() => handleClick()}>Add</button>
        </div>
    )
}

export default TodoNew;