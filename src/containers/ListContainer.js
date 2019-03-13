import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../store/actions';
import ListMain from '../components/List/ListMain';

class ListContainer extends Component {
 state = {
    showSort: false
  }
  componentDidMount() {
    this.props.getSentenceListFromDB('updateDate');
  }

  toggleSort = () => {
    this.setState({
      showSort: !this.state.showSort
    })
  }

  render() { 
    const { orderBy, getSentenceListFromDB, lastItem, list, showMoreSentenceBody} = this.props;
    return ( 
      <ListMain 
        showSort={this.state.showSort}
        orderBy={orderBy}
        list={list} 
        lastItem={lastItem} 
        toggleSort={this.toggleSort}
        getSentenceListFromDB={getSentenceListFromDB} 
        showMoreSentenceBody={showMoreSentenceBody}
      />
     );
  }
}
 

const mapStateToProps = ({ list }) => {
  return {
   list: list.get('list'),
   lastItem: list.get('lastItem'),
   orderBy: list.get('orderBy')
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getSentenceListFromDB: (orderBy, startItem) => {dispatch(actions.getSentenceListFromDB(orderBy, startItem))},
    showMoreSentenceBody: (index) => { dispatch(actions.showMoreSentenceBody(index))},
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListContainer);