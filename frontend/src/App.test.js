import React from 'react';
import ReactDOM from 'react-dom';
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { Route } from 'react-router-dom';

import App from './App';

configure({ adapter: new Adapter() });

import { store } from './store';

export const CustomProvider = ({ children }) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  );
};

describe("Test AppComponent", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CustomProvider><App /></CustomProvider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('check for redirections', () => {
    const wrapper = mount(<CustomProvider><App /></CustomProvider>);
    let a = wrapper.find(Route);
    expect(a.length).toEqual(2);
  });
});