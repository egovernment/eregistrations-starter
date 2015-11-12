# css-aid
## Light, standards focused CSS preprocessor

__css-aid__ doesn't propose any new syntax rules, it just helps with tedious issues that we approach when writing standard CSS.
e.g. it expands experimental properties into collection containing all vendor prefixes, or resolves CSS variables syntax so it can be used in browsers that do not support it.

How it works? Currently it's just primitive regular expression based search and replace algorithm. As project may expand it's possible it'll be upgraded to use more syntax bulletproof solution

### Installation

	$ npm install css-aid

#### Usage

```javascript
var cssAid = require('css-aid');
var processedCss = cssAid(plainCSS);
```

Optionally you can manually decide which rules (see [list below](#rules)) you want to apply:

```javascript
// Apply only 'border-radius' and 'variables' rules
var processedCss = cssAid(plainCSS, [require('css-aid/rules/border-radius'), require('css-aid/rules/variables')]);
```

### Rules

_Following list is still not perceived as complete and is extended on demand_

#### align-self

Replaces:
`align-self: <value>`
with:
`-webkit-align-self: <value>; align-self: <value>`

#### border-radius

Replaces:
`border-radius: <value>`
with:
`-webkit-border-radius: <value>; -moz-border-radius: <value>; -khtml-border-radius: <value>; border-radius: <value>`

#### box-shadow

Replaces:
`box-shadow: <value>`
with:
`-moz-box-shadow: <value>; -webkit-box-shadow: <value>; box-shadow: <value>`

#### box-sizing

Replaces:
`box-sizing: <value>`
with:
`-moz-box-sizing: <value>; -webkit-box-sizing: <value>; box-sizing: <value>`

#### flex-wrap

Replaces:
`flex-wrap: <value>`
with:
`-webkit-flex-wrap: <value>; flex-wrap: <value>`

#### flex

Replaces:
`display: flex`
with:
`display: -webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex`

#### justify-content

Replaces:
`justify-content: <value>`
with:
`-webkit-justify-content: <value>; justify-content: <value>`

#### variables

Supports only variables defined in `::root` rule.

e.g. for following code:

```css
::root {
	--foo: rgba(200, 200, 200, 0.5);
--lorem-ipsum: 20px 30px;
}
div.test {
	color: black;
background: var(--foo);
	margin: var(--lorem-ipsum);
}
```

It will produce:
```css
div.test {
	color: black;
background: rgba(200, 200, 200, 0.5);
	margin: 20px 30px;
}
```

## Tests [![Build Status](https://travis-ci.org/medikoo/css-aid.png)](https://travis-ci.org/medikoo/css-aid)

	$ npm test
