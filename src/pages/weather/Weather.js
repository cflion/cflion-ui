import React from 'react'

import {connect} from 'react-redux'

import * as Status from './reducers/status'

import {fetchWeather} from './reducers/actions'


class Weather extends React.Component {

    componentWillMount() {
        this.props.onFetchWeather('101010100');
    }

    render () {
        const {city,weather,temp1,temp2,status} = this.props.weatherData;

        switch (status) {
            case Status.LOADING: {
                return <div>天气信息请求中...</div>;
            }
            case Status.SUCCESS: {
                return (
                    <div>城市：{city} <br/>天气：{weather} 最低气温 {temp1} 最高气温 {temp2}</div>
                )
            }
            case Status.FAILURE: {
                return <div>天气信息装载失败</div>
            }
            default: {
                throw new Error('unexpected status ' + status);
            }
        }
    }
}


export default connect(
    (state) => ({
        weatherData: state.weather
    }),
    (dispatch) => ({
        onFetchWeather: (cityCode) => dispatch(fetchWeather(cityCode))
    })
)(Weather)
