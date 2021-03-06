import React from 'react'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children, margin = '2', fontsize = '0' }) => (
  <p className={`margin-${margin} fontsize-${fontsize}`}>{children}</p>
)
const Heading1 = ({ children, level = '1', margin = '6' }) => (
  <h2 className={`heading-${level} margin-${margin}`}>{children}</h2>
)
const Heading2 = ({ children, level = '2', margin = '4' }) => (
  <h2 className={`heading-${level} margin-${margin}`}>{children}</h2>
)

/**
 * Object with a map of render functions for rendering blocks and marks.
 * MARKS: bold.
 * BLOCKS: p, ol, ul, li, hr, q, h1-2.
 */
const renderOptions = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    // this 👇🏻 allows us to embed iframes and more (html code gets rendered from code block)
    [MARKS.CODE]: html => <div dangerouslySetInnerHTML={{ __html: html }} className={`html-element-wrapper`}></div>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.OL_LIST]: (node, children) => <ol className={`margin-2`}>{children}</ol>,
    [BLOCKS.UL_LIST]: (node, children) => <ul className={`margin-2`}>{children}</ul>,
    [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
    [BLOCKS.HR]: (node, children) => <hr className={`hairline-border margin-6`} />,
    [BLOCKS.QUOTE]: (node, children) => <blockquote className={`margin-4`}>{children}</blockquote>,
    [BLOCKS.HEADING_1]: (node, children) => <Heading1>{children}</Heading1>,
    [BLOCKS.HEADING_2]: (node, children) => <Heading2>{children}</Heading2>,
    [INLINES.HYPERLINK]: (node, children) => (
      <a href={node.data.uri} target="_blank">
        {children}
      </a>
    ),
  },
}

export default renderOptions
