import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }
  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
    }
  }
  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return <Button text="Login!" onPress={this.onButtonPress.bind(this)} />;
  }
  render() {
    return (
      <Card style={{ paddingTop: 40 }}>
        <CardSection>
          <Input
            label="Email"
            placeholder="example@email.com"
            value={this.props.email}
            onChangeText={this.onEmailChange.bind(this)}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Password"
            onChangeText={this.onPasswordChange.bind(this)}
            placeholder="password"
            value={this.props.password}
            secureTextEntry
          />
        </CardSection>
        {this.renderError()}
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}
const styles = {
  errorTextStyle: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 20
  }
};
const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};
export default connect(mapStateToProps, {
  loginUser,
  emailChanged,
  passwordChanged
})(LoginForm);
