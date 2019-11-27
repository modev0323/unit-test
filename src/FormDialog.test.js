import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';

import FormDialog from './FormDialog';

Enzyme.configure({ adapter: new Adapter() });

describe('Dialog', () => {
  let mount;
  let wrapper;

  beforeAll(() => {
    mount = createMount();
  });

  beforeEach(() => {
    wrapper = mount(<FormDialog />);
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it('renders the <Dialog /> component', () => {
    expect(wrapper.find(Dialog)).to.have.lengthOf(1);
  });

  it('Should not be open the Dialog', () => {
    expect(wrapper.find(TextField)).to.have.lengthOf(0);
  });

  it('simulates handleClickOpen', () => {
    wrapper.find(Fab).simulate('click');
    expect(wrapper.find(TextField)).to.have.lengthOf(1);
  });

  it('should show no error when first entered', () => {
    wrapper.find(Fab).simulate('click');
    expect(wrapper.find(TextField).at(0).props().error).to.equal(false);
    expect(wrapper.find(TextField).at(0).props().helperText).to.equal(undefined);
  });

  it('should show error when to input non ASCII', () => {
    wrapper.find(Fab).simulate('click');
    wrapper.find('input').at(0).simulate('change', {target: {value: 'áb', name: 'teamName'}});
    expect(wrapper.find(TextField).props().error).to.equal(true);
    expect(wrapper.find(TextField).at(0).props().helperText).to.equal("ASCII characters only");
  });

  it('should show error when the length is less than 4', () => {
    wrapper.find(Fab).simulate('click');
    wrapper.find('input').at(0).simulate('change', {target: {value: '123', name: 'teamName'}});
    expect(wrapper.find(TextField).props().error).to.equal(true);
    expect(wrapper.find(TextField).at(0).props().helperText).to.equal("Length must be between 4 and 64 characters");
  });

  it('should not show error', () => {
    wrapper.find(Fab).simulate('click');
    wrapper.find('input').at(0).simulate('change', {target: {value: '123456', name: 'teamName'}});
    expect(wrapper.find(TextField).props().error).to.equal(false);
    expect(wrapper.find(TextField).at(0).props().helperText).to.equal(null);
  });
});