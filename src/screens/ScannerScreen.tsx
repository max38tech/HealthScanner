import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Flashlight, FlashlightOff } from 'lucide-react-native';
import { colors, spacing, typography } from '../theme/colors';

// Define navigation types for this screen
type RootStackParamList = {
  Scanner: undefined;
  ProductDetail: { barcode: string };
};

type ScannerScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Scanner'>;

export const ScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [flashMode, setFlashMode] = useState<boolean>(false);
  const navigation = useNavigation<ScannerScreenNavigationProp>();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (scanned) return;
    setScanned(true);
    
    // Navigate to ProductDetail and pass barcode
    navigation.navigate('ProductDetail', { barcode: data });
    
    // Reset scanner after 2 seconds to allow consecutive scans
    setTimeout(() => {
      setScanned(false);
    }, 2000);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  
  if (hasPermission === false) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          enableTorch={flashMode}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e'],
          }}
        />
      )}
      
      {/* Scanner Overlay UI */}
      <View style={styles.overlay}>
        <View style={styles.unfocusedContainer} />
        
        <View style={styles.middleContainer}>
          <View style={styles.unfocusedContainer} />
          
          <View style={styles.focusedContainer}>
            {/* Corner Markers */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          
          <View style={styles.unfocusedContainer} />
        </View>
        
        <View style={styles.bottomContainer}>
          <Text style={styles.instructionText}>
            Scan a Japanese product barcode
          </Text>
          
          <TouchableOpacity 
            style={styles.flashButton} 
            onPress={() => setFlashMode(!flashMode)}
          >
            {flashMode ? (
              <Flashlight color={colors.primaryDark} size={24} />
            ) : (
              <FlashlightOff color={colors.textLight} size={24} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.sizes.md,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  middleContainer: {
    flexDirection: 'row',
    height: 250,
  },
  focusedContainer: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    paddingTop: spacing.xl,
  },
  instructionText: {
    color: '#fff',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.xl,
  },
  flashButton: {
    backgroundColor: '#fff',
    padding: spacing.md,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: colors.primary,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 10,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 10,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 10,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 10,
  },
});
