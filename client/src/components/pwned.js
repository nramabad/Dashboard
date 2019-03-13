import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchEmail, fetchDomain } from "../actions/pwned_actions";
import $ from "jquery";

class Pwned extends React.Component {
    componentDidMount() {
        const { query, queryType } = this.props
        switch (queryType) {
            case "EMAIL":
                this.props.fetchEmail(query);
                break;
            case "DOMAIN":
                this.props.fetchDomain(query);
                break;
        }
    }

    componentDidUpdate(prevProps) {
        const { query, queryType } = this.props
        if ( query !== prevProps.query ) {
            switch (queryType) {
                case "EMAIL":
                    this.props.fetchEmail(query);
                    break;
                case "DOMAIN":
                    this.props.fetchDomain(query);
                    break;
            }
        }
    }

    render() {
        const { queryType } = this.props
        if (this.props === undefined) {
            return (<div className="small-show">Loading...</div>)
        } else if (this.props[queryType.toLowerCase()] === null) {
            return <div className="small-show">Nothing to show...</div>;
        } else if (Array.isArray(this.props[queryType.toLowerCase()])) {
            return (
                <section className="pwned">
                    <ul>
                    {this.props[queryType.toLowerCase()].map(
                        (site, idx) => (
                        <li key={idx}>{site}</li>
                        )
                    )}
                    </ul>
                </section>
            );
        }
        const toHTML = "<section className='pwned' >".concat(this.props[queryType.toLowerCase()].Description).concat("</section>")
        return (<td dangerouslySetInnerHTML={{ __html: toHTML }} />);
    }
}

const mapStateToProps = state => {
    return {
        email: state.entities.pwned.email,
        domain: state.entities.pwned.domain
    };
};

const mapDispatchToProps = dispatch => ({
    fetchDomain: domain => dispatch(fetchDomain(domain)),
    fetchEmail: email => dispatch(fetchEmail(email))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Pwned)
);