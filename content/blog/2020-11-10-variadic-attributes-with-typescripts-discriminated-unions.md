---
title: Variadic attributes with TypeScripts Discriminated Unions
slug: variadic-attributes-with-typescripts-discriminated-unions
date: "2020-11-10"
tags:
  - typescript
---

Sometimes, we need to create a component that serves multiple use-cases. As such, depending on some key attribute, the set of all others might differ. One example is a date picker component. Let's see how we can implement it.

Imagine our date picker should allow a consumer to select a single date of a range of dates. Let's try to visualise such use-cases:

```tsx
<DatePicker
  onChange={handleOnChange}
  theDate={someDate}
/>

<DatePicker
  mode="range"
  onStartDateChange={handleStartDateChange}
  onEndDateChange={handleEndDateChange}
  startDate={someStartDate}
  endDate={someEndDate}
/>
```

We can describe such behaviour in types like this:

```ts
type SingleDatePickerProps = {
  mode: "single";
  onChange: (date: Date) => void;
};

type RangeDatePickerProps = {
  mode: "range";
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  startDate: Date;
  endDate: Date;
};

type DatePickerProps = SingleDatePickerProps | RangeDatePickerProps;
```

Please, note that here, the `mode` attribute is _not optional_. However, the requirement dictates that it _must be optional_, and when this attribute omitted, the component must work as a date picker for a single date. Luckily, TypeScript allows us to express this behaviour using [Conditional Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types "TypeScript's documentation on Conditional Types"):

```ts
type UponKey<T, A, B> = T extends undefined ? A : B;
```

This type expresses the `if-then-else` logic. We can use it like this:

```tsx
function DatePicker(
  props: UponKey<
    DatePickerProps["mode"],
    SingleDatePickerProps,
    RangeDatePickerProps
  >
) {
  if (props.mode !== undefined) {
    switch (props.mode) {
      case "single":
        return <SingleDatePicker {...props} />;
      case "range":
        return <RangeDatePicker {...props} />;
    }
  }
  const defaultProps = props as DatePickerProps;
  return <SingleDatePicker {...defaultProps} />;
}
```

This way, it would be a lot harder for our consumer to misuse our component.
