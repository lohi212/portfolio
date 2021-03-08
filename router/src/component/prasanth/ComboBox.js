import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import _uniqueId from 'lodash/uniqueId';


var levelValue;
var subLevelValue;
var levelNum;
var newImpLevel;
var newImpSubLevel;
var importanceScore = new Number();
var importanceLevel = {
  "level": [
    {
      "levelName": "veryhigh",
      "levelRating": 4
    },
    {
      "levelName": "high",
      "levelRating": 3
    },
    {
      "levelName": "medium",
      "levelRating": 2
    },
    {
      "levelName": "low",
      "levelRating": 1
    },
    {
      "levelName": "verylow",
      "levelRating": 0
    }
  ]
};

var importanceSubLevel = {
  "level": [


    {
      "levelName": "bottom",
      "levelRating": 1
    },
    {
      "levelName": "mid",
      "levelRating": 2
    },
    {
      "levelName": "top",
      "levelRating": 3

    }
  ]
};

var valueRatingLevel = 0;
var valueRatingSubLevel = 0;
const ComboBox = (props) => {

  // const [value, setValue] = React.useState(importanceLevel.level[0].levelName);
  const [id] = React.useState(_uniqueId('combo-box-demo-'));
  console.log(id);
  console.log(props);
  var newVal;
  var valueLevel = 0;
  var valueSubLevel = 0;
  var test1 = 1;
  const setimportanceData = () => {
    newVal = props.imp;
    valueLevel = parseInt(newVal / 3);
    valueSubLevel = newVal % 3;
    console.log(valueLevel);
    console.log(valueSubLevel);
  }

  const test = () => {
    test1 = importanceLevel.level.find(function (i) {
      return i.levelRating == valueLevel;
    });
    setValueLevelComboBox(test1.levelName);
  }


  const [valueLevelComboBox, setValueLevelComboBox] = React.useState();
  const [valueSubLevelComboBox, setValueSubLevelComboBox] = React.useState();


  useEffect(() => {
    console.log("useEffect");
    setimportanceData();
    test();
    console.log(test1);
  });




  const [inputLevelValue, setInputLevelValue] = React.useState('');
  const [inputSubLevelValue, setInputSubLevelValue] = React.useState('');

  //const [valueRatingLevel, setRatingLevel] = React.useState();
  //const [valueRatingSubLevel, setRatingSubLevel] = React.useState();

  const handleLiveChangeLevel = (e) => {
    console.log("inside  level")
    //console.log("level live change is working");
    //console.log(e.target.value);
    levelValue = e.target.value;
    newImpLevel = importanceLevel.level.findIndex(function (i) {
      return i.levelName === levelValue;
    })
    //console.log(newImpLevel);
    if (newImpLevel > -1) {
      //console.log(importanceLevel.level[newImp].levelRating);
      levelNum = 1;
      calculateImportance(levelNum, importanceLevel.level[newImpLevel].levelRating);

    }
    // calculateImportance(newImp)
  }

  const handleLiveChangeSublevel = (e) => {
    console.log("inside sub level")
    //console.log("sublevel live change is working");
    //console.log(e.target.value);
    subLevelValue = e.target.value;
    newImpSubLevel = importanceSubLevel.level.findIndex(function (i) {
      return i.levelName === subLevelValue;
    })
    //console.log(newImpSubLevel);
    if (newImpSubLevel > -1) {
      levelNum = 2;
      calculateImportance(levelNum, importanceSubLevel.level[newImpSubLevel].levelRating);
    }
  }

  const calculateImportance = (comboBox1, comboBox2) => {

    console.log(comboBox1);
    console.log(comboBox2);

    importanceScore = (3 * comboBox1) + comboBox2;
    console.log(importanceScore);
    props.onUpdateImportance(importanceScore);

  }


  return (
    <div>
      <Autocomplete
        id={id}
        options={importanceLevel.level}
        getOptionLabel={option => ((option === null) ? "" : option.levelName)}
        disabled={props.disable}
        onChange={(event, newValue) => {
          newValue === null ? alert(newValue) :
            alert(newValue.levelRating);
          setValueLevelComboBox(newValue);
          valueRatingLevel = newValue.levelRating;
          calculateImportance(valueRatingLevel, valueRatingSubLevel);
        }}
        inputValue={inputLevelValue}
        onInputChange={(event, newInputValue) => {
          setInputLevelValue(newInputValue);
        }}
        value={valueLevelComboBox}
        style={{ width: 130 }}
        renderInput={params => (
          <TextField
            {...params}
            label="Combo box"
            variant="outlined"
            fullWidth
          //onSelect={(e) => { alert("clicked  level " + e.target.value) }}
          />
        )}
      />

      <div style={{ marginTop: "20px" }}></div>

      <Autocomplete
        id={id}
        options={importanceSubLevel.level}
        getOptionLabel={option => ((option === null) ? "" : option.levelName)}
        disabled={props.disable}
        onChange={(event, newValue) => {
          newValue === null ? alert(newValue) :
            alert(newValue.levelRating);
          setValueSubLevelComboBox(newValue);
          valueRatingSubLevel = newValue.levelRating;
          calculateImportance(valueRatingLevel, valueRatingSubLevel);
        }}

        inputValue={inputSubLevelValue}
        onInputChange={(event, newInputValue) => {
          setInputSubLevelValue(newInputValue);
        }}

        style={{ width: 130 }}
        renderInput={params => (
          <TextField
            //{...console.log({ ...params })}
            {...params}
            label="Combo box"
            variant="outlined"
            fullWidth
          //onSelect={(e) => { alert("clicked  level " + e.target.value) }}
          />
        )}
      />
    </div>

  );
}


export default ComboBox;
