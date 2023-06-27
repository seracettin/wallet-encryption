import React from 'react';
import {HeaderNavigation, StyledNavigationItem, StyledNavigationList} from "baseui/header-navigation";
import {ALIGN} from "baseui/radio";
import ModalEncode from "../../components/modal/modal-encode.component";
import {Button} from "baseui/button";
import CryptoJS from "crypto-js";

class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            isActiveDecodeButton: false,
            isActiveEncodeButton: false,
            id: 0,
            encryptInputCount: [],
            options: [
                {label: 1},
                {label: 2},
                {label: 3},
                {label: 4},
                {label: 5},
                {label: 6},
                {label: 7},
                {label: 8},
                {label: 9},
                {label: 10},
                {label: 11},
                {label: 12},
                {label: 13},
                {label: 14},
                {label: 15},
                {label: 16},
                {label: 17},
                {label: 18},
                {label: 19},
                {label: 20},
                {label: 21},
                {label: 22},
                {label: 23},
                {label: 24}
            ],
            keywordList: [],
            result: "",
            functions: [
                {
                    fnEncode: CryptoJS.AES.encrypt,
                    fnHash: CryptoJS.MD5,
                    fnDecode: CryptoJS.AES.decrypt,
                    repeat: 300,
                    first: true
                },
                {
                    fnEncode: CryptoJS.DES.encrypt,
                    fnHash: CryptoJS.MD5,
                    fnDecode: CryptoJS.DES.decrypt,
                    repeat: 200

                },
                {
                    fnEncode: CryptoJS.TripleDES.encrypt,
                    fnHash: CryptoJS.MD5,
                    fnDecode: CryptoJS.TripleDES.decrypt,
                    repeat: 100
                },
                {
                    fnEncode: CryptoJS.Rabbit.encrypt,
                    fnHash: CryptoJS.MD5,
                    fnDecode: CryptoJS.Rabbit.decrypt,
                    repeat: 25,
                    last: true
                }
            ]
        }
    }

    handleSubmit = (value, event) => {
        if (!value?.privateKey) {
            return;
        }

        if (this.state.isActiveEncodeButton) {

            let wordList = this.state.keywordList;
            let text = Object.keys(wordList).map(key => {
                return key + "," + wordList[key]
            }).reduce((previousValue, currentValue) => previousValue + "@" + currentValue);

            let data = "";
            this.state.functions.forEach(f => {
                data = this.encode(f.fnEncode, this.hashPrivateKey(f.fnHash, value?.privateKey, f.repeat), (f?.first) ? text : data).toString();
            })


            this.setState({result: data});
        } else if (this.state.isActiveDecodeButton) {
            let data = "";
            let reversedList = [... this.state.functions];
            reversedList.reverse().forEach(f => {
                data = this.encode(f.fnDecode, this.hashPrivateKey(f.fnHash, value?.privateKey, f.repeat), (f?.last) ? value?.encryptedText : data).toString(CryptoJS.enc.Utf8);
            })

            this.setState({keywordList: data.split("@").map(e => e.split(","))})
            // this.state.functions.reverse();
        }


    }


    hashPrivateKey = (fn, key, repeat) => {
        return fn(key).toString().repeat(repeat);
    }
    encode = (fn, key, text) => {
        return fn(text, key);
    }
    insertRandomString = (str, adding) => {
        let stringBuilder = [], len = this.getRandomInteger(0, str.length);
        stringBuilder.push(str.substring(0, len));
        stringBuilder.push(adding);
        stringBuilder.push(str.substring(len, str.length));
        return stringBuilder.join("");
    }
    getRandomInteger = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    handleModalClose = () => {
        this.setState({isActiveDecodeButton: false, isActiveEncodeButton: false});
        this.setState({encryptInputCount: [], keywordList: []});
        this.setState({result: ""});
    };
    handleInputSizeChange = event => {
        this.calculateInputSize(event);
    };
    handleEncryptInput = (value, event) => {
        let tmp = this.state.keywordList;
        tmp[value] = event.target.value;
        this.setState({keywordList: tmp});
    };
    calculateInputSize = (val) => {
        const left = val % 6;
        const tmpAry = this.state.encryptInputCount;
        let count = 1;
        for (let i = 0; i < parseInt(val / 6); i++) {
            let temp = [];
            for (let j = 0; j < 6; j++) {
                temp[j] = count;
                count++;
            }
            tmpAry[i] = temp;
        }
        if (tmpAry.length === 0 && left > 0) {
            let temp = [];
            for (let j = 0; j < left; j++) {
                temp[j] = count;
                count++;
            }
            tmpAry[0] = temp;
        } else if (left > 0) {
            let temp = [];
            for (let j = 0; j < left; j++) {
                temp[j] = count;
                count++;
            }
            tmpAry[tmpAry.length] = temp;
        }

        this.setState({encryptInputCount: tmpAry});
    }


    render() {
        return (
            <div>
                <HeaderNavigation>
                    <StyledNavigationList $align={ALIGN.left}>
                        <StyledNavigationItem>Encode/Decode</StyledNavigationItem>
                    </StyledNavigationList>
                    <StyledNavigationList $align={ALIGN.center}/>

                    <StyledNavigationList $align={ALIGN.right}>
                    </StyledNavigationList>
                </HeaderNavigation>
                <Button style={{margin: "10px"}} onClick={() => this.setState({
                    isActiveEncodeButton: true,
                    isActiveDecodeButton: false
                })}>Open Encode Form</Button>
                <Button onClick={() => this.setState({isActiveDecodeButton: true, isActiveEncodeButton: false})}>Open
                    Decode Form</Button>
                <ModalEncode handleModalClose={this.handleModalClose}
                             handleInputSizeChange={this.handleInputSizeChange}
                             handleSubmit={this.handleSubmit}
                             pIsOpen={this.state.isActiveEncodeButton || this.state.isActiveDecodeButton}
                             pIsEncode={this.state.isActiveEncodeButton}
                             pIsDecode={this.state.isActiveDecodeButton}
                             encryptInputCount={this.state.encryptInputCount}
                             handleEncryptInput={this.handleEncryptInput}
                             options={this.state.options}
                             result={this.state.result}
                             keywordList={this.state.keywordList}
                />
            </div>
        );
    }
}

export default HomePage;