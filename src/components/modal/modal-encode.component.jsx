import React from 'react';
import {Button} from 'baseui/button';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
} from 'baseui/modal';
import EncryptInput from "../encrypt-input/encrypt-input.component";
import {Input} from "baseui/input";
import {Cell, Grid} from "baseui/layout-grid";
import Inner from "../inner/inner.component";
import {SIZE, StyledAction} from "baseui/tag";
import Outer from "../outer/outer.component";
import {Combobox} from "baseui/combobox";
import {StyledBody} from "baseui/card";
import {Textarea} from "baseui/textarea";
import { Table, DIVIDER } from "baseui/table-semantic";

const ModalEncode = ({
                         pIsEncode,
                         pIsOpen,
                         encryptInputCount,
                         handleModalClose,
                         handleInputSizeChange,
                         handleEncryptInput,
                         handleSubmit,
                         options,
                         result,
                         keywordList
                     }) => {
    const [isOpen, setIsOpen] = React.useState(pIsOpen);
    const [privateKey, setPrivateKey] = React.useState("");
    const [encryptedText, setEncryptedText] = React.useState("");
    const COLUMNS = ['Number', 'Word'];

    function close() {
        setIsOpen(false);
        setPrivateKey(null);
        setEncryptedText("");
        handleModalClose();
    }

    return (
        <React.Fragment>
            <Modal
                onClose={close}
                isOpen={isOpen || pIsOpen}
                overrides={{
                    Dialog: {
                        style: {
                            width: '80vw',
                            height: '80vh',
                            display: 'flex',
                            flexDirection: 'column',
                        },
                    },
                }}
            >
                {pIsEncode ? (
                    <ModalHeader> Encode </ModalHeader>

                ) : <ModalHeader> Decode</ModalHeader>}
                <ModalBody style={{flex: '1 1 0'}}>
                    {pIsEncode ? (
                            <div className="modal-body" style={{maxWidth: "none"}}>
                                <div>
                                    <Outer>

                                        <Grid overrides={{
                                            Grid: {
                                                style: ({$theme}) => ({
                                                    margin: '0px !important',
                                                    padding: '0px !important',

                                                }),
                                            },
                                        }}>
                                            <Cell span={2}>
                                                <Inner>
                                                    <Combobox
                                                        onChange={handleInputSizeChange}
                                                        size={SIZE.compact}
                                                        options={options}
                                                        mapOptionToString={option => option.label}
                                                        value="Input size"

                                                    />
                                                </Inner>
                                            </Cell>
                                            <Cell span={2}>
                                                <Inner>

                                                    <Input
                                                        required="true"
                                                        size={SIZE.compact}
                                                        value={privateKey}
                                                        placeholder="private key"
                                                        clearable
                                                        onChange={(e) => setPrivateKey(e.target.value)}
                                                        type="password"
                                                    />

                                                </Inner>
                                            </Cell>
                                        </Grid>
                                    </Outer>
                                </div>
                                {encryptInputCount.map((value, index) => (
                                    <div>
                                        <EncryptInput indexOfOuter={index} inputSize={value}
                                                      handleEncryptInput={handleEncryptInput}></EncryptInput>
                                    </div>
                                ))}
                                <div>
                                    <Outer>

                                        <Grid overrides={{
                                            Grid: {
                                                style: ({$theme}) => ({
                                                    margin: '0px !important',
                                                    padding: '0px !important',

                                                }),
                                            },
                                        }}>
                                            <Cell span={2} overrides={{
                                                Cell: {
                                                    style: ({$theme}) => ({
                                                        margin: '0px !important',
                                                        padding: '0px !important',

                                                    }),
                                                },
                                            }}>
                                                <Inner>
                                                    <Button
                                                        type="submit"

                                                        onClick={handleSubmit.bind(null, {privateKey: privateKey})}
                                                        size={SIZE.compact}
                                                        overrides={{
                                                            style: () => ({
                                                                float: "left !important"

                                                            })
                                                        }
                                                        }
                                                    >
                                                        Encode
                                                    </Button>
                                                </Inner>
                                            </Cell>
                                        </Grid>
                                    </Outer>
                                </div>
                                {
                                    (result.length > 0) ? (
                                        <div>
                                            <StyledBody style={{wordWrap: "break-word"}}>
                                                <span style={{fontWeight: 'bold'}}>Encode Result:</span>{result}

                                            </StyledBody>
                                            <StyledAction>
                                                <CopyToClipboard text={result}>
                                                    <Button size={SIZE.mini} overrides={{
                                                        style: () => ({
                                                            width: '20%'

                                                        })
                                                    }
                                                    }>
                                                        Copy to Clipboard
                                                    </Button>
                                                </CopyToClipboard>

                                            </StyledAction>
                                        </div>
                                    ) : null
                                }


                            </div>) :
                        <div className="modal-body" style={{maxWidth: "none"}}>

                            <Outer>

                                <Grid overrides={{
                                    Grid: {
                                        style: ({$theme}) => ({
                                            margin: '0px !important',
                                            padding: '0px !important',

                                        }),
                                    },
                                }}>
                                    <Cell span={2}>
                                        <Inner>

                                            <Input
                                                required="true"
                                                size={SIZE.compact}
                                                value={privateKey}
                                                placeholder="private key"
                                                clearable
                                                onChange={(e) => setPrivateKey(e.target.value)}
                                                type="password"
                                            />

                                        </Inner>
                                    </Cell>
                                </Grid>
                            </Outer>
                            <Outer>

                                <Grid overrides={{
                                    Grid: {
                                        style: ({$theme}) => ({
                                            margin: '0px !important',
                                            padding: '0px !important',

                                        }),
                                    },
                                }}>
                                    <Cell span={12}>
                                        <Inner>

                                            <Textarea
                                                value={encryptedText}
                                                onChange={e => setEncryptedText(e.target.value)}
                                                placeholder="Encrypted input"
                                                clearOnEscape
                                            />

                                        </Inner>
                                    </Cell>
                                </Grid>
                            </Outer>
                            <div>
                                <Outer>

                                    <Grid overrides={{
                                        Grid: {
                                            style: ({$theme}) => ({
                                                margin: '0px !important',
                                                padding: '0px !important',

                                            }),
                                        },
                                    }}>
                                        <Cell span={2} overrides={{
                                            Cell: {
                                                style: ({$theme}) => ({
                                                    margin: '0px !important',
                                                    padding: '0px !important',

                                                }),
                                            },
                                        }}>
                                            <Inner>
                                                <Button
                                                    type="submit"

                                                    onClick={handleSubmit.bind(null, {
                                                        privateKey: privateKey,
                                                        encryptedText: encryptedText
                                                    })}
                                                    size={SIZE.compact}
                                                    overrides={{
                                                        style: () => ({
                                                            float: "left !important"

                                                        })
                                                    }
                                                    }
                                                >
                                                    Decode
                                                </Button>
                                            </Inner>
                                        </Cell>
                                    </Grid>
                                </Outer>
                            </div>
                            <Table columns={COLUMNS} data={keywordList} divider={DIVIDER.vertical}
                                   overrides={{
                                       Root: {
                                           style: {
                                               maxHeight: '300px !important',
                                           },
                                       },
                                   }}
                            />


                        </div>}

                </ModalBody>
                <ModalFooter>
                    <ModalButton kind="tertiary" onClick={close}>
                        Cancel
                    </ModalButton>
                    <ModalButton onClick={close}>Okay</ModalButton>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
}
export default ModalEncode;