import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

import Team from './Team';
import TeamCard from '../TeamCard/TeamCard';

Enzyme.configure({ adapter: new Adapter() });

const teamsData = [
  {
    teamId: '1',
    teamName: 'Team 1',
    userRole: 'Owner',
    displayTeamId: 'abc123'
  },
  {
    teamId: '2',
    teamName: 'Team 2',
    userRole: 'Member',
    displayTeamId: 'abc123',
  },
];

const defaultState = {
  teamsReducer: {
    teams: []
  }
};

const mountWithProvider = children => (store) =>
  mount(<Provider store={store}>{children}</Provider>);

describe('Team', () => {
  let wrapper;
  it('renders the <Team /> component', () => {
    const mockedStore = configureMockStore()(defaultState);
    wrapper = mountWithProvider(<Team />)(mockedStore);
    expect(wrapper.find('.team-viewer')).to.have.lengthOf(1);
  });

  it('should not render the TeamCard component', async () => {
    const mockedStore = configureMockStore()(defaultState);
    wrapper = mountWithProvider(<Team />)(mockedStore);
    expect(wrapper.find(TeamCard)).to.have.lengthOf(0);
  });

  it('renders the 2 TeamCard components', async () => {
    const initState = {
      teamsReducer: {
        teams: teamsData
      }
    };
    const mockedStore = configureMockStore()(initState);
    wrapper = mountWithProvider(<Team />)(mockedStore);
    expect(wrapper.find(TeamCard)).to.have.lengthOf(2);
  });

})