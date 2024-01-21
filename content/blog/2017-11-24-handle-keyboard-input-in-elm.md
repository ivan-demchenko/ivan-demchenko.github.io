---
title: Handle keyboard input in Elm
slug: handle-keyboard-input-in-elm
date: "2017-11-24"
tags:
  - elm
---

Often we need to perform certain actions as a feedback to the input from the keyboard. For example, when we need to navigate within a list up and down or perform an action when the meta key (alt or shift) is pressed.

## Binding messages to keys

The most natural and convenient way to specify which action must be performed when a key is pressed is to use a dictionary. We going to use a list of tuples of key codes plus messages. In the function below the first argument is the default (or fallback) action and the second argument is the mapping of keys to messages:

```elm
onKeyups : m -> List ( Int, m ) -> Attribute m
onKeyups fallback keysToMsgs =
  let
    msgByKeyCode =
      \kc ->
        Maybe.withDefault fallback <|
          Dict.get kc <|
            Dict.fromList keysToMsgs
  in
    on "keyup" <| Decode.map msgByKeyCode keyCode
```

Here is what is happening. We have a lambda function `msgByKeyCode` of one argument `kc` (for key code). Function `on` takes a string (the event name) and a `Decoder msg`. The former will decode an event object (untyped, from js) and return a message to trigger.

We need to get the code of a key that was pressed. `keyCode` for the rescue! It returns `Decoder Int`.

Okay, We have a list of pairs of `int`s and `message`s. If we take that `Decoder Int` and map it over using a function of type `Int -> Msg` we will get a `Decoder Msg` (this is what `Functor`s for). Our lambda function does exactly this! Awesome, we only need to find a corresponding pair in a list! To do so, it is super convenient to use a `Dictionary` (simply, a key-value storage) as we can easily `get` from it. What we do here is that we take this list, turn it into a Dict, first item of a tuple becomes a key, the second one becomes a value. Then we can `get` from that Dict. However, `get` returns us `Maybe x`, otherwise, we would have to deal with `null`s or `undefined`s or handle exceptions or something else. There’s no need for it if we have `Maybe` type. Okay, so at this stage we get `Maybe Msg`. How do “extract” it from `Maybe`? Well, one way is to provide a default or fallback value if `Nothing` has been found. And we have it! It is famous `Noop`! In other words, if our user pressed a key, and there’s no such pair with the code, we’re not interested in that key, we do nothing!

It only looks scary at the beginning and the temptation to come back to JS and run the code and check the error in the console is high. But, from my experience, the good way to approach the problem is to follow the type annotations and think as a compiler. If you know what a given function does, it is no brainer anymore.

Okay, enough lyrics, let’s use our function:

```elm
ul
  [ onKeyups Noop [ ( 38, MoveSelection Up ), ( 40, MoveSelection Down ) ]
  ]
  -- ...
```

## Handle meta keys

The principle is the same here. However, now we need to send a Message with two booleans. We’re going to send `NewItem` with the state of Shift and Alt keys:

```elm
type Msg
    = NewItem Bool Bool

onKeyupsMeta : m -> List ( Int, Bool -> Bool -> m ) -> Attribute m
  onKeyupsMeta fallback keysToMsgs =
    let
      isShift =
        Decode.field "shiftKey" Decode.bool

      isAlt =
        Decode.field "altKey" Decode.bool

      msgByKeyCode =
        \kc altKey shiftKey ->
          Maybe.withDefault fallback <|
            Maybe.map (\msgFn -> msgFn shiftKey) <|
              Maybe.map (\msgFn -> msgFn altKey) <|
                Dict.get kc <|
                  Dict.fromList keysToMsgs
    in
      on "keyup" <| Decode.map3 msgByKeyCode keyCode isAlt isShift
```

You can definitely spot familiar parts. The only difference is that we have to use two more decoders for meta keys and map over that `Maybe Msg` from the dictionary two times. Each map will partially apply `NewItem` adding info about meta keys. That’s it.

Important part to remember here is that `Maybe` and `Decoder` are `Functors` and `NewItem` is a function of two arguments: `NewItem : Bool -> Bool -> Msg`. Here it is in action:

```elm
input
  [ type_ "text"
  , onKeyupsMeta Noop [ ( 13, NewItem ) ]
  ]
  []
```

Again, the key factor here is that we don’t have access to the event object. Instead we provide a decoder that will translate it into a data structure that Elm can work with.

I hope you can find it useful for learning and understanding Elm.
