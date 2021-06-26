import React from "react";
import {trendStateType} from "../../../redux/trends/trendsReducer";
import {RemoveScroll} from 'react-remove-scroll';
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryZoomContainer
} from "victory";

type temPropsType = {
  trend: trendStateType,
  paramName: string,
  minValue: number,
  maxValue: number,
  trendDate: string,
  name: string
}

class Trend extends React.Component<temPropsType> {

  state = {
    allowZoom: false
  }

  onClick = () => {
    this.setState({allowZoom: !this.state.allowZoom});
  }

  render() {
    const temperature = this.props.trend.data.map((item, index) => {
      return {
        x: new Date(item.date),
        y: Object.values(item)[Object.keys(item).indexOf(this.props.paramName)]
      }
    });

    return <div className="trend" onClick={this.onClick} style={{cursor: "pointer"}} onScroll={() => {
    }}>
      <div className="trend__hello">
        <div style={{marginBottom: "5px"}}>
          <span><b>{`${this.props.name}`}</b></span>
        </div>
        <div style={{fontStyle: "italic"}}>
          <span>{this.props.trendDate}</span>
        </div>
      </div>
      <RemoveScroll enabled={this.state.allowZoom}>
        <VictoryChart
            width={900}
            height={300}
            theme={VictoryTheme.material}
            domainPadding={{y: this.props.maxValue}}
            scale={{x: "time"}}
            containerComponent={
              <VictoryZoomContainer
                  zoomDimension={"x"} allowZoom={this.state.allowZoom}/>}>

          <VictoryLine
              style={{
                data: {stroke: "#c43a31"},
                parent: {border: "1px solid #ccc"},

              }}
              data={temperature}
              domain={{y: [this.props.minValue, this.props.maxValue]}}
          />
        </VictoryChart>
      </RemoveScroll>

    </div>
  }
}

export default Trend;