import React from 'react';
import { connect } from 'react-redux'
import './App.css';
import { getJSON } from '../../api/graf'
import CytoscapeRenderer from '../Cytoscape/CytoscapeRenderer'

const App = (props) =>  {


  let nodes = [];
  let edges = [];
  let sourceList = []

  let filteredJSON = getJSON().filter((item) => {
    if (item.type === 1) {
      nodes = [ ...nodes, {
        data: {
          id: item.unique_id.toString()
        }
      } ];

      sourceList = item.list_of_referenced_papers.map((listItem) => ({
        data: {
          id: item.unique_id + '_' + listItem,
          source: item.unique_id.toString(),
          target: listItem.toString()
        }
      }))

      edges = [ ...edges, ...sourceList ]
      return item
    }
  })

 edges = edges.filter((edgeItem) => {
    if(nodes.some((nodeItem) => edgeItem.data.target == nodeItem.data.id &&
                                edgeItem.data.source !== nodeItem.data.id )) {
      return edgeItem
    }
  })

 nodes = nodes.filter((nodesItem) => {
    if(edges.some((edgeItem) => edgeItem.data.target == nodesItem.data.id )) {
      return nodesItem
    }
  })

  edges = edges.filter((edgeItem) => {
     if(nodes.some((nodeItem) => edgeItem.data.target !== nodeItem.data.id &&
                                 edgeItem.data.source === nodeItem.data.id )) {
       return edgeItem
     }
   })

  const grafData =  Object.assign({}, { nodes: nodes }, { edges: edges });

  return(
    <div className="App">
      <CytoscapeRenderer grafData={grafData}/>
    </div>
  )
}

const mapStateToProps = function (state) {
  return {

  };
};

export default connect(mapStateToProps)(App)
