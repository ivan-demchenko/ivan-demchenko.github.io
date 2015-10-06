### Using Object.keys

```
public isValid():boolean {
    var vocabulary = this.getVocabulary();

    for (var name in vocabulary) {
        if (!vocabulary[name]) {
            return false;
        }
    }

    return true;
}
```

Can be simplified to this:

```
public isValid():boolean {
    var vocabulary = this.getVocabulary();
    return Object.keys(vocabulary).every((key:string) => !!vocabulary[key]);
}
```

### Functional way

From here

```
private filterAvailableTemplates():Template[] {
    var selectedTopics:{id:TopicId}[] = this.eventHandler.getSelectedTopics();
    var selectedActivityTypeId:ActivityTypeId = this.eventHandler.getSelectedActivityTypeId();

    // return all templates except...
    return _.filter(this.availableTemplates, (template:Template) => {
        // ... the ones with mismatching related activity type ...
        if (!_(template.activityTypes).contains(selectedActivityTypeId)) {
            return false;
        }

        // ... and the ones with mismatching related topics.
        var templateTopics = _.pluck(template.topics, 'id');
        for (var i = 0; i < selectedTopics.length; i++) {
            // one matching topic is enough the have the two arrays matching
            if (_(templateTopics).contains(selectedTopics[i].id)) {
                return true;
            }
        }

        return false;
    });
}
```

To here


```
export function allTrue(...fns) {
    return (x) => fns.reduce((acc, fn) => acc && (acc = fn(x)), true);
}

export function inArray<a>(xs:a[], y:a):boolean {
    return xs.indexOf(y) > -1;
}

export function props(id:string, xs:any[]) {
    return xs.map((x) => x[id]);
}

private templateBoundedToActivity(providedId:any):Function {
    return (template:Template):boolean => template.activityTypes.some(eq(providedId));
}

private templateBoundedToTopics(providedIds:any[]):Function {
    let ids = curry(props)('id');
    let inArr = curry(inArray);
    return (template:Template):boolean => ids(template.topics).some(inArr(providedIds));
}

private filterAvailableTemplates():Template[] {
    let ids = curry(props)('id');

    let selectedTopicsIds:TopicId[] = ids(this.eventHandler.getSelectedTopics());
    let selectedActivityTypeId:ActivityTypeId = this.eventHandler.getSelectedActivityTypeId();
    let checkTemplate = allTrue(this.templateBoundedToActivity(selectedActivityTypeId), this.templateBoundedToTopics(selectedTopicsIds));

    return this.availableTemplates.filter(checkTemplate);
}
```