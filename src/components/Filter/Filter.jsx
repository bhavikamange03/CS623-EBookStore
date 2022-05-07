import React, { useState } from "react";
import "./Filter.scss";
import { Row, Card, Col, Container } from 'react-bootstrap';
import Checkbox from '@material-ui/core/Checkbox';


function Filter({config, filterCallback}) {
    const [selectedFilters, setFilters] = useState({});
    const [selectedFilterConfig, setFilterConfig] = useState({});

    const handleChange = ({event, subfilterId, filterId}) => {
        const filters = JSON.parse(JSON.stringify(selectedFilters));
        const filterConfig = JSON.parse(JSON.stringify(selectedFilterConfig));

        if (!filterConfig[filterId]) {
            filterConfig[filterId] = {};
        }

        if (event?.target?.checked) {
            filters[subfilterId] = event.target.checked;
            filterConfig[filterId][subfilterId] = event.target.checked;
        } else {
            if (filters[subfilterId]) {
                delete filters[subfilterId];
                delete filterConfig[filterId][subfilterId];
            }
        }

        setFilters(filters);


        setFilterConfig(filterConfig);

       
        triggerCallback(filterConfig);
    };

    function triggerCallback(filters) {

        filterCallback(filters);
    }

    return (
        <Container fluid className="my-5">
            <Row className="filter-container pt-3">
                {config?.filters.map((filter, filterindex) => {
                return (
                    <div className="filter-item mb-4" key={`filter-${filterindex}`}>
                        <div className="filter-type-label mb-2 text-uppercase">
                            {filter?.name}
                        </div>
                        <div className="filter-sub-categories px-3">
                            {filter?.data.map((subfilter, subfilterindex) => {
                                return (
                                    <div className="filter-sub-item py-1" key={`subfilter-${subfilterindex}`}>
                                        <div className="d-inline-block align-center">
                                            <Checkbox
                                                className="filter-toggle-checkbox"
                                                checked={selectedFilters[subfilter?.id] || false}
                                                onChange={(event) => handleChange({event: event, subfilterId: subfilter.id, filterId: filter.id })}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </div>
                                        <div className="filter-sub-type-label d-inline-block align-center">
                                            {subfilter?.label}
                                        </div>
                                    </div>
                                )}
                            )}
                        </div>
                    </div>
                 )}
                )}
            </Row>
        </Container>
    );
}


export default Filter;

