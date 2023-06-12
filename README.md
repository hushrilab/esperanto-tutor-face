# Esperanto Teaching Tutor Condition Face Display

* Author: Cheng Tang <c225tang@uwaterloo.ca>

This is a React App acting as a display for the robot's face which can be switched between two facial expressions: happy, smile, sad, blinking by publihsing command into a rostopic named /face_command_topic. 

## Installation

Please make sure to have NodeJS, http server, and rosbridge sever installed.

NodeJS:

Create a new folder to contain your NodeJS installation files:

`mkdir -p ~/webpage_ws/nvm`

Export that path:

`export NVM_DIR="/home/user/webpage_ws/nvm"`

Install nvm:

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash`

Source your terminal:

`source .bashrc`

Install v14:

`nvm install v14`

HTTP server:

`npm install -g http-server`

rosbridge server:

`apt-get install ros-<ROSDISTRO>-rosbridge-server`

## Available Scripts

Get into the app directory by executing in the project directory and install roslib using npm package manager:

#### `npm install roslib`

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

Then, start the rosbridge server by executing: 

#### `roslaunch rosbridge_server rosbridge_websocket.launch`

Publish String "happy" into `/face_command_topic` topic will switch the robot to happy face animation:

#### `rostopic pub /face_command_topic std_msgs/String "data: 'happy'"`

The same works for 'smile', 'sad', and 'blinking'.