import React from 'react';
import {Input} from "baseui/input";
import {SIZE} from "baseui/tag";
import {Grid, Cell} from 'baseui/layout-grid';
import Inner from "../inner/inner.component";
import Outer from "../outer/outer.component";

const EncryptInput = ({inputSize,handleEncryptInput}) => {

    return (
        <Outer>
            <Grid overrides={{
                Grid: {
                    style: ({$theme}) => ({
                        margin: '0px !important',
                        padding: '0px !important',

                    }),
                },
            }}>
                {
                    inputSize.map((value,index)=>(
                        <Cell span={2}>
                            <Inner>
                                <Input
                                    required={true}
                                    size={SIZE.compact}
                                    onChange={handleEncryptInput.bind(null,value)}
                                    placeholder={value + "th word"}
                                    clearable
                                />
                                <span style={{fontWeight: 'bold'}}>{value}</span>
                            </Inner>
                        </Cell>
                    ))
                }

        </Grid>
</Outer>

)
    ;

}


export default EncryptInput;

