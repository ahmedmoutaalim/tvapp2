import React from 'react';
import { Modal as RNModal, StyleSheet, Text, View, Pressable } from 'react-native';
import Ionicons  from "react-native-vector-icons/Ionicons";

type ModalProps = {
  visible: boolean;
  title?: string;
  onClose: () => void;
  children?: React.ReactNode;
  bodyStyle?: object;
  footer?: React.ReactNode;
  footerStyle?: object;
};

const Modal = ({
  visible,
  title = 'Modal Title',
  onClose,
  children,
  bodyStyle,
  footer,
  footerStyle,
}: ModalProps) => {
  return (
    <RNModal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
         
          <Pressable onPress={onClose} style={styles.closeIcon}>
            <Ionicons name="close" size={20} color="#fff" />
          </Pressable>

        
          <Text style={styles.title}>{title}</Text>

         
          <View style={[styles.body, bodyStyle]}>
            {children}
          </View>

        
          {footer && (
            <View style={[styles.footer, footerStyle]}>
              {footer}
            </View>
          )}
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '50%',
    maxWidth: 400,
    maxHeight: '80%',
    height : 'auto',
    backgroundColor: '#1D272E',
    borderRadius: 16,
    padding: 16,
    paddingTop: 32,
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 10,
    padding: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  body: {
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
});
