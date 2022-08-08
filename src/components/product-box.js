import { useState } from "react";
const ProductBox = ({ props }) => {
    let e = props;
    const [plusBtn, setplusBtn] = useState(1);
    const Btn1 = () => {
        setplusBtn(plusBtn + 1)
    }
    const Btn2 = () => {
        if (plusBtn <= 1) {
            setplusBtn(plusBtn)
        }
        else {
            setplusBtn(plusBtn - 1)
        }
    }
    return (
        <div>
            <h4>Title: {e.title}</h4>
            <h4>Price Rs: {e.price}</h4>
            <h4>Category : {e.category}</h4>
            <h4>Rating : {e.rating.rate}</h4>
            <img style={{ width: '100px' }} src={e.image} />
            <button onClick={Btn1}>+</button> {plusBtn} <button onClick={Btn2}>-</button> <br />

        </div>
    )
}
export default ProductBox