import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import ROSLIB from 'roslib';

//robot face
import smile_01 from './DrPictures/smile/smile_01.jpg';
import smile_02 from './DrPictures/smile/smile_02.jpg';
import smile_03 from './DrPictures/smile/smile_03.jpg';
import smile_04 from './DrPictures/smile/smile_04.jpg';
import smile_05 from './DrPictures/smile/smile_05.jpg';
import happy_01 from './DrPictures/happy/happy_01.jpg';
import happy_02 from './DrPictures/happy/happy_02.jpg';
import happy_03 from './DrPictures/happy/happy_03.jpg';
import happy_04 from './DrPictures/happy/happy_04.jpg';
import happy_05 from './DrPictures/happy/happy_05.jpg';
import sad_01 from './DrPictures/sad/sad_01.jpg';
import sad_02 from './DrPictures/sad/sad_02.jpg';
import sad_03 from './DrPictures/sad/sad_03.jpg';
import sad_04 from './DrPictures/sad/sad_04.jpg';
import sad_05 from './DrPictures/sad/sad_05.jpg';
import blinking_01 from './DrPictures/blinking/blinking_01.jpg';
import blinking_02 from './DrPictures/blinking/blinking_02.jpg';
import blinking_03 from './DrPictures/blinking/blinking_03.jpg';
import blinking_04 from './DrPictures/blinking/blinking_04.jpg';
import blinking_05 from './DrPictures/blinking/blinking_05.jpg';

const smile_faces = [smile_01, smile_02, smile_03, smile_04, smile_05];
const happy_faces = [happy_01, happy_02, happy_03, happy_04, happy_05];
const blinking_faces = [blinking_01, blinking_02, blinking_03, blinking_04, blinking_05];
const sad_faces = [sad_01, sad_02, sad_03, sad_04, sad_05];

function ImageSequence() {
  const [index, setIndex] = useState(0);
  const [expression, setExpression] = useState('happy');

  useEffect(() => {
    // Connecting to ROS
    const ros = new ROSLIB.Ros({
      url: 'ws://127.0.0.1:9090'
    });

    ros.on('connection', function() {
      console.log('Connected to websocket server.');
    });

    ros.on('error', function(error) {
      console.log('Error connecting to websocket server: ', error);
    });

    ros.on('close', function() {
      console.log('Connection to websocket server closed.');
    });

    // Subscribing to a Topic
    const expressionTopic = new ROSLIB.Topic({
      ros: ros,
      name: '/face_command_topic',
      messageType: 'std_msgs/String'
    });

    expressionTopic.subscribe(function(message) {
      setExpression(message.data);
    });

    // Clean up function
    return () => {
      expressionTopic.unsubscribe();
      ros.close();
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const faces = getFacesByExpression(expression);
      setIndex((index) => (index + 1) % faces.length);
    }, 300);

    return () => clearInterval(intervalId);
  }, [expression]);

  const faces = getFacesByExpression(expression);

  return <img src={faces[index]} style={{ width: '100%', height: 'auto' }} />;
}

function getFacesByExpression(expression) {
  switch (expression) {
    case 'smile':
      return smile_faces;
    case 'happy':
      return happy_faces;
    case 'sad':
      return sad_faces;
    case 'blinking':
      return blinking_faces;
    default:
      return [];
  }
}

function App() {
  return (
    <div className="App">
      <ImageSequence />
    </div>
  );
}

export default App;
