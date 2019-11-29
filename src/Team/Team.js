import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { teal } from '@material-ui/core/colors';
import TeamCard from '../TeamCard/TeamCard';
import CreateTeam from '../CreateTeam/CreateTeam';
// import './TeamViewer.scss';
// import api from '../../services/http/Api';
import api from '../services/Api';
// import { TEAMS_LOADED } from '../../constants/ActionTypes';

const useStyles = makeStyles(theme => ({
    progress: {
        color: teal[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
  }));

export const TeamsViewer = ({ teams, onLoad}) => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);

    // Get the teams on load
    useEffect(() => {
        const fetchTeams = async () => {
            setIsLoading(true);
            try {
                // const data = await api.Teams.getAll();
                const data = await api.getAll();
                onLoad({data});
            } catch (err) {
                console.error(err);
            }
            setIsLoading(false);
        };
        fetchTeams();
      }, [onLoad]);

    return (
        <Fragment>
            <Typography variant="h6" gutterBottom>
                Teams Viewer
            </Typography>
            <div className="team-viewer">
                <CreateTeam />
                <div className="team-card-wrapper">
                    <div className="team-card-container">
                    {teams.map(team => (
                        <TeamCard className="team-card" team={team} key={team.teamId} />
                    ))}
                    </div>
                </div>
                {isLoading && <CircularProgress size={48} className={classes.progress} />}
            </div>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    teams: state.teamsReducer.teams
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({ type: 'TEAMS_LOADED', payload }),
});

TeamsViewer.propTypes = {
    teams: PropTypes.arrayOf(
        PropTypes.shape({
            teamId: PropTypes.string
        })
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsViewer);