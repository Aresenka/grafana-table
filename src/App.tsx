import './App.css';
import {Table, useTheme2} from "@grafana/ui";
import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import DummyProductsDataI from "./utils/dummyData";
import {getDataFrameFrom} from './utils/dataMapper.ts';
import {PacmanLoader} from 'react-spinners';
import {applyFieldOverrides, DataFrame} from '@grafana/data';

const dataUrl = "https://dummyjson.com/products";

const App = () => {
    const [products, setProducts] = useState([]);
    const [requestError, setError] = useState(null);

    useEffect((): void => {
        axios.get(dataUrl)
            .then((result: DummyProductsDataI): void => {
                setProducts(result.data.products)
            })
            .catch((error: AxiosError): void => {
                setError(error);
            });
    }, []);

    const theme = useTheme2();
    let dataFrame: DataFrame | null = null;
    if (products.length) {
        dataFrame = applyFieldOverrides({
            data: getDataFrameFrom(products),
            fieldConfig: {
                overrides: [],
                defaults: {},
            },
            theme,
            replaceVariables: (value: string) => value,
        })[0];
    }

    return (
        <div className="panel-container">
            {
                requestError
                    ?
                    <div className="error-message">
                        <span>Something went wrong: {requestError.message}</span>
                    </div>
                    : products.length
                        ?
                        <Table
                            data={dataFrame}
                            width={window.innerWidth - 40}
                            height={window.innerHeight - 80}
                            columnMinWidth={120}
                            resizable={true}
                        />
                        :
                        <div className="loader-container">
                            <PacmanLoader color="rgb(204, 204, 220)"/>
                        </div>
            }
        </div>
    );
}

export default App;