 Simple markdown tool developed with Maka.js

## Usage

1. Add dependency
```bash
$ maka add zlj-tool-markdown
```

2. Modify the code

*Embedded use*
```javascript
const view = {
    component: 'div',
    children: [{
        component: 'AppLoader',
        appName: 'zlj-tool-markdown'
    }]
}
```
*Navigate use*
```javascript
import {navigate} from 'maka'
...
btnClick = () => {
    navigate.redirect('/zlj-tool-markdown')
}
...
```

## Download and run

1. Download
2. Decompress
3. Enter decompress directory
4. Run
```bash
$ yarn install
$ yarn start
```

## License

MIT

