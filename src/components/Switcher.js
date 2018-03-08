import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = ({ location }) => {
  const route = location.type;
  const Component = location.routesMap[route].component;
  return { Component };
};

const Switcher = ({ Component }) => (<Component />);

Switcher.propTypes = {
  Component: PropTypes.func,
};

export default connect(mapStateToProps)(Switcher);
