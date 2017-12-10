import React, { Component } from 'react';
import { Text,
         TextInput,
         View,
         Alert,
         TouchableOpacity,
         StyleSheet}
    from 'react-native';
import axios from 'axios';

export default class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '', count: 0 };
        this._setCount();
    }

    _setCount = () => {
        axios.get(`http://shadid12.herokuapp.com/count/${this.props.user}`)
            .then((res) => {
                this.setState({count: res.data});
            })
    };

    showCount = () => {
        axios.get(`http://shadid12.herokuapp.com/count/${this.props.user}`)
            .then((res) => {
                Alert.alert(
                    `${this.props.user} Total: ${res.data}`
                )
            })
    };

    handleSend = () => {
        if (this.state.text ){
            var data = this.state.text;
            var r = '';
            var ro2 = data.split('R02~');
            var ro3 = data.split('R03~');
            var ro4 = data.split('R04~');
            var ro5 = data.split('R05~');
            var ro6 = data.split('R06~');
            var ro7 = data.split('R07~');
            r = r + ro2[1].split('|')[0] + ' ' +  ro3[1].split('|')[0] + ' ' + ro4[1].split('|')[0] + ' ' + ro5[1].split('|')[0]
                + ' ' + ro6[1].split('|')[0] + ' ' + ro7[1].split('|')[0];
            r = r.replace(/\s\s+/g, ' ');
            var so2 = data.split('S02~');
            var pin = so2[1].split('|')[0];

            axios.post('http://shadid12.herokuapp.com/item', {
                username: this.props.user,
                address:  r,
                pin: pin,
                count: this.state.count + 1
            }).then((res) => {
                this.setState({count: this.state.count + 1, text: ''});
                console.log(res);
            })

        } else {
            console.log('its empty');
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.textArea}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <View >
                    <TouchableOpacity style={styles.buttonContainer}
                                      onPress={this.handleSend}
                    >
                        <Text style={styles.buttonText} >Send</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.showCount}
                                      style={styles.showCount}>
                        <Text style={styles.showCountText}>View Count</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C1CAD6',
        padding: 20
    },
    textArea: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 80,
        marginTop: 60
    },
    buttonContainer: {
        backgroundColor: '#856084',
        paddingVertical: 20
    },

    buttonText: {
        textAlign: 'center',
        color: '#FFF'
    },
    showCount: {
        backgroundColor: '#acd65b',
        padding: 10
    },
    showCountText: {
        marginTop: 5,
        textAlign: 'center',
        color: '#FFF'
    }
});