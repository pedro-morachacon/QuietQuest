// import { render } from '@testing-library/react';
import React from 'react';
import Data from './weather-data';
import Card from './card';
import CardDetails from './card-details';

class WeatherCards extends React.Component {

    state = {

        hideMoreDetails: true
    }

    render() {
        return (
            <div>
                <div className="weather-cards">
                    {Data.map(weather => {
                        return (
                            <Card key={weather.id} weather={weather} hide={this.state.hideMoreDetails} />
                        )
                    })}
                </div>

            </div>
        );
    }

}

export default WeatherCards;