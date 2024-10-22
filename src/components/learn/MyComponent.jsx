import './style.css';
//component = html + css + js
const MyComponent = () => {

    //const hoidanit = "eric channel";
    //const hoidanit = true;
    //const hoidanit = undefined;
    //const hoidanit = null;
    // const hoidanit = [1, 2, 3];
    const hoidanit = {
        name: "hoidanit",
        age: 25
    }
    return (
        <>
            <div>Hoi dan it with {JSON.stringify(hoidanit)}!</div>
            <div>{console.log("eric!!!")}</div>
            <div className='child'
                style={
                    { borderRadius: "10px" }
                }
            >Child</div>
        </>
    )
}

export default MyComponent

