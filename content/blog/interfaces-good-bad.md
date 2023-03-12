---
title: Interfaces, good and bad
date: "2023-03-11"
tags:
  - oop
  - design
  - architecture
---
Designing applications can be a challenging task. Over the course of my career, I have developed a few guiding principles that I would like to share with you. These are more food for thought, rather than hard rules to follow.

Throughout this article, I use adjectives like "good" and "bad" - purely subjectively.

## Why do we need interfaces?

Public interfaces provide an overview of the capabilities of the module. If an interface and its methods have descriptive names (defined later), that interface can be a valuable addition to the documentation. People often talk about tests as documentation. In my opinion, tests document behaviour, while interfaces describe capabilities.

Well-defined interfaces help to separate the core logic of the application (the "why") from the frameworks (the "how"), also known as the "separation of concerns" principle.

Furthermore, an interface is a contract between the user and the implementation. Given a certain input, we should expect a certain output. The interface can also inform about possible side effects too. Although I believe that a type system can communicate and enforce handing side effects better than documentation.

Finally, there is another, rather subtle benefit to using interfaces. In essence, an interface is an API that our users can rely on. So users can think of the module and the team behind that API as a 3rd-party. Drawing such a boundary between the units of an organisation and the APIs they maintain is a way to manage the structure and the dependencies between teams. This way, we can answer questions like why this team exists and what value it provides.

## Interfaces and the ubiquitous language

I believe that interfaces should use the Ubiquitous Language or the language of business logic and values. This way, we can effectively hide the implementation details and convey the intent of a method.

## Good and bad interfaces

As John Ousterhout mentioned in "A Philosophy of Software Design" (and his [presentation at Google](https://www.youtube.com/watch?v=bmSAYlu0NcY&t=2779s)): narrow and deep interfaces always trump wide and shallow ones. As an example, the author used the UNIX file I/O interface. Statements like this are always a subject of debate. Nevertheless, there is some truth to his words.

So, how about shallow and narrow? I would argue that most of the time, such interfaces act only as wrappers around some existing functionality and are not very useful. In fact, such interfaces can be dangerous as developers may use them for mocking ([reference](https://torvo.com.au/articles/why-mocks-are-considered-harmful))

Bad interfaces inform the users how things work. For example, `postMessage` or `saveData`.

Good interfaces hide those implementation details and convey the intent instead. For example, `initiateLoginProcedure` or `storeAccountData`.

## Better testing

Good interfaces can help test behaviour without having to worry about implementation details. Having well-defined, high-level interfaces allows for safer mocking. For example, say we are working on a React app with a login button. The only thing our tests need to check is that the login button has the correct intent. So we can safely mock the actual implementation of the service and check that the correct method has been called. However, we will need a different set of tests for a concrete implementation of this interface. Such testing would help us identify the problematic place sooner than, say, end-to-end tests. Why? Because there would be a test suit for a concrete implementation of an interface that is used in production code.

## Examples

I would like to present a few examples of good interfaces (again, subjectively).

### Abstraction over storage

Instead of having an interface with methods like `get`, `set` and `remove`, create an interface with methods like `saveUserAccount`, `getAccountData` or `deleteAccountData`. These methods describe the steps of the business processes in your domain, but do not expose any implementation details. A snippet of code using such methods reads more like plain English.

### Abstractions over events

Sometimes, we have to deal with an inherently event-driven system. For example, extensions for VSCode are command-based. Therefore, instead of creating a service that exposes the implementation details (like `postMessage` or `executeCommand`), you'd better climb one level up and create an API for dealing with the business rules and values. For example, instead of this

```ts
interface ExtensionService {
  postMessageToExtension(): Promise<void>
  onMessageFromExtension(callback): Promise<void>
}
```

... create an interface that conveys the intents:

```ts
interface ExtensionService {
  initiateLogin(): Promise<void>
  whenLoginSucceeded(callback): Promise<void>
}
```

It doesn't matter how we initiate a login procedure, what matter is the fact that we did it. Mocking such an interface in the UI tests is safe and gives enough confidence that the right CTAs trigger the correct procedures. Yet, we don't care about the implementation details of that UI.

## Conclusion

In this article I described my observations and conclusions. These will no doubt be refined in the future. Obviously, the main reason for writing code is to program a computer to perform actions that we need to achieve our goals. The APIs that are based on the domain and the Ubiquitous Language help us to create robust and reliable software, while keeping it "soft" and flexible.
