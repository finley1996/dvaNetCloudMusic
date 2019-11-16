import { Carousel, WingBlank } from 'antd-mobile';
import React from 'react'
export default class App extends React.Component {
    state = {
      data: ['1', '2', '3','4'],
      imgHeight: 176,
    }
    componentDidMount() {
      // simulate img loading
      setTimeout(() => {
        this.setState({
          data: ['1', '2', '3','4'],
        });
      }, 100);
    }
    render() {
      return (
        <WingBlank>
          <Carousel
            autoplay
            infinite
            // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            // afterChange={index => console.log('slide to', index)}
          >
            {this.state.data.map(val => {
                
                
                return (
              <a
                key={val}
                href="#"
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >
                <img
                  src= {require('../assets/lunbotu/'+val+'.jpg')}
                  alt=""
                  style={{ width: '100%',height:'150px', verticalAlign: 'top' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>
            )})}
          </Carousel>
        </WingBlank>
      );
    }
  }