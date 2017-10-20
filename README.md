# VueJS Browser Components

> Compiler for creating single file VueJS components that can be used in the browser

## Installation
Clone this repo

    $ git clone git@github.com:RonnieSan/vue-browser-components.git

Install the dependencies

    $ cd vue-browser-components
    $ npm install

## Usage
Create a new `.vue` file with your single file component in the `src` folder.

Make sure your component has a `name` property.  The name property is used as the tagname for the component.

```javascript
<template>
    <div class="my-component">
        <p>Custom Component Version: {{version}}</p>
    </div>
</template>

<script>
export default {
    name : 'my-component',
    data() {
        return {
            version : 'rg-01'
        };
    }
};
</script>

<style lang="less" scoped>
.my-component {
    color : blue;
}
</style>
```

Run the webpack compiler to package the file in the dist folder.
    $ webpack --env.file="path/to/my-component"

The compiler will create a single `.js` file at the same path in the dist folder.

Add the file to your html file after VueJS.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>VueJS Component Test</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.2/vue.min.js"></script>
    <script src="dist/components/custom/rg-01.js"></script>
</head>
```

The component will be globally registered using the `name` property as the tagname.

```html
<body>
    <div id="wrapper">
        <h1 class="title">This is the Outer Page</h1>
        <p>The custom component should appear below</p>
        <my-component></my-component>
    </div>
    <script>
    var app = new Vue({
        el : '#wrapper'
    });
    </script>
</body>
```
