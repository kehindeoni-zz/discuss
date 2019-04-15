import React from 'react';
import { Provider } from 'react-redux';
import HomePageContainer from '../../containers/HomePageContainer';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { MemoryRouter } from 'react-router';
import { store } from '../../store';

configure({ adapter: new Adapter() });


export const CustomProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </Provider>
  );
};

function setup() {
    const props = {
      getCampaigns: jest.fn(),
      campaigns: [{
        campaign: {
          facts: {
            problem: ''
          },
          title: '',
          cover_image: {
            default: '',
            sizes: {
              landscape: {
                uri: ''
              }
            }
          }
        }
      }],
      errorMessage: '',
      fetching: false,
      campaign: {
        facts: {
          problem: ''
        },
        title: '',
        cover_image: {
          default: '',
          sizes: {
            landscape: {
              uri: ''
            }
          }
        }
      }
    }
  
    const enzymeWrapper = mount(<CustomProvider><HomePageContainer { ...props } /></CustomProvider>);
  
    return {
      props,
      enzymeWrapper
    }
}


describe('components', () => {
  describe('HomePage', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();

      // expect(enzymeWrapper.find('img').hasClass('campaignImage')).toBe(false);
      // // expect(enzymeWrapper.find({ prop: 'src' })).to.have.length(1);
      // expect(enzymeWrapper.exists('.tagLine')).toBe(true);
      // const AlertProps = enzymeWrapper.find('Alert').props();
      // expect(AlertProps.errorMessage).toBe('');
    });


    it('should fetch campaigns', () => {
      // const spy = jest.spyOn(HomePageContainer.prototype, 'joinDiscussion');
      // const { enzymeWrapper } = setup();
      // enzymeWrapper.simulate('click')
      // expect(spy).toHaveBeenCalled();
    });
  });
});