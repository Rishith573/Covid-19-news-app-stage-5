import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker'
import {Text, View, StyleSheet, SafeAreaView, Platform, StatusBar, Image} from 'react-native';
import axios from 'axios';
import {RFValue} from 'react-native-responsive-fontsize'

export default class News extends React.Component{

    constructor(){
        super();
        this.state={
            allCountryInfo:"",
            countryCode: "IN",
            chosenCountryInfo: {},
            dropdownHeight: 50
        }
    }

    getCovidData = async (countryCode) => {
        let info = await axios.get("https://covid19.richdataservices.com/rds/api/query/int/jhu_country/select?cols=date_stamp,cnt_confirmed,cnt_death,cnt_recovered&where=(iso3166_1=" + countryCode + ")&format=amcharts&limit=5000");
        console.log(info.data.dataProvider[info.data.dataProvider.length -1])
        let latestData = info.data.dataProvider[info.data.dataProvider.length -1]
        console.log(latestData)
        this.setState({
            chosenCountryInfo: latestData
        })
    }

    componentDidMount(){
        this.getCovidData(this.state.countryCode);
            
    }

    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea}/>
                <View style={styles.appTitle}>
            {/* <View style={styles.appIcon}>
              <Image
                source={require("../assets/app logo.PNG")}
                style={styles.iconImage}
              ></Image>
            </View> */}
            {/* <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>COVID 19 NEWS APP</Text>
            </View> */}
          </View>
                <View style={styles.fieldsContainer}>
                <View style={{height: RFValue(this.state.dropdownHeight)}}>
                <DropDownPicker
                    items={[
                        {label: "INDIA", value: "IN", icon: ()=>{return(<Image
                            source={require("../assets/IND.png")}
                            style={{width: 30, height: 30}}
                        />)}},
                        {label: "UNITED STATES OF AMERICA", value: "US", icon: ()=>{return(<Image
                            source={require("../assets/USA.png")}
                            style={{width: 30, height: 30}}
                        />)} },
                        {label: "UNITED KINGDOM", value: "GB", icon: ()=>{return(<Image
                            source={require("../assets/GB.png")}
                            style={{width: 30, height: 30}}
                        />)}},
                        {label: "AUSTRALIA", value:"AU", icon: ()=>{return(<Image
                            source={require("../assets/AU.jpg")}
                            style={{width: 30, height: 30}}
                        />)}},
                        {label: "NEW ZEALAND", value: "NZ", icon: ()=>{return(<Image
                            source={require("../assets/NZ.png")}
                            style={{width: 30, height: 30}}
                        />)}}
                        
                        
                    ]}

                    containerStyle={{
                        height: 40,
                        borderRadius: 20,
                        // marginBottom: 20,
                        backgroundColor: "lightblue",
                        borderWidth: 2,
                        width: 350,
                        alignSelf: "center"
                      }}

                    style={{ 
                        backgroundColor: "lightblue",
                        marginLeft: 10,
                        marginRight: 10,
                        marginBottom: 40
                     }}
                          

                    defaultValue={this.state.countryCode}
                    
                    onChangeItem={(item)=>{
                        this.setState({
                            countryCode: item.value
                        })
                        this.getCovidData(item.value)
                    }}
                    onOpen={()=>{
                        this.setState({
                            dropdownHeight: 170
                        })
                    }}
                    onClose={()=>{
                        this.setState({
                            dropdownHeight: 50
                        })
                    }}
                    labelStyle={{
                        color: "white"
                    }}
                    dropDownStyle={{
                        backgroundColor: "white"
                    }}
                    itemStyle= {{
                        justifyContent: "flex-start",
                        marginTop: 10,
                        backgroundColor: "lightblue"
                    }}
                    
                />
                </View>
                </View>
                
                
                <View style={styles.confirmedCases}>
                    <Text style={styles.text1}>{"Confirmed cases:"}</Text>
                    <Text style={styles.text2}>{this.state.chosenCountryInfo.cnt_confirmed}</Text>
                </View>
                
                <View style={styles.deadCases}>
                    <Text style={styles.text1}>{"Deaths:"}</Text>
                    <Text style={styles.text2}>{this.state.chosenCountryInfo.cnt_death}</Text>
                </View>
                
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container: {
        flex: 1
    },
    appTitle: {
        flex: 0.08,
        flexDirection: "row"
      },
      appIcon: {
        flex: 0.05,
        justifyContent: "center",
        alignItems: "center"
      },
      iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
      },
      appTitleTextContainer: {
        flex: 0.2,
        justifyContent: "center"
      },
      appTitleText: {
        color: "black",
        fontSize: RFValue(28)
      },
    confirmedCases: {
        justifyContent: "center",
        flex: 0.2,
        marginTop: 50,
        borderWidth: 2,
        borderRadius: 50,
        backgroundColor: "lightblue",
        width: 300,
        alignSelf: "center"
    },
    deadCases:{
        justifyContent: "center",
        flex: 0.2,
        marginTop: 50,
        borderWidth: 2,
        borderRadius: 50,
        backgroundColor: "lightblue",
        width: 300,
        alignSelf: "center"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    dropDownPicker: {
        flex: 0.2
    },
    text1: {
        fontSize: 30,
        fontWeight: "bold",
        color: "red",
        textAlign: "center",
    },
    text2:{
        fontSize: 22.5,
        textAlign: "center",
        marginTop: 25
    },
    fieldsContainer: {
        flex: 0.3
    }
})