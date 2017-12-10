import React from 'react';
import { StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView }
    from 'react-native';
import Scanner from './components/Scanner';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            logged: false
        }
    }

    handleLoging = (e) => {
        if (this.state.username) {
            this.setState({logged: true});
        }
    };


    notLoggedin() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logo}>
                    <Image
                        source={require('./img/box.png')}
                    />
                    <Text>Username is {this.state.username}</Text>
                </View>
                <View style={styles.form}>
                    <View style={stylesForm.container}>
                        <TextInput
                            placeholder="username"
                            style={stylesForm.input}
                            onChangeText={(text) => this.setState({username: text})}
                            value={this.state.username}
                        />
                        <TouchableOpacity style={stylesForm.buttonContainer}
                                          onPress={this.handleLoging}
                        >
                            <Text style={stylesForm.buttonText} >Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }


    render() {
        if (this.state.logged === false) {
            return (this.notLoggedin())
        } else {
            return (
                <Scanner user={this.state.username} />
            )
        }
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C1CAD6'
    },
    logo: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    form: {

    }
});

const stylesForm = StyleSheet.create({
    container: {
        padding: 20
    },

    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 80
    },

    buttonContainer: {
        backgroundColor: '#856084',
        paddingVertical: 20
    },

    buttonText: {
        textAlign: 'center',
        color: '#FFF'
    }

});
