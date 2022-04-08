import React, {useState} from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    Image,
    PermissionsAndroid,
    Platform,
    useWindowDimensions,
    Alert
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RenderHtml from 'react-native-render-html';
import {useSelector} from "react-redux";
import moment from "moment";
import styles from "./styles";

const Index = () => {
    const bookingData = useSelector(state => state.booking?.bookingDataById);
    const [filePath, setFilePath] = useState('');

    const isPermitted = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs access to Storage data',
                    },
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                alert('Write permission err', err);
                return false;
            }
        } else {
            return true;
        }
    };

    const source = {
        html: `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <title> Booking Details </title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="path/to/css/smart-forms.css">
                <link rel="stylesheet" href="path/to/css/font-awesome.min.css">      
              </head>
              <body>
                <div style="padding-bottom: 18px;font-size : 22px;  text-align:center">Booking Report</div>
                <table style=" border-collapse: collapse; margin: 24px;">
                  <tbody>
                     <tr style="border: 1px solid #333; margin-bottom: 10px;">
                      <td  style="flex:1; line-height: 30px; border-right: 1px solid #000; padding-left: 16px; "> <b>Email:-</b></td>
                      <td style="flex:1; line-height: 30px;padding-left: 16px;">${bookingData.email}</td>
                     </tr>
                     <tr style="border: 1px solid #333;margin-bottom: 10px;">
                      <td style="flex:1; line-height: 30px; border-right: 1px solid #000; padding-left: 16px; "><b>Guest Name:-</b></td>
                      <td style="flex:1; line-height: 30px; padding-left: 16px;">${bookingData.firstName + ' ' + bookingData.lastName}</td>
                     </tr>
                     <tr style="border: 1px solid #333;margin-bottom: 10px;">
                      <td style="flex:1; line-height: 30px; border-right: 1px solid #000; padding-left: 16px; "><b>Phone:-</b></td>
                      <td style="flex:1; line-height: 30px;padding-left: 16px;">${bookingData.phoneNumber}</td>
                     </tr>
                     <tr style="border: 1px solid #333;margin-bottom: 10px;">
                      <td style="flex:1; line-height: 30px; border-right: 1px solid #000; padding-left: 16px; "><b>Check-in Date:-</b></td>
                      <td style="flex:1; line-height: 30px;padding-left: 16px;">${moment(bookingData.checkInDate).format('DD-MM-YYYY')}</td>
                     </tr>
                     <tr style="border: 1px solid #333;margin-bottom: 10px;">
                      <td style="flex:1; line-height: 30px; border-right: 1px solid #000; padding-left: 16px; "><b>Check-out Date:-</b></td>
                      <td style="flex:1; line-height: 30px;padding-left: 16px;">${moment(bookingData.checkOutDate).format('DD-MM-YYYY')}</td>
                     </tr>
                     <tr style="border: 1px solid #333;margin-bottom: 10px;">
                      <td style="flex:1; line-height: 30px; border-right: 1px solid #000; padding-left: 16px; "><b>Number of Pax:-</b></td>
                      <td style="flex:1; line-height: 30px;padding-left: 16px;">${bookingData.numberAdults}</td>
                     </tr>
                     <tr style="border: 1px solid #333;margin-bottom: 10px;">
                      <td style="flex:1; line-height: 30px; border-right: 1px solid #000; padding-left: 16px; "><b>Number of Kids:-</b></td>
                      <td style="flex:1; line-height: 30px;padding-left: 16px;"> ${bookingData.numberKids}</td>
                     </tr>
                     <tr style="border: 1px solid #333;margin-bottom: 10px;">
                      <td style="flex:1; line-height: 30px; border-right: 1px solid #000; padding-left: 16px; "><b>Deposit:-</b></td>
                      <td style="flex:1; line-height: 30px;padding-left: 16px;"> ${bookingData.deposit}</td>
                    </tr>
                    <tr style="border: 1px solid #333;margin-bottom: 10px;">
                     <td style="flex:1; line-height: 30px; border-right: 1px solid #000; padding-left: 16px; "><b>Total Amount:-</b></td>
                     <td style="flex:1; line-height: 30px;padding-left: 16px;"> ${bookingData.totalAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </body>
            </html>
        `
    };

    const createPDF = async () => {
        if (await isPermitted()) {
            let options = {
                html: source.html,
                fileName: 'BookingReceipt',
                directory: 'docs',
            };
            let file = await RNHTMLtoPDF.convert(options);
            console.log("file", file);
            console.log(file.filePath);
            setFilePath(file.filePath);
            Alert.alert('PDF download successfully')
        }
    };

    const { width } = useWindowDimensions();

    return (
        <SafeAreaView style={styles.container}>
            <RenderHtml
                contentWidth={width}
                source={source}
            />
            <View style={styles.viewContainer}>
                <TouchableOpacity onPress={createPDF} style={styles.TouchableContainer}>
                        <Image
                            source={{
                                uri:
                                    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/pdf.png',
                            }}
                            style={styles.imageStyle}
                        />
                        <Text style={styles.textStyle}>Download PDF</Text>
                </TouchableOpacity>
            </View>
                {/*<Text style={styles.textStyle}>{filePath}</Text>*/}
        </SafeAreaView>
    );
};

export default Index;