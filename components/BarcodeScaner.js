import React, { Component } from 'react';
import { Text,
    StyleSheet,
    View,
    Alert,
    TouchableOpacity}
    from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import axios from 'axios';

export default class BarcodeScaner extends Component {

    constructor(props){
        super(props);
        this.state = {
            hasCameraPermission: null,
        }
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <BarCodeScanner
                        onBarCodeRead={this._handleBarCodeRead}
                        style={styles.barCode}
                    />
                    <TouchableOpacity
                        style={styles.showCount}
                        onPress={this._showCount}
                    >
                        <Text style={styles.showCountText}>View Count</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.refresh}
                        onPress={() => {
                            this.setState({hasCameraPermission: null}, () => {
                                this.setState({hasCameraPermission: true},() => {
                                    console.log('refreshed');
                                })
                            });
                        }}
                    >
                        <Text style={styles.showCountText}>Refresh</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    _showCount = () => {
      axios.get(`http://shadid12.herokuapp.com/count/${this.props.name}`)
          .then((res) => {
            Alert.alert(
                `${this.props.name} Total: ${res.data}`
            )
          })
    };

    _handleBarCodeRead = ({ type, data }) => {
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        // console.log(data);
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
        Alert.alert(
            `Barcode Scanned`,
            `Address: ${r} Pin: ${pin}`,
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Send', onPress: () => {
                    axios.post('http://shadid12.herokuapp.com/item', {
                        username: this.props.name,
                        address:  r,
                        pin: pin
                    }).then((res) => {
                        console.log(res);
                    })
                }},
            ],
            { cancelable: false }
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C1CAD6'
    },
    barCode: {
        height: 500,
        width: 500,
        alignItems: 'center',
        justifyContent: 'center'
    },
    showCount: {
        backgroundColor: '#C1CAD6',
        padding: 10
    },
    refresh: {
        backgroundColor: '#38d603',
        padding: 10
    },
    showCountText: {
        textAlign: 'center',
        color: '#FFF'
    }
});