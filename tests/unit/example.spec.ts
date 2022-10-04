import { shallowMount } from '@vue/test-utils'
import HomeView from '@/views/Home/HomeView'
import Login from '@/views/Authentication/Login/Login';
import { mount } from '@vue/test-utils'

window.alert = jest.fn();

describe('button should show up', () => {
  it("should render button and be click able", () => {
    const wrapper = mount(HomeView);
    wrapper.find('button').trigger('click');
  });
});

describe('labels in login should show', () => {
  it("email label should be visible", () => {
    const wrapper = mount(Login);
    expect(wrapper.html()).toContain('email');
  });
  it("password label should be visible", () => {
    const wrapper = mount(Login);
    expect(wrapper.html()).toContain('password');
  })
});
