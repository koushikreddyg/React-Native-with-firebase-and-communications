import React, { Component } from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
  const { containerStyle, CardSectionStyle, textStyle } = styles;
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => {}}
      transparent
      visible={visible}
    >
      <View style={containerStyle}>
        <CardSection style={CardSectionStyle}>
          <Text style={textStyle}>{children}</Text>
        </CardSection>
        <CardSection>
          <Button onPress={onAccept} text="Yes" />
        </CardSection>
        <CardSection>
          <Button onPress={onDecline} text="No" />
        </CardSection>
      </View>
    </Modal>
  );
};
const styles = {
  CardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'relative',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center'
  }
};

export { Confirm };
