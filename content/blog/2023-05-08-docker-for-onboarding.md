---
title: Simplifying Onboarding with Docker
slug: docker-for-onboarding
date: "2023-05-08"
tags:
  - developer experience
---
Onboarding new team members can be a time-consuming and complicated process, especially when it comes to ensuring they have the right software and tools to do their jobs.

Traditional onboarding documentation can be unreliable and quickly outdated. In addition, IT professionals need to keep the device fleet up to date and free of vulnerabilities. Relying on others to maintain the documentation is often unsuccessful, as people tend to disregard updating documentation as a non-essential task. Even those who have worked on the project for a long time can find it difficult to help a newcomer to run the application locally.

This can lead to software conflicts and a poor first impression for new employees. Often there's a document that describes how to run the application locally. For example, imagine the first reaction of someone who has to install an outdated (and maybe even unsupported) version of NodeJS (or something similar). But some of the steps in this document are outdated, and we need to ask for help on Slack. The person who wrote it has left the company. Others can't remember the trick they used to make it all work. Well, you get the idea. And it doesn't have to be a new employee - it could be anyone, even a CTO who's got a brand new laptop. If we can abstract away the software dependencies and make the setup predictable and reprodusable, I think it would be a good investment! Fortunately, there is a solution that can simplify the onboarding process and minimise reliance on outdated or incorrect documentation: technology.

One such solution is Docker, a tool designed to package everything needed to run an application into a container. Docker makes it easy to launch a single (or even multiple) containers with a single command, and many IDEs have built-in support for working inside a container. For example, I run all my projects in [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers). Not having to worry about updating NodeJS (or more complex environments) over time gives me peace of mind. This is a great way to create a maintainable and easy-to-use development environment that can help streamline the onboarding process.

By minimizing onboarding documentation to a single command for starting a dev environment, you can save time and reduce the likelihood of software conflicts. Docker provides a consistent and reliable development environment, making the onboarding process smoother and more efficient for new hires.

In conclusion, technology can help simplify the onboarding process by minimising the reliance on outdated or incorrect documentation. Docker is a great way to not only ship software, but to give a team a productivity boost. Make the onboarding process an onboarding step.
