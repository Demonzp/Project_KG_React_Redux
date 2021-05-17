import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';

const SimplePaginLimit = ({ arrLimit, onChange, forceLimit }) => {
    const [limit, setLimit] = useState(arrLimit[0]);

    const handleChange = (e) => {
        setLimit(e.target.value);
        onChange(e.target.value);
    }

    useEffect(()=>{
        const idxLimit = arrLimit.indexOf(forceLimit);
        if(idxLimit>=0){
            setLimit(arrLimit[idxLimit]);
        }
    }, [forceLimit]);

    return (
        <FormGroup row>
            <Label for='sex'>Limit items on page:</Label>
            <Col sm={1.5}>
                <Input
                    type='select'
                    name='sex'
                    value={limit}
                    onChange={handleChange}
                >
                    {
                        arrLimit.map((val, index) => {
                            return <option key={index} >{val}</option>
                        })
                    }
                </Input>
            </Col>
        </FormGroup>
    );
};

export default SimplePaginLimit;