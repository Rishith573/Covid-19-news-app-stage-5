import React from 'react';
import {Text, View, SafeAreaView, StyleSheet, Platform, StatusBar, TextInput, TouchableOpacity} from 'react-native';
import db from '../config';

const keyWords = ["symptoms", "treatment", "cause",
 "safe", "vaccine", "covid", "cough", "cold", "minor sypmptoms", "harmful", "effects", "COVID-19", "people", "get",
"happens", "risk", "severe", "illness", "long-term", "test", "develop"]

var keyWordsPresentInTheQuestion = []

var relevantAnswers = []

export default class FAQ extends React.Component{

    

    constructor(){
        super();
        this.state={
            question:'',
            FAQ: {},
            answers: [],
            buttonText: 'Submit',
            showAnswer: false
        }
    }
    // extracting data from firebase as soon as the component is mounted
    componentDidMount(){
        let dbRef = db.ref("/");
        dbRef.on("value", (data)=>{
            this.setState({
                FAQ: data.val()
            })
        });

    }
    // writing a function call searchForAnswer to find out the answer for the question entered by the user
    searchForAnswer = () => {
        if(this.state.buttonText === 'Ask another question'){
            this.setState({
                question: '',
                answers: [],
                showAnswer: false
            })
        }else {
            this.setState({
                showAnswer: true
            })
        }
        this.setState({
            buttonText: this.state.buttonText === 'Submit' ? 'Ask another question' : 'Submit'
        })
        
        keyWordsPresentInTheQuestion = []
        relevantAnswers = []
        console.log(this.state.question);
        console.log(this.state.FAQ);
        for(let i = 0; i < this.state.FAQ.length; i++){
            console.log(this.state.FAQ[i])
        }
        //extracting keywords present in user's question
        for(let i = 0; i < keyWords.length; i++){
            if(this.state.question.indexOf(keyWords[i]) > -1){
                keyWordsPresentInTheQuestion.push(keyWords[i])
            }
        }
        //find out the questions in the database containing the extracted keywords
        for(let i = 0; i < this.state.FAQ.length; i++){
            var questionFromDb = this.state.FAQ[i].question
            console.log(questionFromDb)
            for(let j = 0; j < keyWordsPresentInTheQuestion.length; j++){
                console.log(keyWordsPresentInTheQuestion[j])
                if(questionFromDb.indexOf(keyWordsPresentInTheQuestion[j])> -1){
                    console.log("word is presnt in the question")
                    relevantAnswers.push(this.state.FAQ[i].answer)
                }
            }
        }
        this.setState({
            answers: relevantAnswers
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea}/>
                <View style={styles.questionContainer}>
                    <TextInput
                        value={this.state.question}
                        placeholder="Ask your question"
                        onChangeText={(text)=>{
                            this.setState({
                                question: text
                            })
                        }}
                        style={styles.textInput}
                    />

                    {this.state.showAnswer && <View>
                        {
                            this.state.answers.map((value, index) => {
                                return(
                                    <Text key={index.toString()}>{value}</Text>
                                )
                            })
                        }
                    </View>}

                    <TouchableOpacity style={styles.submitButton} onPress={this.searchForAnswer}>
                        <Text style={styles.submitText}>{this.state.buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0        
    },
    textInput: {
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: "lightblue",
        height: 50
    },
    container: {
        flex: 1
    },
    submitButton: {
        backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 50,
        alignSelf: "center",
        marginTop: 50,
        borderRadius: 20,
        borderWidth: 2
    },
    submitText: {
        color: "white",
        fontWeight: "bold",
        fontFamily: "timesnewroman"
    }
})