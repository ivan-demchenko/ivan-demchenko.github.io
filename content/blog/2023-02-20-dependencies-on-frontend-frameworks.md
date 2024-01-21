---
title: Dependencies on (front-end) frameworks
slug: dependencies-on-frontend-frameworks
date: "2023-02-20"
tags:
  - architecture
---
As modern front-end applications become increasingly complex, it is becoming more and more important to maintain the separation of concerns between the view layer and the business logic.

## New toys, old problems

Having seen several modern codebases, I can say that history is repeating itself. Back in the day, when PHP was growing in popularity, but the ecosystem was not mature enough, the separation of concerns was a hot topic. For example, rushing to deliver the working code on time, people would query or write to a database directly from the views.

Today we use a different tech stack, but the principles remain the same. With the rise of single-page applications and front-end frameworks, the boundaries between concerns have blurred. Consider a component-based model. The key mantra is that a UI component is an isolated, drop-in piece of a larger system. A component acts as an encapsulation mechanism. Nobody cares what happens inside of that component. But this is exactly how we get ourselves into the "I only wanted a banana, but I got a gorilla and the whole jungle with it" situation.

For example, our little Autocomplete UI component can read directly from the API via a service (we often pretend to follow the best practices). Later, the same component can import something called a "UI Manager" and manipulate some other part of the system via an event. All of this may sound unreal, but I have just described a part of a real codebase.

Moreover, every codebase is bound to end-up like this for several reasons:

- People writing code who are unaware of simple engineering principles;
- Poor planning leading to unrealistic deadlines;
- The evaluation of people's output is unbalanced.

In other words, when inexperienced people have to cut corners to meet a deadline, neglecting the quality aspects or architectural principles, we end-up in a situation like this. This problem gets exacerbated when lead engineers or engineering managers are judged solely on speed of delivery of their teams.

## So, why is it a problem?

Everything works, doesn't it? Of course it does! Why shouldn't it? But because the business logic is spread across the view layer and data is being accessed and written everywhere, the system becomes almost untestable. All of this leads to lesser confidence in developers when they change the code and makes it harder to guarantee that the system will work in the next release. As a result, we end up performing hot fixes during releases and, worst of all, reduced customer confidence and satisfaction.

And as we all know, there's nothing more permanent than a temporary solution. So, all the quick hacks stay there for a long time. In addition, people leave the company and new people come in. These new people will have to be productive with the code they have inherited. For them it is now legacy code. Also, the business will evolve, some features will become obsolete, some will become really complex. All of that means changing the code. But nobody wants to break the working system. Thus, some people will call for refactoring, others will insist on rewriting. But for business, however, refactoring will only makes sense if it opens the door to more revenue. The problem is that the longer the code remains in this state of mixed concerns, the more expensive it becomes to fix the code.

The analogy I use is a fancy restaurant with a neglected kitchen. If nobody cleans the kitchen regularly, eventually the restaurant will have to close for a while and clean up. Closing the restaurant will be far more expensive than regular cleaning.

## An example

I'll include a few code snippets here to illustrate my ideas. I have deliberately left out some important (but not very relevant to the topic of this post) details.

Let's take a look at the Autocomplete UI component. In it's simplest form, it should act as a simple input with a list of hints that get fetched from a source and displayed to the user. A user can click on a hint to send that value to the component's consumer.

```jsx
import { debounce } from 'debounce.library'
import { AutocompleteList } from '@components/AutocompleteList'
import { AutocompleteService } from '@services/AutocompleteService'

export function Autocomplete() {
  const [items, setItems] = useState([]);

  const fetchItems = (event) => {
    const currentValue = event.target.value;
    AutocompleteService
      .fetchItems(currentValue)
      .then(data => {
        setItems(data)
      });
  };

  const debouncedFetchItems = useMemo(() => {
    debounce(fetchItems, 300)
  }, []);

  return (
    <>
      <input onChange={debouncedFetchItems} />
      <AutocompleteList items={items} />
    </>
  );
}
```

On the face of it, this is a fairly common implementation. However, if I want to reuse the autocomplete in a different context, I'll also get the `AutocompleteService` and `AutocompleteList` too, even though I only asked for the `Autocomplete` UI component.

Now let's say we need to add a way to add a missing suggestion. So, we'll add a small button at the bottom of the list that will open a dialogue box to add an item to the suggestion list. A few weeks later, we realise that the suggestions on a particular page need to be personalised for the current user. I think you can see how complex this small component can become.

So, how do we fix this situation? Let's focus on the code listed above. The first thing I would do is make sure that there's no direct import of a service into the UI component. Instead, we should declare an interface for our users to implement. Let me illustrate:

```tsx
type Suggestion = { ... }

export interface AutocompleteProps {
  fetchSuggestions(userInput: string): Promise<Suggestion[]>
}

export function Autocomplete(props: AutocompleteProps) {
  // ...
  const fetchItems = (event) => {
    const currentValue = event.target.value;
    props
      .fetchSuggestions(currentValue)
      .then(data => {
        setItems(data)
      });
  };
  // ...
}
```

By declaring this interface, `Autocomplete` frees itself from any notion of services or data stores or apis or whatever. This is called the principle of dependency inversion. By making this change, we get closer to being able to reuse this UI component in other places and feed the information into it from whatever sources. For testing purposes we can simply create a mock implementation of the `AutocompleteService`.

This is a great change to make, much cleaner! However, we are not done yet. You see, our Autocomplete UI component consists of a text input and a list of suggestions. By design our component has two responsibilities: collecting user input and displaying suggestions. However, as we anticipated, we now need to modify the suggestion list. Well, if other parts of the application use this component, we need to make sure that we don't accidentally introduce a new functionality to them as well. We could, of course, tinker with the props, or make a copy of the whole component. But there's a much better way.

There's a principle of a single responsibility. In our case, we need to treat a suggestion list as a separate component, not the part of the Autocomplete component. We should also pass it to the Autocomplete via props, rather than importing it directly.

```tsx
export interface AutocompleteProps {
  // ...
  suggestionsList: ReactNode
}

export function Autocomplete(props: AutocompleteProps) {
  // ...
  return (
    // ...
    {props.suggestionsList}
  );
}
```

In this particular example, we delegate the responsibility for implementing or importing the correct suggestion list to the consumer of the autocomplete component. We, as the component authors, can provide a default suggestion list.

## Not just UI components

Although, we have focused on the UI code, these principles apply to any other type of code. For example, if you are working on an Electron-based application and need to import something from the `electron` package, stop and create an interface. You will be amazed at how easy it is to test the business logic, rather than worrying about spinning up an instance of electron when running unit tests.

Although I've shown the benefits of injecting dependencies, that doesn't mean I'm against imports. During code review, look for imports from packages we don't control and ask the author to create an interface. This interface should convey the intent. For example, instead of using `localStorage` directly, create an interface with methods like `saveUserMetadata` or `getGameScore`. In the class that implements this interface, feel free to use the `localStorage`, an `apiServer`, memory or whatever you want.

## Risk for business

Typically, frameworks are maintained and developed by third parties. Dependencies on third parties are always risky: the organisation could end up with an abandoned framework. If engineers respect the principle of separation of concerns, replacing this layer would be much less expensive.

Another point is that the framework's licence may change and become too expensive. In this case, without a clean boundary between the business logic and the view layer, the cost of refactoring can be too high for the organisation.

## Conclusion

Frameworks may seem like the solution to all our problems. But they are not. In the software engineering community, especially in the front-end camp, frameworks are glorified as the way forward, the way to build software. However, very few talk about the problems associated with this kind of thinking, and how to avoid the framework trap.

Over the years, people have distilled simple but powerful engineering principles that, in my opinion, every engineer should know. The ones I talked about in this article are so called SOLID principles. They are easy to learn as there are plenty of resources available online. If you prefer books, I'd recommend "Clean Architecture" by Robert C. Martin.

At first, following these principles may seem like extra work. But these ideas are not a rocket science and are very easy to understand. Over time using them becomes a second nature. So, don't be intimidated.

Engineering culture (and work culture, for that matter) is also an important issue to consider. Time to market is an important metric. But code quality, architectural flexibility and testability are equally (if not more) important in the long run.

In my opinion, the companies that pay close attention to code quality have an advantage in the market. Similar to a restaurant that maintains both a high quality of food and a clean kitchen.
