interface ProductI {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: [string]
}

interface DummyProductsDataI {
    data: {
        products: [ProductI],
    }
}

export default DummyProductsDataI;
export {ProductI};