import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import cytoscape from 'cytoscape';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCytoscapeStyle } from "./CytoscapeStyle"
import './style.css'

class CytoscapeRenderer extends React.Component {
  updateCyjs() {
    this.cy = cytoscape({
      container: document.getElementById('cy'),

      boxSelectionEnabled: false,
      autounselectify: true,
      elements: this.props.grafData,
      style: getCytoscapeStyle(),
      layout: {
        name: 'breadthfirst',
        directed: true,
        padding: 10
      },
    });
  }

  componentDidMount() {
    this.updateCyjs();
  }

  render() {
    return (
      <div className='graf_container'>
        <div id='cy' style={{height: '100%', width: '100%'}}></div>
      </div>
    )
  }
}

CytoscapeRenderer.propTypes = {
  grafData: PropTypes.object
};


export default CytoscapeRenderer
