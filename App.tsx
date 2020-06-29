import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

export default class App extends React.Component {
  state = {
    isRecording: false,
  };
  recording = new Audio.Recording();

  async componentDidMount() {
    const response = await Audio.requestPermissionsAsync();
    console.log(response);
    console.log('componentDidMount');
  }

  onRecordClicked() {
    console.log('record!');
    let state = this.state;
    state.isRecording = state.isRecording ? false : true;
    this.setState(state);

    if (state.isRecording) {
      this.recording = new Audio.Recording();
      this.recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY).then(() => {
        //recording.setOnRecordingStatusUpdate(this.updateScreenForRecordingStatus);
        this.recording.startAsync();
      });
    } else {
      const path: string = this.recording.getURI() || '';
      console.log('recording file: ' + path);
      this.recording.stopAndUnloadAsync();
    }
  }

  onPlayClicked() {
    console.log('play!');

    console.log(FileSystem.DIRECTORY_DOWNLOADS);
  }

  render() {
    console.log('render!');
    const { isRecording } = this.state;
    const recordButtonText = isRecording ? 'Stop' : 'Record';
    const recordButtonIcon = isRecording ? 'stop-circle-outline' : 'record-circle-outline';

    return (
      <LinearGradient style={styles.container} colors={['#4c669f', '#3b5998', '#192f6a']}>
        <StatusBar style="dark" />
        <View style={{ padding: 30 }}>
          <MaterialCommunityIcons.Button
            style={styles.button_record}
            onPress={() => this.onRecordClicked()}
            name={recordButtonIcon}
            size={80}
            color="white"
          >
            <Text style={styles.text}>{recordButtonText}</Text>
          </MaterialCommunityIcons.Button>
        </View>

        <View style={{ padding: 30 }}>
          <MaterialCommunityIcons.Button
            style={styles.button_play}
            onPress={() => this.onPlayClicked()}
            name="play-circle-outline"
            size={80}
            color="white"
          >
            <Text style={styles.text}>Play</Text>
          </MaterialCommunityIcons.Button>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 24,
    color: 'white',
  },

  button_record: {
    backgroundColor: '#AF2929',
    width: 240,
  },

  button_play: {
    backgroundColor: '#19AF19',
    width: 240,
  },
});
