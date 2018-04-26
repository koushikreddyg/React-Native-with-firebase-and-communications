import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Communications from 'react-native-communications';
import EmployeeForm from './EmployeeForm';
import { Card, CardSection, Button, Confirm } from './common';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';

class EmployeeEdit extends Component {
  state = { showModal: false };
  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
      console.log({ prop, value });
    });
  }
  onAccept() {
    this.props.employeeDelete({ uid: this.props.employee.uid });
  }
  onDecline() {
    this.setState({ showModal: false });
  }
  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.employeeSave({
      name,
      phone,
      shift,
      uid: this.props.employee.uid
    });
  }
  onTextPress() {
    const { phone, shift } = this.props;
    Communications.text(phone, `Your upcomming shift ${shift}`);
  }
  render() {
    return (
      <Card>
        <EmployeeForm />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)} text="Save Changes" />
        </CardSection>
        <CardSection>
          <Button onPress={this.onTextPress.bind(this)} text="Text Schedule" />
        </CardSection>
        <CardSection>
          <Button
            onPress={() => this.setState({ showModal: !this.state.showModal })}
            text="Fire Employee"
          />
        </CardSection>
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          {'Are you sure you want to delete this?'}
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { name, phone, shift } = state.employeeForm;
  return {
    name,
    phone,
    shift
  };
};

export default connect(mapStateToProps, {
  employeeUpdate,
  employeeSave,
  employeeDelete
})(EmployeeEdit);
