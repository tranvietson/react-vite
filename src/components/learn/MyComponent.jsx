import './style.css';
//component = html + css + js
const MyComponent = () => {
    return (
        <>

            <div>Hoi dan it with eric!</div>
            <div className='child'
                style={
                    { borderRadius: "10px" }
                }
            >Child</div>
        </>
    )
}

export default MyComponent

