import React from 'react';
import Header from '@/components/Header/Header';

class Page extends React.Component {

  render() {
    return (
      <>
        <Header/>
        <div className="container" style={{paddingTop: "5.7rem"}}>
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Page;
