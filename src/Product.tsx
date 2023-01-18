import {ProductI} from "./utils/dummyData";

export default function Product (props) {
    let productData: ProductI = props.data;

    return (
        <div>{productData.id} - title: {productData.title}</div>
    )
}