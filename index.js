
import {select} from 'd3-selection'
import {sankey} from 'd3-sankey'
import {rgb} from 'd3-color'
import {scaleOrdinal, schemeCategory20} from 'd3-scale'
import {transition} from 'd3-transition'

const defaults = {
  // target element or selector to contain the svg
  target: '#chart',

  // width of chart
  width: 800,

  // height of chart
  height: 320,

  // margin
  margin: {
    top: 1,
    right: 1,
    bottom: 6,
    left: 1
  },

  // y spacing between nodes
  nodePadding: 10,

  // node width
  nodeWidth: 15,

  // number of times the converging function computeNodeDepths is run
  iterations: 32
}

/**
 * Sankey.
 */
export default class Sankey {

  /**
   * construct with given `config`.
   */
  constructor (config) {
    Object.assign(this, defaults, config)
    this.init()
  }

  /**
   * Initialize chart.
   */
  init () {
    const {target, width, height, margin, nodeWidth, nodePadding} = this
    const w = width - margin.left - margin.right
    const h = height - margin.top - margin.bottom

    this.chart = select(target)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    this.sankey = sankey()
      .nodeWidth(nodeWidth)
      .nodePadding(nodePadding)
      .size([w, h])

    this.path = this.sankey.link()

    this.selectionLink = this.chart
      .append('g')
      .selectAll('.link')

    this.selectionNode = this.chart
      .append('g')
      .selectAll('.node')
  }

  /**
   * render
   */
  render (data, options = {}) {
    const {iterations} = this
    const color = scaleOrdinal(schemeCategory20)

    // get data
    this.sankey
      .nodes(data.nodes)
      .links(data.links)
      .layout(iterations)

    this.selectionLink
      .data(data.links, d => d.source.name + d.target.name)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', this.path)
      .style('stroke-width', d => Math.max(1, d.dy))
      // hide super small links which are just for positioning nodes
      .style('display', d => d.value < 1 ? 'none' : 'inline')
      .sort((a, b) => b.dy - a.dy)
      .append('title')
      .text((d) => `${d.source.name} -> ${d.target.name}`)

    this.selectionNode = this.selectionNode
      .data(data.nodes, d => d.name)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)

    this.selectionNode
      .append('rect')
      .attr('height', d => d.dy)
      .attr('width', () => this.sankey.nodeWidth())
      .style('fill', d => { d.color = color(d.name.replace(/ .*/, '')); return d.color })
      .style('stroke', d => rgb(d.color).darker(2))
      .append('title')
      .text(d => d.name)

    this.selectionNode
      .append('text')
      .attr('x', -6)
      .attr('y', d => d.dy / 2)
      .attr('dy', '.35em')
      .attr('text-anchor', 'end')
      .attr('transform', null)
      .text(d => d.name)
      .filter(d => d.x < this.width / 2)
      .attr('x', () => 6 + this.sankey.nodeWidth())
      .attr('text-anchor', 'start')
  }

  /**
   * update
   */
  update (data) {
    const {iterations} = this

    this.sankey
      .nodes(data.nodes)
      .links(data.links)
      .layout(iterations)

    const t = transition().duration(1000)

    // get all links
    const link = this.chart
      .selectAll('.link')
      // required for properly animating links. d3 needs it to keep reference.
      .data(data.links, d => d.source.name + d.target.name)
      // .sort((a, b) => b.dy - a.dy)

    // animate still existing links to new positions
    link.transition(t)
      .attr('d', this.path)
      .style('stroke-width', d => Math.max(1, d.dy))
      // hide super small links which are just for positioning nodes
      .style('display', d => d.value < 1 ? 'none' : 'inline')

    // remove links that do not exist in new data
    link
      .exit()
      .remove()

    // get all nodes
    const node = this.selectionNode
      .data(data.nodes, d => d.name)

    // move still existing nodes to new positions
    node
      .transition(t)
      .attr('transform', d => `translate(${d.x}, ${d.y})`)

    // remove nodes that do not exist in new data
    node
      .exit()
      .remove()

    // get all rects
    const rect = this.chart
      .selectAll('rect')
      .data(data.nodes, d => d.name)

    // animate still existing rects to new positions
    rect
      .transition(t)
      .attr('height', d => d.dy)

    // remove rects that do not exist in new data
    rect
      .exit()
      .remove()

    // get all text / node labels
    const text = this.chart
      .selectAll('text')
      .data(data.nodes, d => d.name)

    // animate still existing text to new position
    text
      .transition(t)
      .attr('y', d => d.dy / 2)
      .filter(d => d.x < this.width / 2)

    // remove text that does not exist anymore
    text
      .exit()
      .remove()
  }

}
