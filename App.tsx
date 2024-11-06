import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  // useColorScheme,
  View,
} from 'react-native';
import BouncyCheckBox from 'react-native-bouncy-checkbox';

// import {
//   Colors,
// } from 'react-native/Libraries/NewAppScreen';
import * as Yup from 'yup';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    // .min(4, 'Password should be at least 4 characters long')
    // .max(16, 'Password should be at most 16 characters long')
    .required('Password length is required!'),
});

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  const [password, setPassword] = useState('');
  const [isPasswrodGenerated, setIsPasswrodGenerated] = useState(false);
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [isLowerCase, setIsLowerCase] = useState(true);
  const [isNumber, setIsNumber] = useState(false);
  const [isSymbol, setIssymbol] = useState(false);

  const generatePasswordString = (len: number) => {
    let characterList = '';
    let upperCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowerCharacters = upperCharacters.toLowerCase();
    let numbers = '1234567890';
    let specialChars = '!@#$%^&*()_+';

    if (isUpperCase) {
      characterList += upperCharacters;
    }
    if (isLowerCase) {
      characterList += lowerCharacters;
    }
    if (isNumber) {
      characterList += numbers;
    }
    if (isSymbol) {
      characterList += specialChars;
    }

    const passwordResult = createPassword(characterList, len);
    setPassword(passwordResult);
    setIsPasswrodGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const resetPassword = () => {
    setIsPasswrodGenerated(false);
    setPassword('');
    setIsLowerCase(true);
    setIssymbol(false);
    setIsNumber(false);
    setIsUpperCase(false);
  };

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.containerHeading}>Password Generator</Text>
        </View>

        <Formik
          initialValues={{ passwordLength: '' }}
          validationSchema={passwordSchema}
          onSubmit={(values) => generatePasswordString(+values.passwordLength)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            // isSubmitting,
          }) => (
            <View>
              <View style={styles.header}>
                <Text style={styles.headerText}>Password Length</Text>
                {touched.passwordLength && errors.passwordLength && (
                  <Text style={styles.error}>{errors.passwordLength}</Text>
                )}
                <TextInput
                  style={styles.inputField}
                  value={values.passwordLength}
                  onChangeText={handleChange('passwordLength')}
                  onBlur={handleBlur('passwordLength')}
                  placeholder="Ex. 8"
                  keyboardType="numeric"
                />
                <View style={styles.checkboxContainer}>
                  <Text style={styles.headerText}>Include Uppercase</Text>
                  <BouncyCheckBox
                    isChecked={isUpperCase}
                    onPress={() => setIsUpperCase(!isUpperCase)}
                  />
                </View>
                <View style={styles.checkboxContainer}>
                  <Text style={styles.headerText}>Include LowerCase</Text>
                  <BouncyCheckBox
                    isChecked={isLowerCase}
                    onPress={() => setIsLowerCase(!isLowerCase)}
                  />
                </View>
                <View style={styles.checkboxContainer}>
                  <Text style={styles.headerText}>Include Numbers</Text>
                  <BouncyCheckBox
                    isChecked={isNumber}
                    onPress={() => setIsNumber(!isNumber)}
                  />
                </View>
                <View style={styles.checkboxContainer}>
                  <Text style={styles.headerText}>Include Symbols</Text>
                  <BouncyCheckBox
                    isChecked={isSymbol}
                    onPress={() => setIssymbol(!isSymbol)}
                  />
                </View>
                <View />
                {/* <Text>Password: {password}</Text> */}
                <View style={{flex: 1, flexDirection: 'row',justifyContent: 'space-between', width: 300, marginTop: 30, marginBottom: 30}}>
                  <TouchableOpacity onPress={() => handleSubmit()} style={styles.generateButton}>
                    <Text style={styles.button}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={resetPassword} style={{...styles.generateButton, backgroundColor: '#343a40'}}>
                    <Text style={styles.button}>
                      Reset
                    </Text>
                  </TouchableOpacity>
                </View>
                {isPasswrodGenerated && (
                  <View>
                    <Text style={styles.headerText}>Your password has been generated.</Text>
                  </View>
                )}
        <View>
          <Text style={{...styles.genetatedPassword}}>{password}</Text>
        </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    fontWeight: 'bold',
    color: 'white',
  },
  genetatedPassword: {
    color: 'green',
    fontWeight: 'bold',
    margin: 10,
    width: 290,
    fontSize: 18,
    marginTop: 10,
    marginLeft: 'auto',
    alignItems: 'center',
  },
  generateButton: {
    padding: 10,
    backgroundColor: '#007bff',
    cursor: 'pointer',
    width:50,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bouncyCheckbox: {
    fontSize: 10,
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 50,
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
  },
  header: {
    // backgroundColor: 'black',
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%'
  },
  headerText: {
    fontWeight: 'bold',
    marginRight: 'auto',
    marginLeft: 'auto',
    margin: 10,
    width: 300,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#f8f9fa',
    height: '100%',
    backgroundColor: 'white',
    // minHeight: '100%',
  },
  headingContainer: {
    width: 300,
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
  },
  containerHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gray',
    width: 300,
    marginTop: 50,
  },
  inputField: {
    backgroundColor: 'white',
    borderColor: 'gray',
    width: 300,
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    // borderBottomColor: '2px solid black',
    borderBottomColor: 'gray',  // Set the color of the bottom border
    borderBottomWidth: 2,       // Set the thickness of the bottom border

  },
  buttonContainer: {
    marginTop: 20,
  },
  resetButton: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default App;
