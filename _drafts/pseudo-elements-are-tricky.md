How do we know that we're good programmers or not? Maybe we should collect statistics of feedbacks about our code? Maybe we should attend meet-ups and talk to other guys and make sort of self-judgment? Probably. But on the other hand, you may ask *who cares whether I am a good programmer or not! At the end, we make money and business is happy about a products I build.* To certain extent, it's true. But what if you, my reader, is something more than just a regular programmer who wants to have safe and moderately well paid profession? Well, that's also good. However, in case you really interested in producing high quality code - I'm all ears.

From my side, I'd like to share one thought I had recently about the way we educate ourselfes. Front-end development is booming right now. HTML5 has became a really powerful platform bla-bla-bla, we all know these headlines. Just look at the number of JS frameworks! Nevertheless, most of the tasks we have to solve on daily basis are same old. For example, we need to show user's name if we have a user logged in or ask user to enter some data and then process it somehow or load data and display it. So, generally speaking, these are the same old things we had to tackle 10-20 years ago using Delphi or Visual Basic. Thus, the only thing we can do is to improve the way we tackle these problems.

The question is how do we learn in order to improve? I think it's good to ask yourself a standard interview question: what have I learned recently? Probably, you've read a great article about performance tweaks or maybe you've just finished some great book about architecture.

Currently, I'm working on a quite a big AngularJS project with lots of business logic on client. We receive, process and send data back to backend. Usually, HTML5 apps work vise-versa, client is quite stupid, just displays data and sends user input to back-end to process and store. In our case, we're offline-first app, thus, we have to develop as if there was no back-end.

You probably understand that code quality is vital here. Things like modularisation, proper usage of MVC and service layer is essential in our case. Thanks to Angular we have some of the problems solved out of the box. But it's just a drop in the ocean.

The question is how to write readable and understandable code.  Or maybe how to improve basic things. From where to get the ideas for better solutions? Let's recall the example I mentioned before.

```
if (user && user.name) {
...
}
```

