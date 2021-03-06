import React,{ useCallback,useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../CSS/Station.css';
import { actions } from '../store/actions';

function Station(props) {
    const { dispatch, fromCity, toCity, gotoCitySelector } = props;

    useEffect(() => {
        var cityParty = sessionStorage.getItem("city-party");
        if(!cityParty){
            sessionStorage.setItem("city-party",JSON.stringify({
                from: fromCity,
                to: toCity,
            }));
        }else{
            var data = JSON.parse(cityParty);
            dispatch(actions.exchangeCity(data.to,data.from));
        }
    },[fromCity,toCity,dispatch]);

    const exchangeCity = useCallback(function (from,to){
        dispatch(actions.exchangeCity(from, to));
        sessionStorage.setItem("city-party",JSON.stringify({
            "from": to,
            "to": from
        }));
    },[dispatch]);

    return (
        <div className="station-wrapper">
            <input 
                name="fromCity"
                className="from-ipt"
                type="text"
                readOnly
                value={fromCity}
                onClick={ () => gotoCitySelector(true) }
            />
            <i onClick={() => exchangeCity(fromCity,toCity)} className="iconfont">&#xe650;</i>
            <input
                name="toCity"
                className="to-ipt"
                type="text"
                readOnly
                value={toCity}
                onClick={() => gotoCitySelector(false)}
            />
        </div>
    )
}

function mapStateToProps(state){
    return {
        fromCity: state.stationReducer.from,
        toCity: state.stationReducer.to
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch
    }
}

Station.propTypes = {
    dispatch: PropTypes.func.isRequired, 
    fromCity: PropTypes.string.isRequired, 
    toCity: PropTypes.string.isRequired, 
    gotoCitySelector: PropTypes.func.isRequired,
}

export default connect(mapStateToProps,mapDispatchToProps)(Station);
