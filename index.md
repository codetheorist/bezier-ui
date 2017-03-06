## Bezier UI

A jQuery plugin for creating Cubic Bezier curves.

### Requirements

This jQuery plugin depends on the following:

- jQuery
- jQuery UI

### Usage

To test or contribute to this plugin, simply clone the repository using:

```bash
git clone git@github.com:codetheorist/bezier-ui.git
```

When you've cloned the repository, run:

```bash
npm install
bower install
```

### Options

The following code block is the init script needed for Bezier UI with all of the available options:

```javascript
$(document).bezierFields({
  appendHtml: false,
  selector: 'class',
  dataAttribute: 'data-bezier',
  fieldClass: 'bezier-field',
  size: 300,
  accuracy: 3
});
```
