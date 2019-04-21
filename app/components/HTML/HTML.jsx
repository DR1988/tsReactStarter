import React from 'react'
import PropTypes from 'prop-types'
/* eslint react/no-danger: 0 */
const Html = ({ children, initialState = {}, /* scripts,*/ styles, inlineStyles }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <title>My React-Redux app</title>
      {styles.map(s => <link rel="stylesheet" key={s} href={`/${s}`} />)}
      {inlineStyles ? <style type="text/css" id="SSRStyles">{inlineStyles}</style> : null}
      <script
        dangerouslySetInnerHTML={{ __html: `
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        ` }}
      />
    </head>
    <body>
      <div id="root">{children}</div>
      {/* {scripts.map(s => <script key={s} src={`/${s}`} />)}*/}
      <script type="application/javascript" src="/build.js" />
      {inlineStyles ? (
        <script dangerouslySetInnerHTML={{ __html: 'document.getElementById("SSRStyles").remove()' }} />
      ) : null}
    </body>
  </html>
)

Html.propTypes = {
  children: PropTypes.node.isRequired,
  inlineStyles: PropTypes.string.isRequired,
  initialState: PropTypes.object, // eslint-disable-line
  // scripts: PropTypes.arrayOf(PropTypes.string).isRequired,
  styles: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Html
