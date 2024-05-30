+++
title = 'Crescendo'
+++

![Bot Picture](./frc_2024_bot_render.avif)

## Accomplishments

- Selected by the second alliance captain in [Ventura Regional](https://cafirst.org/frc/ventura/) (Ranked 19 out of 48).

## Design

Our objective this year was to target the AMP aspect of the game, so our bot was relatively simple from the Design aspect.

Our main scoring mechanism was an arm that intakes notes inside the frame (under a thinned perimeter bar), with a beam break sensor to stop the intaking when the note is at the correct place.

For the arm pivot, we used two Falcon 500s (lowered to 10:64), with another Falcon powering the compliant wheels at the end of the grabber.

An interesting thing that we did this year was utilizing 3D printed component mounts, as we did not have a bellypan.

For the drivetrain this year, we used L3 MK4i Swerve Modules, with 8 Krakens powering them.

## Software

We used a [NVIDIA Orin Nano](https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/) as a Coprocessor with an Intel RealSense Camera, which allowed us to run multiple vision tasks simultaneously.
This allowed us to run three vision tasks at once

- VSLAM (Visual Simultaneous Localization and Mapping)
- Object Detection
- April Tags

We used [ROS 2 (Robot Operating System 2)](https://www.ros.org/) to run the software on the Orin nano.
All the vision tasks were run in separate nodes, and we used ROS 2's "topics" feature to gather all the data in our custom node.
We fused the April Tags and VSLAM with a Kalman Filter to get a more accurate position of the robot.
The Orin Nano was connected to the RoboRIO via Ethernet,
and we communicated between the two via a custom UDP protocol to reduce latency.

Due to the high performance requirements,
we used rust for the custom node on the Orin Nano via [Ros2 Rust](https://github.com/ros2-rust/ros2_rust).
The code for that node can be found on [GitHub](https://github.com/Pixelators4014/pixelization_rs).

## Season Members

- Alinda Lau (Outreach/Marketing Lead)
- Alistair Keiller (Captain and Software Lead)
- Ashwin Naren (Software)
- Han Lu (Design)
- Henry Hutchinson (Design)
- Justin Guoji (Fabrication Lead)
- Neel Gadde (Design)
- Veronica Howard (Fabrication)

![2024 Members](./Members_2024.avif)
Picture from left to right: Neel Gadde, Justin Guoji, Alistair Keiller, Han Lu, Veronica Howard at Aerospace Valley Regional 2024. 
