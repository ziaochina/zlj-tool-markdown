import React from 'react'
import pkgJson from './package.json'
import { actionMixin, registerComponent } from 'maka'
import { Controlled as CodeMirror } from 'react-codemirror2'
import MarkdownViewer from 'react-markdown'
import hljs from 'highlight.js'

import "codemirror/theme/material.css"
import "codemirror/lib/codemirror.css"
import 'highlight.js/styles/github-gist.css'
import './style.less'

const name = pkgJson.name


class CodeBlock extends React.PureComponent {
    constructor(props) {
        super(props)
        this.setRef = this.setRef.bind(this)
    }

    setRef(el) {
        this.codeEl = el
    }

    componentDidMount() {
        this.highlightCode()
    }

    componentDidUpdate() {
        this.highlightCode()
    }

    highlightCode() {
        hljs.highlightBlock(this.codeEl)
    }

    render() {
        return (
            <pre>
                <code ref={this.setRef} className={this.props.language}>
                    {this.props.value}
                </code>
            </pre>
        )
    }
}


registerComponent('CodeMirror', CodeMirror)
registerComponent('MarkdownViewer', MarkdownViewer)

const state = {
    data: {
        markdown: `
Simple markdown tool developed with Maka.js

## Usage

1. Add dependency
\`\`\`bash
$ maka add zlj-tool-markdown
\`\`\`

2. Modify the code

*Embedded use*
\`\`\`javascript
const view = {
    component: 'div',
    children: [{
        component: 'AppLoader',
        appName: 'zlj-tool-markdown'
    }]
}
\`\`\`
*Navigate use*
\`\`\`javascript
import {navigate} from 'maka'
...
btnClick = () => {
    navigate.redirect('/zlj-tool-markdown')
}
...
\`\`\`

## Download and run

1. Download
2. Decompress
3. Enter decompress directory
4. Run
\`\`\`bash
$ yarn install
$ yarn start
\`\`\`

## License

MIT
        `
    }
}

@actionMixin('base')
class action {
    constructor(option) {
        Object.assign(this, option.mixins)
    }

    onChange = (a, b, v) => {
        this.base.setState({
            'data.markdown': v
        })
    }
}

const view = {
    component: 'div',
    className: 'zlj-tool-markdown',
    children: [{
        component: 'div',
        className: 'zlj-tool-markdown-left',
        children: [{
            component: 'CodeMirror',
            options: {
                mode: 'markdown',
                theme: 'material',
                lineNumbers: true
            },
            value: '{{data.markdown}}',
            onBeforeChange: `{{$onChange}}`
        }]
    }, {
        component: 'div',
        className: 'zlj-tool-markdown-center'
    }, {
        component: 'div',
        className: 'zlj-tool-markdown-right',
        children: {
            component: 'MarkdownViewer',
            source: '{{data.markdown}}',
            skipHtml: false,
            escapeHtml: false,
            renderers: { code: CodeBlock },
        }
    }]
}

export {
    name,
    state,
    action,
    view
}