import React from 'react';

export class NavBackArrow extends React.Component {
  render() {
    return (
      <div 
        className="nav-back-arrow fa fa-arrow-alt-circle-left"
        onClick={ () => {window.location.href = this.props.redirectPath} }
      >
      </div>
    )
  }
}
