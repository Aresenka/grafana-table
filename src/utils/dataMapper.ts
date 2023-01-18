import {ProductI} from './dummyData';
import {
    ArrayVector,
    DataFrame,
    Field,
    FieldType,
    MutableDataFrame,
    ThresholdsConfig,
    ThresholdsMode
} from '@grafana/data';

const ratingThresholds: ThresholdsConfig = {
    steps: [
        {
            color: 'red',
            value: -Infinity,
        },
        {
            color: 'orange',
            value: 3,
        },
        {
            color: 'green',
            value: 4.5,
        },
    ],
    mode: ThresholdsMode.Absolute,
};

const stockThresholds: ThresholdsConfig = {
    steps: [
        {
            color: 'red',
            value: -Infinity,
        },
        {
            color: 'orange',
            value: 25,
        },
        {
            color: 'yellow',
            value: 50,
        },
        {
            color: 'green',
            value: 100,
        },
    ],
    mode: ThresholdsMode.Absolute,
};

const discountThresholds: ThresholdsConfig = {
    steps: [
        {
            color: 'red',
            value: -Infinity,
        },
        {
            color: 'orange',
            value: 5,
        },
        {
            color: 'yellow',
            value: 10,
        },
        {
            color: 'green',
            value: 15,
        },
    ],
    mode: ThresholdsMode.Absolute,
};

const dataFrameFields: Array<Field> = [
    {
        name: 'Id',
        type: FieldType.number,
        values: new ArrayVector(),
        config: {
            decimals: 0,
            custom: {
                align: 'center',
                width: 80,
            },
        }
    },
    {
        name: 'Category',
        type: FieldType.string,
        values: new ArrayVector(),
        config: {}
    },
    {
        name: 'Preview',
        type: FieldType.string,
        values: new ArrayVector(),
        config: {
            custom: {
                displayMode: 'image',
                align: 'center',
                minWidth: 80,
            }
        }
    },
    {
        name: 'Title',
        type: FieldType.string,
        values: new ArrayVector(),
        config: {}
    },
    {
        name: 'Description',
        type: FieldType.string,
        values: new ArrayVector(),
        config: {}
    },
    {
        name: 'Brand',
        type: FieldType.string,
        values: new ArrayVector(),
        config: {}
    },
    {
        name: 'Price',
        type: FieldType.number,
        values: new ArrayVector(),
        config: {
            unit: '$',
            custom: {
                width: 80,
            },
        }
    },
    {
        name: 'Discount',
        type: FieldType.number,
        values: new ArrayVector(),
        config: {
            unit: 'percent',
            min: 0,
            max: 100,
            thresholds: discountThresholds,
            custom: {
                displayMode: 'color-background',
                width: 80
            }
        }
    },
    {
        name: 'Rating',
        type: FieldType.number,
        values: new ArrayVector(),
        config: {
            decimals: 2,
            min: 0,
            max: 5,
            thresholds: ratingThresholds,
            custom: {
                displayMode: 'gradient-gauge',
                width: 250
            }
        }
    },
    {
        name: 'Stock',
        type: FieldType.number,
        values: new ArrayVector(),
        config: {
            thresholds: stockThresholds,
            custom: {
                displayMode: 'color-text',
                align: 'center',
                width: 80
            }
        }
    },
]

function getDataFrameFrom(data: Array<ProductI>): Array<DataFrame> {
    let dataFrame = new MutableDataFrame({
            fields: dataFrameFields,
        });

    data.map(product => {
        dataFrame.appendRow([
            product.id,
            product.category,
            product.thumbnail,
            product.title,
            product.description,
            product.brand,
            product.price,
            product.discountPercentage,
            product.rating,
            product.stock,
        ]);
    })

    return [dataFrame];
}

export {getDataFrameFrom};