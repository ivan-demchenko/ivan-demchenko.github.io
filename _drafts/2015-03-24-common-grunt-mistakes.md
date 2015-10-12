## Too specific config

```js

copy: {
    // ...
    app2dist: {},
    moveCssResources: {},
    moveCssResources2Tmp: {},
    tmp2dist: {},
    index2tmp: {},
    backupIndex: {},
    backupStyles: {},
    tenantIndex: {},
    tenantStyles: {},
    restoreDefaultTenantFiles: {},
    backupModules: {},
    // ...
}
```

## Vague tasks

```js
grunt.registerTask('make', [...]);
grunt.registerTask('build', [...]);
grunt.registerTask('backup', [...]);
grunt.registerTask('restoreBackup', [...]);
grunt.registerTask('useTenantFiles', [...]);
grunt.registerTask('restoreDefaultTenantFiles', [...]);
grunt.registerTask('generateTemplateCache', []);
grunt.registerTask('generateTemplateCacheEmpty', [...]);
```

## Strange steps config

```js
var releaseSteps = [
    //...
];

if (!shouldExecuteTest) {
    for (var i = 0; i < releaseSteps.length; ++i) {
        if (releaseSteps[i] === 'test') {
            releaseSteps.splice(i, 1);
            break;
        }
    }
}
```