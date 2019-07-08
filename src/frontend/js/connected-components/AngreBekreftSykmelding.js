import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Knapp from 'nav-frontend-knapper';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { sykmeldingHarSoknad } from '../selectors/soknaderSelectors';

function Verktoy({ vis }) {
    return vis ? (
        <div>
            <div className="verktoylinje">
                <Knapp
                    type="standard"
                    mini
                    disabled>
                    {getLedetekst('din-sykmelding.godkjennt.angre')}
                </Knapp>
            </div>
        </div>
    ) : null;
}

Verktoy.propTypes = {
    vis: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
    const FIRE_MANEDER_SIDEN = new Date();
    FIRE_MANEDER_SIDEN.setMonth(FIRE_MANEDER_SIDEN.getMonth() - 4);
    const vis = ownProps.sykmelding.sendtdato > FIRE_MANEDER_SIDEN
        && !sykmeldingHarSoknad(state, ownProps.sykmelding.id);
    return {
        vis,
    };
};

const AngreBekreftSykmelding = connect(mapStateToProps)(Verktoy);
export default AngreBekreftSykmelding;