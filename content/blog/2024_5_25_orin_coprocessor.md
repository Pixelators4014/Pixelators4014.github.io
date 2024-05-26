+++
title = 'Using an NVIDIA Orin Nano as a Coprocessor'
date = '2024-05-25'
author = 'Ashwin Naren'
published = false
draft = true
+++

This season, our software team used an NVIDIA Orin Nano Developer Kit as a coprocessor with an attached Intel RealSense camera.
This coprocessor allowed us to perform computationally intensive vision tasks, such as VSLAM, object detection, and April Tags, in parallel with our main robot code running on the RoboRIO.

## Why an Orin Nano?

We were looking for a coprocessor that had a good GPU, for faster vision task performance.
Naturally, we looked at NVIDIA's processors.
We are constricted by the $700 limit on robot parts, so we couldn't use a Jetson AGX Developer Kit ($2000-$3000).
We needed a developer kit in order to test our code
and we did not want to run the risk of deploying code on a processor that is not our testing processor due to time and budget constraints,
so we did not consider non developer kit options.
The Orin Nano Developer Kit was within the $700 limit, so it was chosen.
It has a 1024-core NVIDIA Ampere architecture GPU with 32 Tensor Cores,
which produces up to 40 TOPS (Tera Operations Per Second) of performance.
It also has a 6-core ARM Cortex-A78AE CPU, which is more than enough for our CPU work.

## ROS 2

We used ROS 2 (Robot Operating System 2) to run the software on the Orin Nano.
ROS 2 is an architecture of sorts for writing robot software.
It consists of nodes, which are separate processes that communicate with each other via ROS 2's middleware.
There are three types of ways to communicate between nodes: topics, services, and actions.
Topics are a publish-subscribe system, where one node publishes data to multiple receivers.
Services are a request-response system, where one node requests data from another node.
Actions are a more complex version of services, where the request-response system is asynchronous and there are status updates along the way.
For our project, we only used topics.
NVIDIA maintains a version of ROS 2 called ISSAC ROS, which has some additional support for their GPUs.

## Vision Tasks

We ran three vision tasks on the Orin Nano:
- VSLAM (Visual Simultaneous Localization and Mapping)
- April Tags
- Object Detection

We used the Intel RealSense camera for all three tasks.

### VSLAM

VSLAM is a method used by robots and drones to navigate and map their surroundings.
It uses a camera to detect features in the environment and uses those features to determine the robot's position.
This is useful in FRC because it isn't reliant on wheel positions and slippage does not affect it.
It becomes paticularly useful when the robot is bumped or pushed by another robot.
We used the [NVIDIA ISAAC ROS VSLAM Package](https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_visual_slam).
This package contains a VSLAM node.
When the node is run, it outputs the robot's path to `/visual_slam/tracking/slam_path`.
This node can be configured in many ways, for example, we enabled IMU fusion to get a more accurate position as we had a RealSense camera with an internal [IMU](https://en.wikipedia.org/wiki/Inertial_measurement_unit).

### April Tags

Unfortunately VSLAM is not perfect, at times, it can lose tracking of it's surroundings, which forces the robot to rely exclusively on dead-reckoning.
To help prevent this from happening, we used the April Tags on the field.
