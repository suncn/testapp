import React, { Component } from 'react';
import Immutable from 'immutable';

class Grades extends Component {
  
  constructor(){
      super();
      this.state = {
        list : Immutable.fromJS(this.getData())
      };
  }

  getData(){
      let dataArr = [];
      for(let i = 0; i < 80; i++){
          let checked = Math.random() < 0.5;
          dataArr.push({
              name: i,
              checked
          });
      }

      return dataArr;
  }

  // 对数据的状态进行变更
    toggleChecked(event){
        let checked = event.target.checked;
        let index = event.target.getAttribute("data-index");
        
        // 这里不再是直接修改对象的checked的值了，而是通过setIn，从而获得一个新的list数据
        let list = this.state.list.setIn([index, "checked"], checked);

        this.setState({list});
    };

    render(){

        return (
            <ul>
                {this.state.list.map((data, index)=>{
                    return (
                        <ListItem data={data}
                            index={index} key={index}
                            toggleChecked={this.toggleChecked.bind(this)}
                        />
                    )
                })}
            </ul>
        )
    };
}

// 代表每一个子组件
class ListItem extends Component {

    shouldComponentUpdate(nextProps){
        // 这里直接对传入的data进行检测，因为只需要检测它们的引用是否一致即可，所以并不影响性能。
        return this.props.data !== nextProps.data;
    };

    render(){
        let data = this.props.data;
        let index = this.props.index;

        // 取值也不再是直接.出来，而是通过get或者getIn
        return (
            <li>
                <input type="checkbox" data-index={index} key = {index} checked={data.get("checked")} onChange={this.props.toggleChecked}/>
                <span>{data.get("name")}</span>
            </li>
        )
    }
}


module.exports = Grades
